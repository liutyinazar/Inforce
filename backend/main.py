import os
import uvicorn
from fastapi import FastAPI
from api.models import Product
from dotenv import load_dotenv
from db.db_config import engine, Base
from fastapi import FastAPI, HTTPException
from api.schemas.product import ProductCreate
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()
host = os.getenv("HOST")
port = int(os.getenv("PORT"))


async def init_app():
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    except Exception as e:
        print(f"Error connecting to the database: {e}")
    else:
        print("Connected to the database!")

    return app


app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED"),
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


@app.get("/")
async def hello_world():
    return "Hello From Server"


@app.get("/products/")
async def get_all_products():
    try:
        products = await Product.get_all_products()
        return products
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to retrieve products: {str(e)}"
        )


@app.post("/products-create/")
async def create_product(product_data: ProductCreate):
    try:
        product_id = await Product.create_product(
            image_url=product_data.image_url,
            name=product_data.name,
            count=product_data.count,
            size_width=product_data.size_width,
            size_height=product_data.size_height,
            weight=product_data.weight,
        )
        return {"message": "Product created successfully", "product_id": product_id}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to create product: {str(e)}"
        )


@app.delete("/product-delete/{product_id}")
async def delete_product(product_id: int):
    # Викличте метод delete_product з класу Product
    deleted = await Product.delete_product(product_id)
    if deleted:
        return {"message": "Product deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Product not found")
    
@app.patch("/product-edit/{product_id}")
async def update_product(product_id: int, payload: dict):
    updated = await Product.update_product(product_id, **payload)
    if updated:
        return {"message": "Product updated successfully"}
    else:
        raise HTTPException(status_code=404, detail="Product not found")
    

@app.get("/product/{product_id}/")
async def get_product(product_id: int):
    try:
        product = await Product.get_product_by_id(product_id)
        if product:
            return product
        else:
            raise HTTPException(status_code=404, detail="Product not found")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to retrieve product: {str(e)}"
        )


if __name__ == "__main__":
    uvicorn.run(app, host=host, port=port)

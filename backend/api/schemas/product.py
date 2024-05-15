from pydantic import BaseModel

class ProductCreate(BaseModel):
    image_url: str
    name: str
    count: int
    size_width: int
    size_height: int
    weight: str

class ProductDelete(BaseModel):
    id: int
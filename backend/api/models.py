from db.db_config import Base
from sqlalchemy import select
from db.db_config import async_session
from sqlalchemy.orm import relationship
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import Column, Integer, String, ForeignKey


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String)
    name = Column(String, index=True)
    count = Column(Integer)
    size_width = Column(Integer)
    size_height = Column(Integer)
    weight = Column(String)
    comments = relationship("Comment", back_populates="product")

    def __repr__(self):
        return f"{self.name}"

    @classmethod
    async def get_all_products(cls):
        async with async_session() as session:
            try:
                query = select(cls)
                result = await session.execute(query)
                products = result.scalars().all()
            except Exception as e:
                print(f"Error retrieving products: {e}")
                raise e
        return products

    @classmethod
    async def create_product(
        cls, image_url, name, count, size_width, size_height, weight
    ):
        async with async_session() as session:
            try:
                new_product = cls(
                    image_url=image_url,
                    name=name,
                    count=count,
                    size_width=size_width,
                    size_height=size_height,
                    weight=weight,
                )
                session.add(new_product)
                await session.commit()
            except SQLAlchemyError as e:
                await session.rollback()
                print(f"Error creating user: {e}")
                raise e

        return new_product

    @classmethod
    async def delete_product(cls, product_id: int):
        async with async_session() as session:
            try:
                product = await session.get(cls, product_id)
                if product:
                    await session.delete(product)
                    await session.commit()
                    return True
                else:
                    return False
            except Exception as e:
                print(f"Error deleting product: {e}")
                await session.rollback()
                raise e

    @classmethod
    async def get_product_by_id(cls, product_id: int):
        async with async_session() as session:
            try:
                product = await session.execute(select(cls).filter_by(id=product_id))
                return product.scalars().first()
            except Exception as e:
                print(f"Error retrieving product: {e}")
                raise e

    @classmethod
    async def update_product(cls, product_id: int, **kwargs):
        async with async_session() as session:
            try:
                product = await session.get(cls, product_id)
                if product:
                    for key, value in kwargs.items():
                        setattr(product, key, value)
                    await session.commit()
                    return True
                else:
                    return False 
            except Exception as e:
                print(f"Error updating product: {e}")
                await session.rollback()
                raise e


class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    description = Column(String)
    date = Column(String)
    product = relationship("Product", back_populates="comments")

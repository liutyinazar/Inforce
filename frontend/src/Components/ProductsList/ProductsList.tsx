import "./ProductsList.scss";
import { Button, Space } from "antd";
import { Product } from "../../types";
import { productListData, getProduct, deleteProduct } from "../api/products";
import React, { useEffect, useState } from "react";
import AddProductModal from "./../Modal/Modal";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  

  const fetchData = async () => {
    try {
      const productsData = await productListData();
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddProduct = () => {
    setModalVisible(true);
  };

  const handleCancelModal = () => {
    setModalVisible(false);
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await deleteProduct(productId);
      await fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddProductSuccess = async () => {
    await fetchData();
    handleCancelModal();
  };

  return (
    <div className="product-list">
      <div className="container">
        <div className="product-title">
          <h1>Product List</h1>
        </div>
        <div className="add-button">
          <Button type="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </div>

        <AddProductModal
          visible={modalVisible}
          onCancel={handleCancelModal}
          onSuccess={handleAddProductSuccess}
        />

        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link
                to={`/product/${product.id}`}
                onClick={() => getProduct(product.id)}
              >
                <h2>{product.name}</h2>
                <img
                  src={product.image_url}
                  alt={product.name}
                  width={"300px"}
                />
                <p>Count: {product.count}</p>
              </Link>
              <Space>
                <Button type="primary">Edit</Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </Button>
              </Space>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsList;

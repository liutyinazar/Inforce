import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/products";
import { Product } from "../../types";
import "./ProductDetail.scss";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return; 
        const productData = await getProduct(parseInt(id));
        setProduct(productData);
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching product detail:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product">
      <h1>Product Detail</h1>
      {product && (
        <div>
          <h2>{product.name}</h2>
          <img src={product.image_url} alt={product.name} width={"300px"} />
          <p>Width: {product.size_width}</p>
          <p>Height: {product.size_height}g</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

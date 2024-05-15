import { client } from './index'
import { Product } from '../../types'

export const productListData = async () => {
    try {
        const response = await client.get(`/products/`);
        return(response.data);
    } catch (error) {
        throw(error)
    }
}

export const addProduct = async (productData: Product) => {
    try {
        const response = await client.post("/products-create/", productData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProduct = async (productId: number)=> {
    try {
        const response = await client.get(`/product/${productId}`);
        return response.data;
    } catch (error) {
      throw error;
    }
  };

export const deleteProduct = async (productId: number)=> {
    try {
        const response = await client.delete(`/product-delete/${productId}`);
        return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateProduct = async (productId: number, newData: any)=> {
    try {
        const response = await client.patch(`/product-edit/${productId}`, newData);
        return response.data;
    } catch (error) {
      throw error;
    }
  };

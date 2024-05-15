import React, { useState } from "react";
import { Modal, Form, Input, Alert } from "antd";
import { AddProductModalProps } from "../../types";
import { addProduct } from "../api/products";

const AddProductModal = ({ visible, onCancel }: AddProductModalProps) => {
  const [form] = Form.useForm();
  const [alertVisible, setAlertVisible] = useState(false);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await addProduct(values);
      form.resetFields();
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
        onCancel();
      }, 2000);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Add Product"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        name="addProductForm"
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="image_url"
          label="Image URL"
          rules={[{ required: true, message: "Please enter the image URL" }]}
        >
          <Input placeholder="Enter image URL" />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter the product name" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>
        <Form.Item
          name="count"
          label="Count"
          rules={[
            { required: true, message: "Please enter the product count" },
          ]}
        >
          <Input type="number" placeholder="Enter product count" />
        </Form.Item>
        <Form.Item
          name="size_width"
          label="Size Width"
          rules={[
            { required: true, message: "Please enter the product width" },
          ]}
        >
          <Input type="number" placeholder="Enter product width" />
        </Form.Item>
        <Form.Item
          name="size_height"
          label="Size Height"
          rules={[
            { required: true, message: "Please enter the product height" },
          ]}
        >
          <Input type="number" placeholder="Enter product height" />
        </Form.Item>
        <Form.Item
          name="weight"
          label="Weight"
          rules={[
            { required: true, message: "Please enter the product weight" },
          ]}
        >
          <Input placeholder="Enter product weight" />
        </Form.Item>
      </Form>
      {alertVisible && (
        <Alert message="Product added successfully" type="success" showIcon />
      )}
    </Modal>
  );
};

export default AddProductModal;

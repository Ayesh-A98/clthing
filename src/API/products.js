import axiosInstance from "./axiosInstance";

export const getAllProducts = async (params = {}) => {
  const response = await axiosInstance.get("/products", { params });
  return {
    products: response.data.data,
    meta: response.data.meta,
  };
};

export const getProductById = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data.data;
};

export const getProductsByCategory = async (categoryId, params = {}) => {
  const response = await axiosInstance.get(`/products/category/${categoryId}`, { params });
  console.log("Products by category:", response.data);
  return response.data.data;
};
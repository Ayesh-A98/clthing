import axiosInstance from "./axiosInstance";

// GET /categories
export const getAllCategories = async () => {
  const response = await axiosInstance.get("/categories");

  console.log("Categories API response:", response.data);
  return response.data.data;
};

// GET /products?category=<categoryId>
export const getProductsByCategory = async (categoryId) => {
  const response = await axiosInstance.get("/products", {
    params: { category: categoryId },
  });

  console.log("Products by category API response:", response.data);
  return response.data.data;
};
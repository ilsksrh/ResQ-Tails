import { get, post, del, put } from "./api";
import { authHeader, getCurrentUser } from "./auth_service";


export const fetchCategories = async () => {
  try {
    return await get('http://localhost:8080/api/categories', {
      headers: authHeader(),
    });
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {
    return await post('http://localhost:8080/api/categories', categoryData, {
      headers: authHeader(),
    });
  } catch (error) {
    console.error("Error creating category:", error.message);
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    return await del(`http://localhost:8080/api/categories/${categoryId}`, {
      headers: authHeader(),
    });
    
  } catch (error) {
    console.error("Error deleting category:", error.message);
    throw error;
  }
};

export const editCategory = async (categoryId, data) => {
  try {
    return await put(`http://localhost:8080/api/categories/${categoryId}`, data, {
      headers: authHeader(),
    });
  } catch (error) {
    console.error('Error editing category:', error.message);
    throw error;
  }
};

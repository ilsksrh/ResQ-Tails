import { get, post, del, put } from "./api";
import { authHeader, getCurrentUser } from "./auth_service";

const currentUser = getCurrentUser();

export const getAllTags = async () => {

    try {
      return await get('http://localhost:8080/api/tags', {
        headers: authHeader(),
      });
    } catch (error) {
      console.error("Error fetching tags:", error.message);
      throw error;
    }
  };
  
  export const getTagsForPost = async (postId) => {
    try {
      return await get(`http://localhost:8080/api/posts/${postId}/tags`, {
        headers: authHeader(),
      });
    } catch (error) {
      console.error("Error getting tags:", error.message);
      throw error;
    }
  };

  export const addTagToPost = async (postId, data) => {
    try {
      return await post(`http://localhost:8080/api/posts/${postId}/tags`, data, {
        headers: authHeader(),
      });
    } catch (error) {
      console.error("Error creating tag:", error.message);
      throw error;
    }
  };

  export const editTag = async (tagId, data) => {
    try {
      return await put(`http://localhost:8080/api/tags/${tagId}`, data, {
        headers: authHeader(),
      });
    } catch (error) {
      console.error('Error editing tag:', error.message);
      throw error;
    }
  };
  
  export const getPostsbyTag = async (tagId) => {
    try {
      return await get(`http://localhost:8080/api/tags/${tagId}/posts`);
    } catch (error) {
      console.error(`Error fetching posts for tag ID ${tagId}:`, error.message);
      throw error;
    }
  };

  export const deleteTagFromPost = async (postId, tagId) => {
    try {
      return await del(`http://localhost:8080/api/posts/${postId}/tags/${tagId}`);
    } catch (error) {
      console.error(`Error deleting tag ID ${tagId} from post ID ${postId}:`, error.message);
      throw error;
    }
  };

  export const addExistingTagForPost = async (postId, tagId) => {
    try {
      return await post(`http://localhost:8080/api/posts/${postId}/tags/${tagId}`);
    } catch (error) {
      console.error(`Error adding tag ID ${tagId} to post ID ${postId}:`, error.message);
      throw error;
    }
  };

  export const getPostsByTags = async (tagIds) => {
    try {
      return await get(`http://localhost:8080/api/byTags?tagIds=${tagIds.join(',')}`, {
        headers: authHeader(),
      });
    } catch (error) {
      console.error(`Error fetching posts for tags ${tagIds.join(',')}:`, error.message);
      throw error;
    }
  };

  export const createTag = async (data) => {
    try {
      return await post(`http://localhost:8080/api/tags`, data, {
        headers: authHeader(),
      });
    } catch (error) {
      console.error(`Error creating tag:`, error.message);
      throw error;
    }
  };

  export const deleteTag = async (tagId) => {
    console.log("hello");
    try {
      return await del(`http://localhost:8080/api/tags/${tagId}`, {
        headers: authHeader(),
      });
      
    } catch (error) {
      console.error(`Error deleting tag:`, error.message);
      throw error;
    }
  };



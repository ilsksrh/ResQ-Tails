import { authHeader } from "./auth_service";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const fetchOnePost = async (postId) => {
  try {
    const response = await fetch(`http://localhost:8080/api/posts/${postId}`, {
      headers: authHeader(),
    });
      if (response.status === 401) {
        window.location.reload();
      }
    const postData = await response.json();
    return postData;
  } catch (error) {
    if (error.message.includes('Unauthorized access')) {
      toast.error('You are not authorized to view this content');
    } else {
      console.error('Error fetching post:', error.message);
      toast.error('Error fetching post. Please try again later.');
    }
    throw error;
  }
};

export const deletePost = async (postId, navigate) => {
  try {
    const response = await fetch(`http://localhost:8080/api/posts/${postId}`, {
      method: 'DELETE',
      headers: authHeader(),
    });
    if (response.ok) {
      navigate("/home", { state: { toastMessage: "Successfully deleted post!" } });
    }
  } catch (error) {
    if (error.message.includes('401')) {
      navigate('/login');
    } else {
      console.error('Error deleting post:', error.message);
      toast.error("Error deleting post");
    }
  }
};

export const createPost = async (title, photo, description, categoryId, navigate) => {
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const newPost = {
    title,
    photo,
    description,
    userId,
    categoryId
  };

  try {
    const response = await axios.post('http://localhost:8080/api/posts', newPost, {
      headers: authHeader()
    });

    if (response.status === 200 || response.status === 201) {
      toast.success('Post created successfully');
      navigate("/home");
    } else {
      throw new Error('Unexpected response status');
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      toast.error('Unauthorized. Please log in.');
      navigate('/login');
    } else {
      toast.error('Error creating post. Please try again.');
      console.error('Error details:', error);
    }
  }
};

export const likePost = async (userId, postId) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/likes/like`, null, {
            params: { userId, postId },
            headers: authHeader()
        });
        if (response.status === 200) {
            toast.success('Post liked successfully');
        }
    } catch (error) {
        toast.error("Error liking post");
    }
};

export const unlikePost = async (userId, postId) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/likes/unlike`, null, {
            params: { userId, postId },
            headers: authHeader()
        });
        if (response.status === 200) {
            toast.success('Post unliked successfully');
        }
    } catch (error) {
        toast.error("Error unliking post");
    }
};

export const likesCount = async (postId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/likes/count`, {
            params: { postId },
            headers: authHeader()
        });
        if (response.status === 200) {
            return response.data.count;
        }
    } catch (error) {
        toast.error("Error fetching like count");
    }
};

export const isLiked = async (postId, userId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/likes/check`, {
            params: { postId, userId },
            headers: authHeader()
        });
        if (response.status === 200) {
            return response.data.liked;
        }
    } catch (error) {
        toast.error("Error checking like status");
    }
};
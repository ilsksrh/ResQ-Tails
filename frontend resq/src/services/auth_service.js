import { post } from './api';
import { setUser, removeUser } from './token.service';
import axios from 'axios';

export const login = async (username, password) => {
  try {
    const response = await post('http://localhost:8080/api/auth/signin', { username, password });
    if (response.accessToken) {
      setUser(response);
    }
    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const register = async (formData) => {
  try {
    const response = await axios.post('http://localhost:8080/api/auth/signup', formData, {
      headers: {
        'Content-Type': 'application/json',
        ...authHeader()
      }
    });

    return response;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export const logout = () => {
  removeUser();
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const authHeader = () => {
  
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
  
}

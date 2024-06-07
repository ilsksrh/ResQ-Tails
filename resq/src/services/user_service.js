import { get } from '../api';

export const getUserBoard = async () => {
  try {
    const data = await get('/test/user');
    console.log("User board data:", data);
    return data;
  } catch (error) {
    console.error('Error fetching user board:', error);
    throw error;
  }
};


export const getModeratorBoard = async () => {
  try {
    const data = await get('/test/mod');
    return data;
  } catch (error) {
    console.error('Error fetching moderator board:', error);
    throw error;
  }
};

export const getAdminBoard = async () => {
  try {
    const data = await get('/test/admin');
    return data;
  } catch (error) {
    console.error('Error fetching admin board:', error);
    throw error;
  }
};

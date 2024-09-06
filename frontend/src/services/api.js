import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllMenus = () => api.get('/menus');
export const getMenu = (id) => api.get(`/menus/${id}`);
export const addMenuItem = (menuId, item) => api.post(`/menus/${menuId}/items`, item);
export const updateMenuItem = (menuId, itemId, item) => api.put(`/menus/${menuId}/items/${itemId}`, item);
export const deleteMenuItem = (menuId, itemId) => api.delete(`/menus/${menuId}/items/${itemId}`);
export const saveMenu = (menuId, menuData) => api.put(`/menus/${menuId}`, menuData);

export default api;
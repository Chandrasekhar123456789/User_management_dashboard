import axios from 'axios';
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api' });

export const fetchUsers = () => API.get('/users').then(r => r.data);
export const getUser = (id) => API.get(`/users/${id}`).then(r => r.data);
export const createUser = (payload) => API.post('/users', payload).then(r => r.data);
export const updateUser = (id, payload) => API.put(`/users/${id}`, payload).then(r => r.data);
export const deleteUser = (id) => API.delete(`/users/${id}`).then(r => r.data);

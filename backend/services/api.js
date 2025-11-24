import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getCertificates = () => {
  return axios.get(`${API_URL}/certificates`);
};

export const reviewCertificate = (id, data) => {
  return axios.patch(`${API_URL}/certificates/${id}/review`, data);
};
export const login = (email, password) => {
  return axios.post(`${API_URL}/auth/login`, { email, password });
};
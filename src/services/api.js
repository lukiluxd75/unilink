import axios from 'axios';

// 🔗 URL base del backend
const API_URL = 'http://localhost:5000/api';

// 🧩 Crear instancia de axios
const api = axios.create({
  baseURL: API_URL,
});

// 🪪 Interceptor para incluir token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ⚙️ Auth
export const login = async (email, password) => {
  return api.post('/auth/login', { email, password });
};

export const register = async (data) => {
  return api.post('/auth/register', data);
};

// 📜 Certificados
export const getCertificates = async () => {
  return api.get('/certificates');
};

export const uploadCertificate = async (formData) => {
  return api.post('/certificates', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// 🧩 Oportunidades
export const getOpportunities = async () => {
  return api.get('/opportunities');
};

export const createOpportunity = async (data) => {
  return api.post('/opportunities', data);
};

export const applyToOpportunity = async (id) => {
  return api.post(`/opportunities/${id}/apply`);
};

// 📩 Aplicaciones
export const getMyApplications = async () => {
  return api.get('/applications/my-applications');
};

export const getAllApplications = async () => {
  return api.get('/applications');
};

export const reviewApplication = async (id, data) => {
  return api.patch(`/applications/${id}/review`, data);
};

// 🧱 Exportar axios base (por si necesitas peticiones personalizadas)
export default api;

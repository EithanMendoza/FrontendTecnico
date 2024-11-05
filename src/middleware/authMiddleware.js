// archivo: src/middleware/authMiddleware.js

import axios from 'axios';

// Función para agregar el token de sesión en el encabezado de autorización
export const addAuthHeader = () => {
  const token = localStorage.getItem('session_token');
  
  if (!token) {
    throw new Error('No se ha iniciado sesión.');
  }

  // Configurar el encabezado de autorización para futuras solicitudes
  axios.defaults.headers.common['Authorization'] = token;
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  const token = localStorage.getItem('session_token');
  return !!token;
};

// Función para cerrar sesión
export const logout = () => {
  localStorage.removeItem('session_token');
  window.location.href = '/login';
};

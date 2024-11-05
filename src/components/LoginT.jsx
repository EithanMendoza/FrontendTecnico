import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import tecnico from '../assets/tecnico.png';
import logo from '../assets/navbar-logo.png';
import { AtSymbolIcon, LockClosedIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { addAuthHeader } from '../middleware/authMiddleware'; // Importamos la función addAuthHeader

const LoginT = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno

    try {
      // Realizamos la solicitud de login
      const response = await axios.post(`${apiUrl}/autenticacionTecnicos/loginT`, {
        email,
        password,
      });

      if (response.status === 200) {
        // Guardar el token de sesión
        localStorage.setItem('session_token', response.data.session_token);

        // Agregar el encabezado de autorización para las siguientes solicitudes
        addAuthHeader();

        // Redirigir al home de técnicos después del login exitoso
        navigate('/homeT');
      } else {
        setError('Error al iniciar sesión. Verifique sus credenciales.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión. Verifique sus credenciales.');
    }
  };

  return (
    <div className="font-[sans-serif] bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row">
        <div className="md:w-1/2 p-8 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <img
            src={tecnico}
            className="w-full max-w-md rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
            alt="Air 'Tecs logo"
          />
        </div>
        <div className="md:w-1/2 p-12 bg-white">
          <div className="flex justify-center mb-8">
            <img
              src={logo}
              alt="Logo"
              className="w-32 cursor-pointer"
              onClick={() => navigate('/')} // Redirige a la página de inicio
            />
          </div>
          <form className="max-w-md mx-auto" onSubmit={handleLogin}>
            <div className="mb-12 text-center">
              <h3 className="text-4xl font-bold text-gray-800 mb-4">Bienvenido de vuelta</h3>
              <p className="text-gray-600 text-lg">
                ¿No tienes una cuenta?{' '}
                <span
                  onClick={() => navigate('/registerT')}
                  className="text-blue-600 font-semibold hover:underline cursor-pointer transition-colors duration-300"
                >
                  Regístrate aquí
                </span>
              </p>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Correo Electrónico
              </label>
              <div className="relative">
                <AtSymbolIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
                  placeholder="Ingresa tu correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Contraseña
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 transform"
            >
              Iniciar sesión
            </button>
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-100 p-3 mt-4 rounded-lg">
                <ExclamationCircleIcon className="h-5 w-5" />
                <p>{error}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginT;

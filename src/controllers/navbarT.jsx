import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaWrench, FaUser, FaSignOutAlt, FaCheckCircle, FaUserCircle } from 'react-icons/fa';

export default function NavbarT() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('session_token');

      if (!token) {
        alert('No se ha iniciado sesión.');
        navigate('/loginT');
        return;
      }

      const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno

      const response = await axios.post(
        `${apiUrl}/autenticacionTecnicos/logoutT`,
        {},
        {
          headers: { Authorization: token },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem('session_token');
        alert(response.data.mensaje);
        navigate('/loginT');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      if (error.response && error.response.status === 401) {
        alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
        localStorage.removeItem('session_token');
        navigate('/loginT');
      } else {
        alert(error.response?.data?.error || 'Error al cerrar sesión');
      }
    }
  };

  const handleProfileClick = () => {
    navigate('/perfilT');
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-200 via-blue-300 to-blue-500 p-4 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <span
              className="text-3xl font-extrabold text-gray-800 cursor-pointer transition-all duration-300 hover:text-blue-600"
              onClick={() => navigate('/homeT')}
            >
              Air<span className="text-blue-700">Tecs</span>
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <NavButton
              onClick={() => navigate('/pagos')}
              icon={<FaEnvelope className="h-6 w-6" />}
              label="Notificaciones"
              hasNotification
            />
            <NavButton
              onClick={() => navigate('/servicios-finalizados')}
              icon={<FaCheckCircle className="h-6 w-6" />}
              label="Servicios Finalizados"
            />
            <NavButton
              onClick={() => navigate('/Servicios')}
              icon={<FaWrench className="h-6 w-6" />}
              label="Servicios"
            />

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative flex items-center transition-all duration-300 transform hover:scale-105 focus:outline-none"
              >
                <FaUserCircle className="text-blue-700 h-10 w-10" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 animate-fadeIn">
                  <DropdownItem
                    onClick={handleProfileClick}
                    icon={<FaUser className="text-blue-600" />}
                    label="Perfil"
                  />
                  <DropdownItem
                    onClick={handleLogout}
                    icon={<FaSignOutAlt className="text-blue-600" />}
                    label="Cerrar sesión"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavButton({ onClick, icon, label, hasNotification = false }) {
  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-full bg-gray-300 hover:bg-blue-500 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-200"
    >
      <div className="text-blue-900 group-hover:text-white transition-transform">
        {icon}
      </div>
      <span className="sr-only">{label}</span>
      {hasNotification && (
        <span className="absolute top-0 right-0 h-3 w-3 bg-blue-300 rounded-full animate-ping"></span>
      )}
    </button>
  );
}

function DropdownItem({ onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center transition-colors duration-150"
    >
      <span className="mr-2">{icon}</span> {label}
    </button>
  );
}

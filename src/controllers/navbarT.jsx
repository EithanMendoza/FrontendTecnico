import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaWrench, FaUser, FaSignOutAlt, FaCheckCircle, FaUserCircle } from 'react-icons/fa';

export default function NavbarT() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('session_token');

      if (!token) {
        navigate('/loginT'); // Redirigir al login directamente si no hay token
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

      // Limpiar el estado de la sesión
      localStorage.removeItem('tutorial_completed');
      localStorage.removeItem('hasSeenTutorial');
      localStorage.removeItem('session_token');

      // Redirigir al login sin mostrar mensajes
      navigate('/loginT');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);

      // Manejo básico de errores
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('session_token');
      }

      navigate('/loginT'); // Redirigir al login en cualquier caso
    }
  };

  const handleProfileClick = () => {
    navigate('/perfilT');
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-900 p-4 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="/homeT" className="flex items-center">
              <span className="text-3xl font-extrabold text-white cursor-pointer transition-all duration-300 hover:text-blue-200">
                Air<span className="text-blue-300">Tecs</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <NavButton
              onClick={() => navigate('/pagos')}
              icon={<FaEnvelope className="h-5 w-5" />}
              label="Notificaciones"
            />
            <NavButton
              onClick={() => navigate('/servicios-finalizados')}
              icon={<FaCheckCircle className="h-5 w-5" />}
              label="Servicios Finalizados"
            />
            <NavButton
              onClick={() => navigate('/Servicios')}
              icon={<FaWrench className="h-5 w-5" />}
              label="Servicios"
            />

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative flex items-center transition-all duration-300 focus:outline-none"
              >
                <FaUserCircle className="text-blue-300 h-8 w-8 hover:text-white" />
              </button>
              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                >
                  <DropdownItem
                    onClick={handleProfileClick}
                    icon={<FaUser className="text-blue-800" />}
                    label="Perfil"
                  />
                  <DropdownItem
                    onClick={handleLogout}
                    icon={<FaSignOutAlt className="text-blue-800" />}
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

function NavButton({ onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-full bg-blue-700 hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-800"
    >
      <div className="text-blue-200 hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <span className="sr-only">{label}</span>
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

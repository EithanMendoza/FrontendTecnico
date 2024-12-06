import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSync, FaCheck, FaTimes, FaUserCircle } from 'react-icons/fa';
import Navbar from '../controllers/navbarT';
import Footer from '../controllers/footer';
import { isAuthenticated } from '../middleware/authMiddleware';
import { Toast } from '../components/Toast';

const PaginaPrincipalT = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPerfilModal, setShowPerfilModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [servicioAceptado, setServicioAceptado] = useState(null);
  const [confirmacionServicio, setConfirmacionServicio] = useState(null); // Update 1
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/loginT');
    }
  }, [navigate]);

  const fetchSolicitudes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('session_token');
      if (!token) {
        showNotification('No se ha encontrado el token de sesión. Por favor, inicia sesión nuevamente.', 'error');
        navigate('/loginT');
        return;
      }
      const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno

      const response = await axios.get(`${apiUrl}/aceptacionSolicitudT/solicitudes-pendientes`, {
        headers: {
          Authorization: token,
        },
      });

      setSolicitudes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener las solicitudes pendientes:', error);
      setLoading(false);
      showNotification('Hubo un error al cargar las solicitudes pendientes. Intenta nuevamente.', 'error');
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const confirmarAceptacion = (solicitud) => {
    setConfirmacionServicio(solicitud);
  };
  

  const aceptarServicioFinal = async () => {
    if (!confirmacionServicio) return;
  
    try {
      const token = localStorage.getItem('session_token');
      if (!token) {
        showNotification('No se ha encontrado el token de sesión. Por favor, inicia sesión nuevamente.', 'error');
        navigate('/loginT');
        return;
      }
  
      const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno
  
      const perfilResponse = await axios.get(`${apiUrl}/perfilT/completo`, {
        headers: {
          Authorization: token,
        },
      });
  
      if (perfilResponse.data.completo) {
        await axios.put(
          `${apiUrl}/aceptacionSolicitudT/aceptar-solicitud/${confirmacionServicio.id}`, // Cambiar aquí
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );
  
        setServicioAceptado(confirmacionServicio);
        fetchSolicitudes();
      } else {
        setShowPerfilModal(true);
      }
      setConfirmacionServicio(null);
    } catch (error) {
      console.error('Error al aceptar la solicitud:', error);
      showNotification('Hubo un error al aceptar la solicitud.', 'error');
    }
  };
  

  const cancelarSolicitud = async (idSolicitud) => {
    try {
      const token = localStorage.getItem('session_token');
      if (!token) {
        showNotification('No se ha encontrado el token de sesión. Por favor, inicia sesión nuevamente.', 'error');
        navigate('/loginT');
        return;
      }

      const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno

      await axios.put(`${apiUrl}/aceptacionSolicitudT/cancelar-solicitud/${idSolicitud}`, {}, {
        headers: {
          Authorization: token,
        },
      });
      
      showNotification('Solicitud cancelada correctamente.', 'success');
      fetchSolicitudes();
    } catch (error) {
      console.error('Error al cancelar la solicitud:', error);
      showNotification('Hubo un error al cancelar la solicitud.', 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col text-gray-800">
      <Navbar />
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 flex-grow">
        <motion.h1 
          className="text-5xl font-extrabold text-center mb-12 text-blue-900 tracking-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Solicitudes Pendientes
        </motion.h1>

        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            onClick={fetchSolicitudes}
            className="bg-blue-700 text-white font-bold px-8 py-3 rounded-full hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto shadow-lg"
          >
            <FaSync className="mr-2" />
            Actualizar Solicitudes
          </button>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-700"></div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {solicitudes.map((solicitud) => (
              <motion.div
                key={solicitud.id}
                className="flex flex-col bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-blue-100"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={solicitud.imagenUrl || 'https://via.placeholder.com/400x200'}
                  alt={solicitud.nombre_servicio}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex-grow">
                  <h2 className="text-2xl font-bold mb-2 text-blue-900">{solicitud.nombre_servicio}</h2>
                  <p className="text-gray-600 mb-4">{solicitud.detalles}</p>
                </div>
                <div className="px-6 pb-6 flex justify-around">
                  <button
                    onClick={() => confirmarAceptacion(solicitud)} // Update 5
                    className="bg-green-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center shadow-md"
                  >
                    <FaCheck className="mr-2" />
                    ACEPTAR
                  </button>
                  <button
                    onClick={() => cancelarSolicitud(solicitud.id)}
                    className="bg-red-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-red-600 transition-all duration-300 flex items-center shadow-md"
                  >
                    <FaTimes className="mr-2" />
                    Cancelar
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Update 4 */}
        <AnimatePresence>
          {confirmacionServicio && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            >
              <motion.div 
                className="bg-white text-gray-800 p-8 rounded-xl max-w-md w-full shadow-2xl"
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-blue-900">Confirmar Aceptación</h2>
                <p className="mb-6 text-gray-600">¿Estás seguro que quieres aceptar este servicio?</p>
                <div className="flex justify-end">
                  <button
                    onClick={aceptarServicioFinal}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg mr-4 hover:bg-green-600 transition-all duration-300 shadow-md"
                  >
                    Sí, aceptar
                  </button>
                  <button
                    onClick={() => setConfirmacionServicio(null)}
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-md"
                  >
                    Cancelar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {servicioAceptado && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-0 z-50 flex items-center justify-center"
            >
              <div className="bg-white text-gray-800 p-8 rounded-xl max-w-md w-full shadow-2xl relative">
                <button
                  onClick={() => setServicioAceptado(null)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={24} />
                </button>
                <div className="flex items-center justify-center mb-4">
                  <FaCheck className="text-green-500 text-5xl" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-900">Servicio Aceptado</h2>
                <p className="text-center text-gray-600">
                  Has aceptado el servicio: {servicioAceptado.nombre_servicio}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />

      <AnimatePresence>
        {showPerfilModal && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white text-gray-800 p-8 rounded-xl max-w-md w-full shadow-2xl"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-blue-900">Perfil Incompleto</h2>
              <p className="mb-6 text-gray-600">Debe completar su perfil antes de aceptar un servicio.</p>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setShowPerfilModal(false);
                    navigate('/perfilT');
                  }}
                  className="bg-blue-700 text-white px-6 py-3 rounded-lg mr-4 hover:bg-blue-800 transition-all duration-300 flex items-center shadow-md"
                >
                  <FaUserCircle className="mr-2" />
                  Crear Perfil
                </button>
                <button
                  onClick={() => setShowPerfilModal(false)}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-md"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {notification && (
          <Toast message={notification.message} type={notification.type} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaginaPrincipalT;
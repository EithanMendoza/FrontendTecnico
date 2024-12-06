import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import Navbar from '../controllers/navbarT';
import Footer from '../controllers/footer';

const Services = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiciosAceptados = async () => {
      try {
        const token = localStorage.getItem('session_token');
        if (!token) {
          setError('No se ha iniciado sesión.');
          navigate('/login');
          return;
        }

        const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno

        const response = await axios.get(`${apiUrl}/aceptacionSolicitudT/solicitudes-aceptadas`, {
          headers: { Authorization: token },
        });

        if (response.status === 200) {
          setServicios(response.data);
        } else {
          setError('Error inesperado al obtener los servicios aceptados');
        }
      } catch (error) {
        console.error('Error al obtener los servicios aceptados:', error);
        setError('Error al obtener los servicios aceptados. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchServiciosAceptados();
  }, [navigate]);

  const handleActualizarEstado = (solicitudId) => {
    if (!solicitudId) {
      console.error('La solicitudId es undefined, no se puede actualizar el estado.');
      return;
    }
    navigate(`/updateService/${solicitudId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16 flex-grow">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-blue-900 mb-10 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Servicios Aceptados
        </motion.h1>
        
        {error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md max-w-2xl mx-auto"
          >
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 mr-2" />
              <p>{error}</p>
            </div>
          </motion.div>
        ) : servicios.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg shadow-md max-w-2xl mx-auto"
          >
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 mr-2" />
              <p>No tienes servicios aceptados actualmente.</p>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence>
            {servicios.map((servicio, index) => (
              <motion.div
                key={servicio.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white shadow-lg rounded-xl overflow-hidden mb-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-semibold text-blue-900">{servicio.nombre_servicio}</h2>
                    <span className="flex items-center text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Aceptado
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 mb-4">
                    <div className="flex items-center bg-blue-50 p-2 rounded-lg">
                      <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                      <span className="font-medium">{servicio.fecha}</span>
                    </div>
                    <div className="flex items-center bg-blue-50 p-2 rounded-lg">
                      <Clock className="w-5 h-5 mr-2 text-blue-500" />
                      <span className="font-medium">{servicio.hora}</span>
                    </div>
                  </div>
                  <div className="flex items-center bg-blue-50 p-2 rounded-lg mb-4">
                    <MapPin className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0" />
                    <span className="font-medium">{servicio.direccion}</span>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => handleActualizarEstado(servicio.id)}
                      className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      Actualizar Estado
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Services;

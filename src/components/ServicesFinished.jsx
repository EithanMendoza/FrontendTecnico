import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react'; // Iconos
import Navbar from '../controllers/navbarT';
import Footer from '../controllers/footer';

const ServiciosFinalizados = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiciosCompletados = async () => {
      try {
        const token = localStorage.getItem('session_token');
        if (!token) {
          alert('No se ha iniciado sesión.');
          navigate('/loginT');
          return;
        }

        const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno

        const response = await axios.get(`${apiUrl}/actualizacion/servicios-finalizados`, {
          headers: { Authorization: token },
        });

        setServicios(response.data);
        setError(null);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los servicios completados:', error);
        setLoading(false);
        if (error.response && error.response.status === 401) {
          setError('Sesión expirada. Por favor, inicia sesión nuevamente.');
        } else {
          setError('Error al obtener el historial de servicios.');
        }
      }
    };

    fetchServiciosCompletados();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-10 flex-grow">
        <h1 className="text-4xl font-bold text-blue-900 mb-6 text-center">Historial de Servicios Finalizados</h1>
        
        {servicios.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-l-4 border-blue-500 text-blue-800 px-8 py-6 rounded-lg flex items-center justify-center shadow-md max-w-2xl mx-auto"
          >
            <AlertCircle className="w-8 h-8 mr-4 text-blue-500" />
            <span className="text-lg font-medium">{error || 'No hay servicios finalizados en tu historial.'}</span>
          </motion.div>
        ) : (
          <AnimatePresence>
            {servicios.map((servicio) => (
              <motion.div
                key={servicio.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white shadow-lg rounded-xl overflow-hidden mb-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-semibold text-blue-900">{servicio.nombre_servicio}</h2>
                    <span className="flex items-center text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Completado
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 mb-4">
                    <div className="flex items-center bg-blue-50 p-2 rounded-lg">
                      <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                      <span className="font-medium">{new Date(servicio.fecha).toLocaleDateString()}</span>
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

export default ServiciosFinalizados;

import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Award } from 'lucide-react';
import Navbar from '../controllers/navbarT';
import Footer from '../controllers/footer';

const UpdateService = () => {
  const { solicitudId } = useParams();
  const [estado, setEstado] = useState('');
  const [codigoConfirmacion, setCodigoConfirmacion] = useState('');
  const [detalles, setDetalles] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [showCongratulations, setShowCongratulations] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      const token = localStorage.getItem('session_token');
      if (!token) {
        setError('No se ha iniciado sesión.');
        return;
      }

      const requestData = {
        estado,
        codigoConfirmacion: (estado === 'en_proceso' || estado === 'finalizado') ? codigoConfirmacion : undefined,
        detalles,
      };

      if (!solicitudId) {
        setError('No se encontró el ID de la solicitud. Verifica la URL e inténtalo de nuevo.');
        return;
      }

      const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno

      const response = await axios.post(
        `${apiUrl}/actualizacion/actualizar-estado/${solicitudId}`,
        requestData,
        {
          headers: { Authorization: token },
        }
      );

      if (response.status === 200) {
        setMensaje(response.data.mensaje);
        if (estado === 'finalizado') {
          setShowCongratulations(true);
        } else {
          setTimeout(() => navigate('/servicios'), 2000);
        }
      }
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      setError(error.response?.data?.error || 'Error al actualizar el estado.');
    }
  };

  const handleCloseCongratulations = () => {
    setShowCongratulations(false);
    navigate('/servicios');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white text-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-grow">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl p-8 max-w-xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Actualizar Estado del Servicio</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="estado" className="block text-gray-700 font-semibold mb-2">
                Selecciona el nuevo estado
              </label>
              <select
                id="estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                required
              >
                <option value="">Seleccionar estado</option>
                <option value="en_camino">En camino</option>
                <option value="en_lugar">En lugar</option>
                <option value="en_proceso">En proceso</option>
                <option value="finalizado">Finalizado</option>
              </select>
            </div>

            {(estado === 'en_proceso' || estado === 'finalizado') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="codigoConfirmacion" className="block text-gray-700 font-semibold mb-2">
                  Código de Confirmación
                </label>
                <input
                  type="text"
                  id="codigoConfirmacion"
                  value={codigoConfirmacion}
                  onChange={(e) => setCodigoConfirmacion(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  required
                />
              </motion.div>
            )}

            <div>
              <label htmlFor="detalles" className="block text-gray-700 font-semibold mb-2">
                Detalles adicionales
              </label>
              <textarea
                id="detalles"
                value={detalles}
                onChange={(e) => setDetalles(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                rows={4}
              />
            </div>

            {mensaje && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center text-green-600 font-semibold"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                {mensaje}
              </motion.p>
            )}
            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center text-red-600 font-semibold"
              >
                <AlertCircle className="w-5 h-5 mr-2" />
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Actualizar Estado
            </motion.button>
          </form>
        </motion.div>
      </div>
      <Footer />

      <AnimatePresence>
        {showCongratulations && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
            >
              <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Felicidades!</h2>
              <p className="text-xl text-gray-600 mb-6">
                Has completado el servicio exitosamente. En breve recibirás el pago del cliente.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCloseCongratulations}
                className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Entendido
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UpdateService;


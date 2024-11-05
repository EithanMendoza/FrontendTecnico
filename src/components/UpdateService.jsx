import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../controllers/navbarT';

const UpdateService = () => {
  const { solicitudId } = useParams();
  const [estado, setEstado] = useState('');
  const [codigoConfirmacion, setCodigoConfirmacion] = useState('');
  const [detalles, setDetalles] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      const token = localStorage.getItem('session_token');
      if (!token) {
        alert('No se ha iniciado sesión.');
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
        navigate('/servicios');
      }
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      setError(error.response?.data?.error || 'Error al actualizar el estado.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-xl mx-auto">
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
              <div>
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
              </div>
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
              />
            </div>

            {mensaje && <p className="text-green-600 text-center font-semibold">{mensaje}</p>}
            {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold py-4 px-6 rounded-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Actualizar Estado
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateService;

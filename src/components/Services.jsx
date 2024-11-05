import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../controllers/navbarT';
import Footer from '../controllers/footer'; // Importamos el Footer

const Services = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiciosAceptados = async () => {
      try {
        const token = localStorage.getItem('session_token');
        if (!token) {
          alert('No se ha iniciado sesión.');
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
          console.error('Error inesperado al obtener los servicios aceptados');
        }
      } catch (error) {
        console.error('Error al obtener los servicios aceptados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiciosAceptados();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <p className="text-xl font-semibold">Cargando servicios...</p>
      </div>
    );
  }

  const handleActualizarEstado = (solicitudId) => {
    if (!solicitudId) {
      console.error('La solicitudId es undefined, no se puede actualizar el estado.');
      return;
    }
    navigate(`/updateService/${solicitudId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-200">
      <Navbar />
      <div className="container mx-auto px-6 py-12 flex-grow">
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-12">
          Servicios Aceptados
        </h1>
        {servicios.length === 0 ? (
          <p className="text-center text-xl text-gray-600">No tienes servicios aceptados actualmente.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicios.map((servicio) => (
              <div
                key={servicio.id}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <h2 className="text-2xl font-semibold text-blue-700 mb-4">{servicio.nombre_servicio}</h2>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Detalles:</span> {servicio.detalles}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Fecha:</span> {servicio.fecha}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Hora:</span> {servicio.hora}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-semibold">Dirección:</span> {servicio.direccion}
                </p>
                <button
                  onClick={() => handleActualizarEstado(servicio.id)}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Actualizar Estado
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer /> {/* Añadimos el Footer aquí */}
    </div>
  );
};

export default Services;

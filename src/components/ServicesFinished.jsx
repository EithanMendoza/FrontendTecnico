import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../controllers/navbarT';
import Footer from '../controllers/footer'; // Importamos el Footer

const ServicesFinished = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiciosCompletados = async () => {
      try {
        const token = localStorage.getItem('session_token');
        if (!token) {
          alert('No se ha iniciado sesión.');
          navigate('/loginT'); // Redirigir al login si no hay token
          return;
        }

        const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno

        const response = await axios.get(`${apiUrl}/actualizacion/servicios-finalizados`, {
          headers: { Authorization: token },
        });

        setServicios(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los servicios completados:', error);
        setLoading(false);
      }
    };

    fetchServiciosCompletados();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800">
        <p className="text-xl font-semibold">Cargando servicios completados...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto px-6 py-12 flex-grow">
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-12">
          Historial de Servicios Completados
        </h1>
        {servicios.length === 0 ? (
          <p className="text-center text-xl text-gray-600">
            No tienes servicios completados en el historial.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicios.map((servicio) => (
              <div
                key={servicio.id}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                  {servicio.nombre_servicio}
                </h2>
                <p className="text-gray-700 mb-3">
                  <span className="font-semibold">Detalles:</span> {servicio.detalles}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Fecha:</span> {new Date(servicio.fecha).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Hora:</span> {servicio.hora}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Dirección:</span> {servicio.direccion}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer /> {/* Añadimos el Footer al final de la página */}
    </div>
  );
};

export default ServicesFinished;

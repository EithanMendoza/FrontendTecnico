import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../controllers/navbarT';
import Footer from '../controllers/footer';
import { useNavigate } from 'react-router-dom';

const Payments = () => {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('session_token');

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        if (!token) {
          alert('No se ha iniciado sesión.');
          navigate('/loginT');
          return;
        }

        const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno

        const response = await axios.get(`${apiUrl}/pago/pagos-completados`, {
          headers: { Authorization: token },
        });

        setPagos(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los pagos:', error);
        setLoading(false);
        if (error.response && error.response.status === 401) {
          alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
          navigate('/loginT');
        }
      }
    };

    fetchPagos();
  }, [navigate, token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800">
        <p className="text-xl font-semibold">Cargando pagos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-200">
      <Navbar />
      <div className="container mx-auto px-6 py-12 flex-grow">
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-12">
          Historial de Pagos Completados
        </h1>
        {pagos.length === 0 ? (
          <p className="text-center text-xl text-gray-600">
            No tienes pagos registrados en el historial.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pagos.map((pago) => (
              <div
                key={pago.id}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                  Servicio: {pago.nombre_servicio}
                </h2>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Monto:</span> ${pago.monto}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Método de Pago:</span> {pago.metodo_pago}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Estado:</span> {pago.estado}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Fecha:</span> {new Date(pago.fecha).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Payments;

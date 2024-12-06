import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../controllers/navbarT';
import Footer from '../controllers/footer';
import { useNavigate } from 'react-router-dom';
import Details from './Details';

const Payments = () => {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPago, setSelectedPago] = useState(null);
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

  const calculateCommission = (amount) => {
    return amount * 0.20; // 20% commission
  };

  const formatAmount = (amount) => {
    const numericAmount = Number(amount);
    return isNaN(numericAmount) ? '0.00' : numericAmount.toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-gray-800">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-grow">
        <h1 className="text-5xl font-extrabold text-center text-blue-800 mb-12 tracking-tight">
          Historial de Pagos Completados
        </h1>
        {pagos.length === 0 ? (
          <div className="text-center bg-white rounded-lg shadow-md p-8">
            <p className="text-2xl text-gray-600">
              No tienes pagos registrados en el historial.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pagos.map((pago) => (
              <div key={pago.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
                <div className="bg-blue-600 text-white p-6">
                  <h2 className="text-2xl font-bold truncate">{pago.nombre_servicio}</h2>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-gray-700">
                    <span className="font-semibold">Monto Original:</span> ${formatAmount(pago.monto)}
                  </p>
                  <p className="text-red-600 font-semibold">
                    Comisión (20%): ${formatAmount(calculateCommission(pago.monto))}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Método de Pago:</span> {pago.metodo_pago}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Estado:</span> {pago.estado}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Fecha:</span> {new Date(pago.fecha).toLocaleString()}
                  </p>
                  <button 
                    onClick={() => setSelectedPago(pago)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
      <Details
        isOpen={!!selectedPago}
        onClose={() => setSelectedPago(null)}
        commission={selectedPago ? calculateCommission(selectedPago.monto) : 0}
      />
    </div>
  );
};

export default Payments;

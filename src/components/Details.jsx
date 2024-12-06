import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';

const Details = ({ isOpen, onClose, commission }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
      >
        <DollarSign className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Detalles del Servicio</h2>
        <p className="text-xl text-gray-600 mb-6">
          <span className="font-semibold">Comisión de AirTecs:</span> ${commission.toFixed(2)}
        </p>
        <p className="mb-6 text-gray-600">
          En caso de que el cliente aplique la garantía, te notificaremos inmediatamente para que estés atento y puedas brindar el mejor servicio posible.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Cerrar
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Details;


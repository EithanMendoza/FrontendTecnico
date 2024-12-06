import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Phone, Briefcase, Clock, Edit2, Save, X } from 'lucide-react';
import Navbar from '../controllers/navbarT';
import Footer from '../controllers/footer';
import { isAuthenticated, addAuthHeader } from '../middleware/authMiddleware';

const PerfilT = () => {
  const [perfil, setPerfil] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    genero: 'Masculino',
    especialidad: '',
    experiencia: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [perfilCompleto, setPerfilCompleto] = useState(false);
  const [editando, setEditando] = useState(false);
  const navigate = useNavigate();

  const especialidades = [
    'Electricista',
    'Mecánico',
    'Industrial',
    'Plomero',
    'Carpintero',
    'Albañil',
    'Pintor',
    'Técnico en Refrigeración',
    'Técnico en Electrónica',
    'Soldador'
  ];

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/loginT');
    } else {
      addAuthHeader();
      fetchPerfil();
    }
  }, [navigate]);

  const fetchPerfil = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno

      const perfilResponse = await axios.get(`${apiUrl}/PerfilT/detalles`, {
        headers: {
          Authorization: localStorage.getItem('session_token')
        }
      });
      if (perfilResponse.status === 200) {
        setPerfilCompleto(true);
        setPerfil(perfilResponse.data);
      }
    } catch (err) {
      console.error('Error al obtener el perfil:', err);
      setMensaje('');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'telefono') {
      // Permitir solo números en el campo de teléfono
      const numeroLimpio = value.replace(/\D/g, '');
      setPerfil({ ...perfil, [name]: numeroLimpio });
    } else if (name === 'experiencia') {
      // Limitar los años de experiencia a un máximo de 100
      const años = parseInt(value, 10);
      if (!isNaN(años) && años >= 0 && años <= 100) {
        setPerfil({ ...perfil, [name]: años.toString() });
      }
    } else {
      setPerfil({ ...perfil, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno

      const response = await axios.post(`${apiUrl}/PerfilT/crear-perfilT`, perfil, {
        headers: {
          Authorization: localStorage.getItem('session_token')
        }
      });
      if (response.status === 201 || response.status === 200) {
        setMensaje('Perfil actualizado correctamente.');
        setPerfilCompleto(true);
        setEditando(false);
      } else {
        setError('Error al actualizar el perfil.');
      }
    } catch (err) {
      console.error('Error al actualizar el perfil:', err);
      setError('Error al actualizar el perfil. Inténtalo nuevamente.');
    }
  };

  const handleEditarPerfil = () => {
    setEditando(true);
  };

  const handleCancelarEdicion = () => {
    setEditando(false);
    fetchPerfil(); // Recargar los datos originales
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-blue-100 to-gray-100">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-10 flex-grow"
      >
        <h1 className="text-4xl font-extrabold text-blue-800 mb-10 text-center">Perfil del Técnico</h1>

        <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
          {perfilCompleto && !editando ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-semibold mb-6 text-gray-800 flex items-center">
                <User className="mr-2" /> Detalles del Perfil
              </h2>
              <div className="space-y-6">
                <div className="flex items-center text-lg text-gray-700">
                  <User className="mr-3 text-blue-600" />
                  <span><strong>Nombre:</strong> {perfil.nombre} {perfil.apellido}</span>
                </div>
                <div className="flex items-center text-lg text-gray-700">
                  <Phone className="mr-3 text-blue-600" />
                  <span><strong>Teléfono:</strong> {perfil.telefono}</span>
                </div>
                <div className="flex items-center text-lg text-gray-700">
                  <User className="mr-3 text-blue-600" />
                  <span><strong>Género:</strong> {perfil.genero}</span>
                </div>
                <div className="flex items-center text-lg text-gray-700">
                  <Briefcase className="mr-3 text-blue-600" />
                  <span><strong>Especialidad:</strong> {perfil.especialidad}</span>
                </div>
                <div className="flex items-center text-lg text-gray-700">
                  <Clock className="mr-3 text-blue-600" />
                  <span><strong>Experiencia:</strong> {perfil.experiencia} años</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEditarPerfil}
                className="mt-8 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
              >
                <Edit2 className="mr-2" /> Editar Perfil
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <h2 className="text-3xl font-semibold mb-8 text-gray-800 flex items-center">
                <Edit2 className="mr-2" /> {editando ? 'Editar Perfil' : 'Completar Perfil'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className="block text-gray-800 font-bold mb-2">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={perfil.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="apellido" className="block text-gray-800 font-bold mb-2">Apellido</label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={perfil.apellido}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="telefono" className="block text-gray-800 font-bold mb-2">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={perfil.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                  pattern="[0-9]*"
                  inputMode="numeric"
                />
              </div>

              <div>
                <label htmlFor="genero" className="block text-gray-800 font-bold mb-2">Género</label>
                <select
                  id="genero"
                  name="genero"
                  value={perfil.genero}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div>
                <label htmlFor="especialidad" className="block text-gray-800 font-bold mb-2">Especialidad</label>
                <select
                  id="especialidad"
                  name="especialidad"
                  value={perfil.especialidad}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Seleccione una especialidad</option>
                  {especialidades.map((esp, index) => (
                    <option key={index} value={esp}>{esp}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="experiencia" className="block text-gray-800 font-bold mb-2">Experiencia (años)</label>
                <input
                  type="number"
                  id="experiencia"
                  name="experiencia"
                  value={perfil.experiencia}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                  min="0"
                  max="100"
                />
              </div>

              {mensaje && <p className="text-green-600 font-semibold">{mensaje}</p>}
              {error && <p className="text-red-600 font-semibold">{error}</p>}

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex-1 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
                >
                  <Save className="mr-2" /> Guardar Perfil
                </motion.button>
                {editando && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleCancelarEdicion}
                    className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors duration-300 flex items-center justify-center"
                  >
                    <X className="mr-2" /> Cancelar
                  </motion.button>
                )}
              </div>
            </motion.form>
          )}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default PerfilT;


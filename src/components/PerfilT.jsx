import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../controllers/navbarT';
import Footer from '../controllers/footer'; // Importamos el Footer
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
    setPerfil({ ...perfil, [name]: value });
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
        setMensaje('Perfil creado/actualizado correctamente.');
        setPerfilCompleto(true);
        setEditando(false);
      } else {
        setError('Error al crear o actualizar el perfil.');
      }
    } catch (err) {
      console.error('Error al crear o actualizar el perfil:', err);
      setError('Error al crear o actualizar el perfil. Inténtalo nuevamente.');
    }
  };

  const handleEditarPerfil = () => {
    setEditando(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-blue-100 to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-10 flex-grow">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-10 text-center">Perfil del Técnico</h1>

        {perfilCompleto && !editando ? (
          <div className="max-w-xl mx-auto bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Detalles del Perfil</h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-700"><strong>Nombre:</strong> {perfil.nombre}</p>
              <p className="text-lg text-gray-700"><strong>Apellido:</strong> {perfil.apellido}</p>
              <p className="text-lg text-gray-700"><strong>Teléfono:</strong> {perfil.telefono}</p>
              <p className="text-lg text-gray-700"><strong>Género:</strong> {perfil.genero}</p>
              <p className="text-lg text-gray-700"><strong>Especialidad:</strong> {perfil.especialidad}</p>
              <p className="text-lg text-gray-700"><strong>Experiencia:</strong> {perfil.experiencia}</p>
            </div>
            <button
              onClick={handleEditarPerfil}
              className="mt-8 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Editar Perfil
            </button>
          </div>
        ) : (
          <form className="max-w-xl mx-auto bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-semibold mb-8 text-gray-800">Completar o Editar Perfil</h2>
            <div className="mb-6">
              <label htmlFor="nombre" className="block text-gray-800 font-bold mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={perfil.nombre}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="apellido" className="block text-gray-800 font-bold mb-2">
                Apellido
              </label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={perfil.apellido}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="telefono" className="block text-gray-800 font-bold mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={perfil.telefono}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="genero" className="block text-gray-800 font-bold mb-2">
                Género
              </label>
              <select
                id="genero"
                name="genero"
                value={perfil.genero}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="especialidad" className="block text-gray-800 font-bold mb-2">
                Especialidad
              </label>
              <input
                type="text"
                id="especialidad"
                name="especialidad"
                value={perfil.especialidad}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="experiencia" className="block text-gray-800 font-bold mb-2">
                Experiencia (Ej: "5 años")
              </label>
              <input
                type="text"
                id="experiencia"
                name="experiencia"
                value={perfil.experiencia}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            {mensaje && <p className="text-green-600 mb-4">{mensaje}</p>}
            {error && <p className="text-red-600 mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Guardar Perfil
            </button>
          </form>
        )}
      </div>
      <Footer /> {/* Añadimos el Footer aquí */}
    </div>
  );
};

export default PerfilT;

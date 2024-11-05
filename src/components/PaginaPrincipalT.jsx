import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../controllers/navbarT';
import Footer from '../controllers/footer';
import { isAuthenticated } from '../middleware/authMiddleware';

const PaginaPrincipalT = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [showPerfilModal, setShowPerfilModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/loginT');
    }
  }, [navigate]);

  const fetchSolicitudes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('session_token');
      if (!token) {
        alert('No se ha encontrado el token de sesión. Por favor, inicia sesión nuevamente.');
        navigate('/loginT');
        return;
      }

      const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno

      const response = await axios.get(`${apiUrl}/aceptacionSolicitudT/solicitudes-pendientes`, {
        headers: {
          Authorization: token,
        },
      });

      setSolicitudes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener las solicitudes pendientes:', error);
      setLoading(false);
      alert('Hubo un error al cargar las solicitudes pendientes. Intenta nuevamente.');
    }
  };

  useEffect(() => {
    fetchSolicitudes();

    const tutorialShown = localStorage.getItem('tutorialShown');
    if (!tutorialShown) {
      setShowTutorial(true);
      localStorage.setItem('tutorialShown', 'true');
    }
  }, []);

  const confirmarAceptacion = async () => {
    if (!selectedSolicitud) {
      alert('Por favor selecciona una solicitud primero.');
      return;
    }

    try {
      const token = localStorage.getItem('session_token');
      if (!token) {
        alert('No se ha encontrado el token de sesión. Por favor, inicia sesión nuevamente.');
        navigate('/loginT');
        return;
      }

      const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno

      const perfilResponse = await axios.get(`${apiUrl}/perfilT/completo`, {
        headers: {
          Authorization: token,
        },
      });

      if (perfilResponse.data.completo) {
        await axios.put(
          `${apiUrl}/aceptacionSolicitudT/aceptar-solicitud/${selectedSolicitud.id}`,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );

        alert('Solicitud aceptada correctamente.');
        fetchSolicitudes();
        setSelectedSolicitud(null);
      } else {
        setShowPerfilModal(true);
      }
    } catch (error) {
      console.error('Error al aceptar la solicitud:', error);
      alert('Hubo un error al aceptar la solicitud.');
    }
  };

  const cancelarSolicitud = async (idSolicitud) => {
    try {
      const token = localStorage.getItem('session_token');
      if (!token) {
        alert('No se ha encontrado el token de sesión. Por favor, inicia sesión nuevamente.');
        navigate('/loginT');
        return;
      }

      const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno

      await axios.put(`${apiUrl}/aceptacionSolicitudT/cancelar-solicitud/${idSolicitud}`, {}, {
        headers: {
          Authorization: token,
        },
      });
      alert('Solicitud cancelada correctamente.');
      fetchSolicitudes();
    } catch (error) {
      console.error('Error al cancelar la solicitud:', error);
      alert('Hubo un error al cancelar la solicitud.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-700">
        Cargando solicitudes pendientes...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen flex flex-col text-gray-800">
      <Navbar />
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 flex-grow">
        <h1 className="text-5xl font-extrabold text-center mb-12 drop-shadow-lg text-gray-800">Solicitudes Pendientes</h1>

        <div className="text-center mb-8">
          <button
            onClick={fetchSolicitudes}
            className="bg-gradient-to-r from-gray-600 to-gray-800 text-white font-bold px-8 py-3 rounded-full hover:opacity-90 transition-all duration-300 transform hover:scale-105"
          >
            Cargar Solicitudes Pendientes
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {solicitudes.map((solicitud) => (
            <div
              key={solicitud.id}
              className="flex flex-col items-center bg-white text-gray-800 rounded-3xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={solicitud.imagenUrl || 'https://via.placeholder.com/400x200'}
                alt={solicitud.nombre_servicio}
                className="w-full h-48 object-cover"
              />
              <div className="w-full p-6">
                <h2 className="text-3xl font-bold mb-2">{solicitud.nombre_servicio}</h2>
                <p className="text-gray-600 mb-4">{solicitud.detalles}</p>
                <div className="flex justify-around">
                  <button
                    onClick={() => {
                      setSelectedSolicitud(solicitud);
                      confirmarAceptacion();
                    }}
                    className="bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105"
                  >
                    ACEPTAR
                  </button>
                  <button
                    onClick={() => cancelarSolicitud(solicitud.id)}
                    className="bg-gradient-to-r from-red-500 to-red-700 text-white font-bold px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />

      {showPerfilModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-gray-800 p-8 rounded-lg max-w-md w-full shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">Perfil Incompleto</h2>
            <p className="mb-6">Debe completar su perfil antes de aceptar un servicio.</p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowPerfilModal(false);
                  navigate('/perfilT');
                }}
                className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-2 rounded-lg mr-2 hover:opacity-90 transition-all duration-300 transform hover:scale-105"
              >
                Crear Perfil
              </button>
              <button
                onClick={() => setShowPerfilModal(false)}
                className="bg-gradient-to-r from-gray-500 to-gray-700 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginaPrincipalT;

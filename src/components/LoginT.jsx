import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope, FaTools, FaPhone, FaFan, FaSnowflake, FaArrowLeft } from 'react-icons/fa';
import logo from '../assets/navbar-logo.png';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const apiUrl = import.meta.env.VITE_API_URL; // Obtener la URL de la variable de entorno

    if (isLogin) {
      try {
        const response = await fetch(`${apiUrl}/autenticacionTecnicos/loginT`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage('Inicio de sesión exitoso');
          localStorage.setItem('session_token', data.session_token);

          // Verificar si es la primera vez que inicia sesión
          const hasSeenTutorial = JSON.parse(localStorage.getItem('hasSeenTutorial')) || false;

          if (!hasSeenTutorial) {
            // Redirigir al tutorial si es la primera vez
            setTimeout(() => {
              navigate('/tutorial');
            }, 500);
          } else {
            // Si ya ha visto el tutorial, navegar a la página principal
            setTimeout(() => {
              navigate('/homeT');
            }, 500);
          }

          // Marcar que el tutorial ya se ha visto
          localStorage.setItem('hasSeenTutorial', JSON.stringify(true));
        } else {
          setMessage(data.error || 'Error al iniciar sesión');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        setMessage('Error al iniciar sesión');
      } finally {
        setIsLoading(false);
      }
    } else {
      if (password !== confirmPassword) {
        setMessage('Las contraseñas no coinciden');
        setIsLoading(false);
        return;
      }

      if (!especialidad || !telefono) {
        setMessage('Todos los campos son obligatorios');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/autenticacionTecnicos/registerT`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre_usuario: username,
            email,
            password,
            especialidad,
            telefono,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage('Usuario registrado correctamente');
          setIsLogin(true);
        } else {
          setMessage(data.error || 'Error al registrar el usuario');
        }
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
        setMessage('Error al registrar el usuario');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setEspecialidad('');
    setTelefono('');
    setMessage('');
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-blue-600 flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-30"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-30"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 relative z-10"
      >
        <img src={logo} alt="Air Tec's Logo" className="w-44 h-16 object-contain bg-white rounded-lg p-2" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </svg>
        </div>

        <motion.h2
          className="text-3xl font-bold text-blue-900 mb-6 text-center relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {isLogin ? 'Bienvenido, Técnico' : 'Únete a Nuestro Equipo'}
        </motion.h2>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`text-center mb-4 p-2 rounded ${
                message.includes('exitoso') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <AnimatePresence>
            {!isLogin && (
              <motion.div
                className="relative"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaUser className="absolute top-3 left-3 text-blue-500" />
                <input
                  type="text"
                  placeholder="Nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm"
                  required={!isLogin}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <FaEnvelope className="absolute top-3 left-3 text-blue-500" />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm"
              required
            />
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <FaLock className="absolute top-3 left-3 text-blue-500" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm"
              required
            />
          </motion.div>

          <AnimatePresence>
            {!isLogin && (
              <>
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaLock className="absolute top-3 left-3 text-blue-500" />
                  <input
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm"
                    required
                  />
                </motion.div>
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaTools className="absolute top-3 left-3 text-blue-500" />
                  <input
                    type="text"
                    placeholder="Especialidad"
                    value={especialidad}
                    onChange={(e) => setEspecialidad(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm"
                    required
                  />
                </motion.div>
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaPhone className="absolute top-3 left-3 text-blue-500" />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm"
                    required
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(6, 182, 212, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-2 rounded-lg shadow-md hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
            type="submit"
            disabled={isLoading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : null}
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </motion.button>
        </form>

        <motion.div
          className="mt-6 text-center relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p className="text-gray-600">
            {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
          </p>
          <motion.button
            onClick={toggleAuthMode}
            className="text-cyan-600 font-semibold mt-2 hover:underline focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
          </motion.button>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-10 -left-10 text-cyan-200 opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <FaFan size={80} />
        </motion.div>
        <motion.div
          className="absolute -bottom-10 -right-10 text-blue-200 opacity-20"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <FaSnowflake size={80} />
        </motion.div>
      </motion.div>

      <motion.a
        href="/"
        className="mt-8 text-white font-semibold flex items-center hover:underline"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaArrowLeft className="mr-2" />
        Volver a la página principal
      </motion.a>
    </div>
  );
};

export default AuthPage;


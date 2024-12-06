import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTools, FaSnowflake, FaFan, FaThermometerHalf, FaFacebook, FaInstagram, FaEnvelope, FaChevronDown, FaChevronUp, FaArrowRight } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import { FaShieldAlt } from 'react-icons/fa';
import { IoMdSpeedometer } from 'react-icons/io';
import logo from '../assets/navbar-logo.png';
import tecnico from '../assets/tecnico.png';

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('inicio');
  const [activeFAQ, setActiveFAQ] = useState(null);
  const navigate = useNavigate();

  const sectionRefs = {
    inicio: useRef(null),
    servicios: useRef(null),
    'sobre-nosotros': useRef(null),
    'preguntas-frecuentes': useRef(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const currentPosition = window.scrollY + 100;
      Object.entries(sectionRefs).forEach(([key, ref]) => {
        if (ref.current && ref.current.offsetTop <= currentPosition && 
            ref.current.offsetTop + ref.current.offsetHeight > currentPosition) {
          setActiveSection(key);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = sectionRefs[sectionId].current;
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setMenuOpen(false);
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "¿Cuáles son los beneficios de unirse a nuestra plataforma?",
      answer: "Al unirte a nuestra plataforma, tendrás acceso a una amplia red de clientes, flexibilidad en tus horarios, y oportunidades de crecimiento profesional."
    },
    {
      question: "¿Qué tipo de soporte ofrecen a los técnicos?",
      answer: "Ofrecemos soporte técnico continuo, capacitaciones regulares, y un equipo dedicado para ayudarte con cualquier problema o duda que puedas tener."
    },
    {
      question: "¿Cómo se manejan los pagos?",
      answer: "Los pagos se procesan de manera segura a través de nuestra plataforma. Recibirás tus ganancias semanalmente mediante transferencia bancaria."
    },
    {
      question: "¿Qué calificaciones necesito para unirme?",
      answer: "Buscamos técnicos certificados con experiencia en reparación y mantenimiento de aires acondicionados y refrigeradores. También valoramos habilidades de servicio al cliente."
    },
    {
      question: "¿Puedo elegir mis propios horarios?",
      answer: "Sí, nuestra plataforma te permite establecer tu propia disponibilidad y elegir los trabajos que mejor se adapten a tu horario."
    }
  ];

  return (
    <div className="font-sans bg-gray-50 text-gray-900">
      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <img src={logo} alt="Air Tec's Logo" className="w-44 h-16 object-contain" />
          </motion.div>

          <nav className="hidden lg:flex items-center space-x-10">
            {['Inicio', 'Servicios', 'Sobre Nosotros', 'Preguntas Frecuentes'].map((item, index) => (
              <motion.a
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className={`text-gray-800 font-semibold hover:text-cyan-600 transition duration-300 text-base cursor-pointer
                            ${activeSection === item.toLowerCase().replace(' ', '-') ? 'text-cyan-600' : ''}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <div className="hidden lg:flex space-x-4">
            <motion.button
              onClick={() => navigate('/loginT')}
              className="px-6 py-2.5 bg-cyan-600 text-white font-semibold rounded-full shadow-lg hover:bg-cyan-700 transition duration-300 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Iniciar Sesión
            </motion.button>
          </div>

          <button
            className="lg:hidden text-cyan-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="lg:hidden bg-white shadow-lg py-6 absolute top-full w-full"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col items-center space-y-4">
                {['Inicio', 'Servicios', 'Sobre Nosotros', 'Preguntas Frecuentes'].map((item) => (
                  <a
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                    className={`text-gray-800 font-semibold hover:text-cyan-600 transition duration-300 cursor-pointer
                                ${activeSection === item.toLowerCase().replace(' ', '-') ? 'text-cyan-600' : ''}`}
                  >
                    {item}
                  </a>
                ))}
                <div className="w-full px-4 space-y-3 pt-4">
                  <button 
                    onClick={() => navigate('/loginT')}
                    className="w-full px-6 py-2.5 bg-cyan-600 text-white font-semibold rounded-full shadow-lg hover:bg-cyan-700 transition duration-300"
                  >
                    Iniciar Sesión
                  </button>
                  <button 
                    onClick={() => navigate('/loginT')}
                    className="w-full px-6 py-2.5 border-2 border-cyan-600 text-cyan-600 font-semibold rounded-full hover:bg-cyan-600 hover:text-white transition duration-300"
                  >
                    Únete a Nuestro Equipo
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section ref={sectionRefs.inicio} className="pt-32 pb-20 bg-gradient-to-b from-cyan-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:space-x-20">
            <motion.div
              className="text-center lg:text-left mb-10 lg:mb-0"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-bold text-4xl lg:text-6xl leading-tight mb-6 text-gray-900">
                Forma parte de nuestro <span className="text-cyan-600">equipo élite</span> de técnicos
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                Ofrece tus servicios de reparación y mantenimiento. Sé tu propio jefe y únete a una red de profesionales altamente capacitados.
              </p>
              <motion.button
                onClick={() => navigate('/loginT')}
                className="px-8 py-4 bg-cyan-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-cyan-700 transition duration-300 flex items-center justify-center mx-auto lg:mx-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Comienza Ahora
                <FaArrowRight className="ml-2" />
              </motion.button>
              <motion.button
                onClick={() => navigate('/como-funciona')}
                className="mt-4 px-8 py-4 bg-white text-cyan-600 font-semibold text-lg rounded-full shadow-lg hover:bg-gray-100 transition duration-300 flex items-center justify-center mx-auto lg:mx-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Descubre los benificios
                <FaArrowRight className="ml-2" />
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="lg:w-1/2"
            >
              <img 
                src={tecnico}
                alt="Técnico de Air Tec's" 
                className="w-full h-auto mx-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={sectionRefs['sobre-nosotros']} className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-cyan-600 font-semibold text-lg mb-4 block">Por qué unirte a nosotros</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">Características de Nuestro Equipo</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Benefíciate de nuestra experiencia y formación continua</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Transparente", icon: <AiOutlineEye size={50} className="text-cyan-600" />, desc: "Condiciones claras y justas para todos los técnicos." },
              { title: "Confiable", icon: <FaShieldAlt size={50} className="text-cyan-600" />, desc: "Trabaja con profesionales y genera confianza." },
              { title: "Eficiente", icon: <IoMdSpeedometer size={50} className="text-cyan-600" />, desc: "Servicios rápidos que mejoran tu productividad." },
            ].map(({ title, icon, desc }, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-200"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-cyan-100 rounded-2xl flex items-center justify-center">
                    {icon}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={sectionRefs.servicios} className="py-24 bg-gradient-to-b from-cyan-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-cyan-600 font-semibold text-lg mb-4 block">Servicios Ofrecidos</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">Oportunidades de Trabajo</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Únete a nuestra red y ofrece estos servicios a nuestros clientes</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Mantenimiento de Aires Acondicionados", desc: "Mantenimiento y reparación de sistemas de aire acondicionado.", icon: <FaFan size={40} className="text-cyan-600" /> },
              { title: "Reparación de Aires Acondicionados", desc: "Servicio especializado en reparación de equipos de aire acondicionado.", icon: <FaTools size={40} className="text-cyan-600" /> },
              { title: "Mantenimiento de Refrigeradores", desc: "Servicios de mantenimiento para mantener refrigeradores en óptimas condiciones.", icon: <FaSnowflake size={40} className="text-cyan-600" /> },
              { title: "Reparación de Refrigeradores", desc: "Reparaciones rápidas y efectivas para refrigeradores.", icon: <FaThermometerHalf size={40} className="text-cyan-600" /> },
            ].map(({ title, desc, icon }, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-200"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center">
                    {icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={sectionRefs['preguntas-frecuentes']} className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-cyan-600 font-semibold text-lg mb-4 block">Dudas Comunes</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Encuentra respuestas a las preguntas más comunes sobre unirte a nuestro equipo</p>
          </motion.div>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  className="flex justify-between items-center w-full text-left font-semibold text-lg text-gray-900 bg-cyan-50 p-4 rounded-lg hover:bg-cyan-100 transition-colors duration-300"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  {activeFAQ === index ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <AnimatePresence>
                  {activeFAQ === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white p-4 rounded-b-lg border-t border-cyan-100"
                    >
                      <p className="text-gray-600">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* CTA Section */}
<section className="py-24 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white">
  <div className="container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-5xl mx-auto"
    >
      {/* Primera acción: Unirse al equipo */}
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-bold mb-6">¿Te apasiona ayudar a otros?</h2>
        <p className="text-xl mb-8 text-cyan-100">
          Forma parte de nuestro equipo de expertos técnicos y accede a increíbles beneficios. Lleva tu carrera al siguiente nivel.
        </p>
        <motion.button
          onClick={() => navigate('/loginT')}
          className="px-8 py-4 bg-white text-cyan-600 font-semibold text-lg rounded-full shadow-lg hover:bg-cyan-50 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ¡Únete a Nuestro Equipo!
        </motion.button>
      </div>

      {/* Separador visual */}
      <div className="h-1 w-24 bg-white mx-auto mb-16"></div>

      {/* Segunda acción: Solicitar Servicio */}
      <div className="text-center">
        <h2 className="text-3xl lg:text-5xl font-bold mb-6">¿Necesitas un servicio técnico confiable?</h2>
        <p className="text-xl mb-8 text-cyan-100">
          Nuestros expertos están listos para ayudarte con la reparación y mantenimiento de tus equipos. ¡Solicita tu servicio ahora!
        </p>
        <motion.button
          onClick={() => window.location.href = 'https://frontend-usuario.vercel.app/'}
          className="px-8 py-4 bg-white text-cyan-600 font-semibold text-lg rounded-full shadow-lg hover:bg-cyan-50 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Solicitar Servicio
        </motion.button>
      </div>
    </motion.div>
  </div>
</section>


      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <img src={logo} alt="Air Tec's Logo" className="w-44 h-16 object-contain mb-6" />
              <p className="text-gray-400 mb-6 leading-relaxed">
                Únete a nosotros y accede a una amplia gama de oportunidades laborales en el sector de servicios técnicos. ¡Tu éxito es nuestra misión!
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <FaFacebook size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <FaInstagram size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <FaEnvelope size={24} />
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <h4 className="text-xl font-semibold mb-6">Enlaces Rápidos</h4>
              <ul className="space-y-3">
                {['Inicio', 'Servicios', 'Sobre Nosotros', 'Preguntas Frecuentes'].map((item) => (
                  <li key={item}>
                    <a 
                      onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                      className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                    >
                      {item}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    onClick={() => navigate('/terminos-y-condiciones')}
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    Términos y Condiciones
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-xl font-semibold mb-6">Contáctanos</h4>
              <p className="text-gray-400 mb-3">Email: contacto@airtecs.com</p>
              <p className="text-gray-400 mb-3">Teléfono: +52 9993487512</p>
              <p className="text-gray-400">Dirección: Calle 60 123 Col. Centro, Mérida, Yucatán</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">&copy; 2023 Air Tec's. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;


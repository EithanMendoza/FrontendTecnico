import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaClipboardCheck, FaTools, FaMoneyBillWave, FaArrowLeft, FaUserCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BeneficiosTecnicos = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll('.scroll-section');
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white" ref={scrollRef}>
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center text-cyan-600 hover:text-cyan-700 transition-colors duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaArrowLeft className="mr-2" />
            Volver a la página principal
          </motion.button>
          <div className="flex space-x-4">
            {['registro', 'servicios', 'pagos', 'adicionales'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-cyan-600 hover:text-cyan-700 transition-colors duration-300 font-medium"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-24">
        <motion.h1
          className="text-4xl lg:text-5xl font-bold text-cyan-800 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Beneficios de Trabajar con Nosotros
        </motion.h1>

        <motion.p
          className="text-xl text-cyan-700 text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Descubre cómo nuestra plataforma puede impulsar tu carrera como técnico y maximizar tus oportunidades de crecimiento profesional.
        </motion.p>

        <div className="space-y-16">
          <Section
            id="registro"
            title="Registro y Acceso Simplificado"
            icon={<FaClipboardCheck className="text-5xl text-cyan-600 mb-4" />}
            content={[
              "Acceso a múltiples solicitudes de servicio que puedes aceptar para realizar trabajos.",
              "Crea un perfil profesional destacando tus habilidades y experiencia.",
              "Sube certificaciones y documentos para aumentar tu credibilidad.",
              "Establece tu área de servicio y disponibilidad horaria personalizada.",
              "Recibe notificaciones de nuevas oportunidades de trabajo en tu zona."
            ]}
          />

          <Section
            id="servicios"
            title="Amplia Gama de Servicios"
            icon={<FaTools className="text-5xl text-cyan-600 mb-4" />}
            content={[
              "Ofrece servicios de mantenimiento y reparación de climas y refrigeradores.",
              "Elige los servicios que deseas ofrecer según tu experiencia.",
              "Accede a recursos y guías técnicas para cada tipo de servicio.",
              "Participa en programas de capacitación para ampliar tus habilidades.",
              "Recibe actualizaciones sobre nuevas tecnologías y mejores prácticas."
            ]}
          />

          <Section
            id="pagos"
            title="Sistema de Pagos Transparente"
            icon={<FaMoneyBillWave className="text-5xl text-cyan-600 mb-4" />}
            content={[
              "Gana 680 pesos por servicio, con una comisión del 20% por nuestra plataforma.",
              "Pagos procesados semanalmente para tu comodidad.",
              "Panel detallado de tus ganancias y comisiones.",
              "Opciones de pago flexibles, incluyendo transferencias y pagos electrónicos.",
              "Bonificaciones por alto rendimiento y satisfacción del cliente."
            ]}
          />

          <Section
            id="adicionales"
            title="Herramientas para tu Éxito"
            icon={<FaUserCog className="text-5xl text-cyan-600 mb-4" />}
            content={[
              "Actualiza el estado de los servicios en tiempo real.",
              "Panel de control con estadísticas de tus servicios realizados.",
              "Sistema de calificaciones mutuas entre técnicos y clientes.",
              "Soporte técnico y atención al cliente disponible 24/7.",
              "Oportunidades de crecimiento y programas de fidelización."
            ]}
          />
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <button
            onClick={() => navigate('/loginT')}
            className="px-8 py-4 bg-cyan-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-cyan-700 transition duration-300 transform hover:scale-105"
          >
            Únete como Técnico
          </button>
        </motion.div>
      </div>
    </div>
  );
};

const Section = ({ id, title, icon, content }) => {
  return (
    <motion.div
      id={id}
      className="scroll-section bg-white rounded-lg shadow-lg p-8 transition-all duration-300 ease-in-out hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex items-center mb-6">
        <div className="bg-cyan-100 rounded-full p-3 mr-4">
          {icon}
        </div>
        <h2 className="text-3xl font-semibold text-cyan-800">{title}</h2>
      </div>
      <ul className="space-y-4">
        {content.map((item, index) => (
          <motion.li
            key={index}
            className="flex items-start"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <span className="text-cyan-600 mr-2 text-lg">•</span>
            <span className="text-gray-700">{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default BeneficiosTecnicos;


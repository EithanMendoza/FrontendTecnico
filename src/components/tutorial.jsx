import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Briefcase, FileText, WrenchIcon as WrenchScrewdriver, DollarSign, Award } from 'lucide-react';

const Tutorial = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const totalSteps = 5;

  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      localStorage.setItem('tutorial_completed', 'true');
      navigate('/homeT');
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const steps = [
    {
      title: "Bienvenido a Airtecs",
      content: "Airtecs es su plataforma profesional para conectar con clientes que requieren servicios de mantenimiento y reparación de aires acondicionados y refrigeradores. Aquí podrá gestionar solicitudes, actualizar el progreso de sus trabajos y recibir pagos de manera eficiente y segura.",
      icon: Briefcase
    },
    {
      title: "Gestión de Solicitudes",
      content: "Recibirá notificaciones de nuevas solicitudes de servicio. Podrá revisar los detalles del trabajo, aceptar las que le interesen y declinar las que no pueda atender. Una vez aceptada, tendrá la posibilidad de comunicarse directamente con el cliente para coordinar los detalles específicos del servicio.",
      icon: FileText
    },
    {
      title: "Actualización de Progreso",
      content: "Mantenga a sus clientes informados sobre el avance de su servicio. Tiene la opción de agregar fotografías, comentarios y marcar hitos importantes durante el proceso. Esta práctica ayuda a construir confianza y mejorar significativamente la satisfacción del cliente.",
      icon: WrenchScrewdriver
    },
    {
      title: "Pagos y Comisiones",
      content: "Por cada servicio completado, recibirá un pago de 680, que corresponde al 80% del costo total de 850. Airtecs retiene una comisión del 20% (170) por el uso de la plataforma, soporte técnico y promoción. Los pagos se procesan una vez que el cliente aprueba el trabajo finalizado.",
      icon: DollarSign
    },
    {
      title: "Mejores Prácticas",
      content: "Para alcanzar el éxito en Airtecs, es fundamental ser puntual, mantener una comunicación clara, proporcionar un servicio de alta calidad y mantener siempre una actitud profesional. Las buenas calificaciones y reseñas positivas le ayudarán a obtener más trabajos y construir una reputación sólida en la plataforma.",
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <motion.div 
        className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Bienvenido a Airtecs</h1>
        
        <div className="mb-10 bg-gray-200 rounded-full h-2">
          <motion.div 
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-10"
          >
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full mr-6">
                {React.createElement(steps[step - 1].icon, { size: 48, className: "text-blue-600" })}
              </div>
              <h2 className="text-3xl font-semibold text-gray-700">{steps[step - 1].title}</h2>
            </div>
            <p className="text-gray-600 text-xl leading-relaxed">{steps[step - 1].content}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-12">
          <motion.button
            onClick={handlePrevStep}
            className={`px-6 py-3 rounded-md text-blue-600 font-semibold text-lg flex items-center ${step === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-50'}`}
            whileHover={{ scale: step !== 1 ? 1.05 : 1 }}
            whileTap={{ scale: step !== 1 ? 0.95 : 1 }}
            disabled={step === 1}
          >
            <ArrowLeft className="mr-2" size={20} />
            Anterior
          </motion.button>
          <motion.button
            onClick={handleNextStep}
            className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold text-lg hover:bg-blue-700 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {step < totalSteps ? 'Siguiente' : 'Comenzar'}
            <ArrowRight className="ml-2" size={20} />
          </motion.button>
        </div>

        <div className="mt-8 text-center">
          <a href="/terminos-y-condiciones" className="text-blue-600 hover:underline text-lg">
            Términos y Condiciones
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Tutorial;

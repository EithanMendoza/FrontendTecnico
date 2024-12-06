import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
  const navigate = useNavigate();

  const terms = [
    {
      title: "1. Aceptación de los Términos",
      content: "Al registrarse y utilizar la plataforma Airtecs (la \"Plataforma\"), como técnico, usted acepta los presentes Términos y Condiciones. Si no está de acuerdo con alguno de los términos establecidos, deberá abstenerse de utilizar la Plataforma."
    },
    {
      title: "2. Descripción del Servicio",
      content: "Airtecs permite a los técnicos registrados aceptar, gestionar y completar solicitudes de servicio técnico relacionadas con la instalación, mantenimiento y reparación de aires acondicionados y otros servicios."
    },
    {
      title: "3. Condiciones de Registro",
      content: "Los técnicos deben proporcionar información profesional precisa, incluyendo documentación y experiencia relevante. La información proporcionada será verificada por Airtecs para garantizar que los técnicos cumplan con los estándares requeridos."
    },
    {
      title: "4. Tarifas y Pagos",
      content: "**Comisiones:** Los técnicos aceptan que Airtecs cobrará una comisión por cada servicio completado. El porcentaje será claramente indicado al momento de la transacción.\n\n**Pagos:** Los técnicos recibirán los pagos correspondientes por los servicios prestados, menos la comisión de Airtecs, a través de los métodos de pago establecidos en la Plataforma."
    },
    {
      title: "5. Garantía de Servicio",
      content: "**Compromiso del Técnico:** Los técnicos se comprometen a realizar las reparaciones o correcciones necesarias si un usuario solicita una revisión dentro de los 3 días de garantía, sin costo adicional para el cliente.\n\n**Limitaciones:** La garantía se limita a las fallas relacionadas directamente con el servicio prestado y no incluye trabajos fuera del alcance original, ni daños por mal uso o factores externos."
    },
    {
      title: "6. Responsabilidad del Servicio",
      content: "Los técnicos son responsables de la calidad del servicio proporcionado, así como de cumplir con las leyes locales y regulaciones aplicables. En caso de disputas, Airtecs actuará como intermediario para facilitar la solución del conflicto."
    },
    {
      title: "7. Cancelación de Servicios",
      content: "Los técnicos deben notificar con antelación si no pueden completar un servicio asignado. El incumplimiento injustificado de servicios asignados puede resultar en la suspensión o eliminación del técnico de la Plataforma."
    },
    {
      title: "8. Privacidad de los Datos",
      content: "Airtecs se compromete a proteger los datos personales proporcionados por los técnicos. Estos serán utilizados exclusivamente para la gestión de los servicios y no serán compartidos sin consentimiento."
    },
    {
      title: "9. Ley Aplicable y Resolución de Disputas",
      content: "Estos términos están regidos por las leyes del país donde Airtecs está registrado. Cualquier disputa será resuelta mediante arbitraje en la jurisdicción correspondiente."
    },
    {
      title: "10. Uso Aceptable de la Plataforma",
      content: "Los técnicos deben utilizar la Plataforma únicamente para aceptar, gestionar y completar solicitudes de servicio de forma profesional y ética. Está prohibido:\n- Proporcionar información falsa en su perfil o en las solicitudes.\n- Contactar directamente a los clientes para negociar servicios fuera de la Plataforma.\n- Realizar actividades que dañen la reputación de Airtecs o de otros técnicos."
    },
    {
      title: "11. Conducta Profesional",
      content: "Los técnicos deben:\n- Presentarse puntualmente en las citas acordadas con los clientes.\n- Proporcionar un servicio profesional, cortés y respetuoso en todo momento.\n- Garantizar que las herramientas y materiales utilizados cumplan con estándares de calidad."
    },
    {
      title: "12. Evaluaciones y Calificaciones",
      content: "Los técnicos aceptan ser evaluados por los clientes después de completar un servicio. Estas calificaciones y comentarios serán visibles para otros usuarios de la Plataforma. Airtecs se reserva el derecho de tomar medidas contra técnicos con evaluaciones consistentemente negativas, que pueden incluir la suspensión de su cuenta."
    },
    {
      title: "13. Suspensión y Terminación de la Cuenta",
      content: "Airtecs puede suspender o eliminar la cuenta de un técnico en los siguientes casos:\n- Incumplimiento repetido de las condiciones de servicio.\n- Conducta inapropiada o negligencia grave.\n- Intentos de eludir las comisiones de la Plataforma.\nLos técnicos pueden solicitar la reactivación de su cuenta si demuestran que han corregido el problema que motivó la suspensión."
    },
    {
      title: "14. Requisitos de Equipos y Herramientas",
      content: "Los técnicos son responsables de contar con el equipo y las herramientas necesarias para realizar los servicios solicitados. Airtecs no proporciona materiales ni herramientas para los servicios."
    },
    {
      title: "15. Actualización de Información",
      content: "Los técnicos deben mantener actualizada la información de su perfil, incluyendo:\n- Certificaciones y experiencia.\n- Datos de contacto y disponibilidad.\n- Métodos de pago para recibir las compensaciones."
    },
    {
      title: "16. Propiedad Intelectual",
      content: "Los técnicos no pueden utilizar el logo, nombre o marca de Airtecs para fines personales o comerciales fuera del ámbito de los servicios proporcionados a través de la Plataforma, salvo autorización expresa."
    },
    {
      title: "17. Resolución de Disputas",
      content: "En caso de disputas con los clientes, los técnicos aceptan seguir el proceso de mediación establecido por Airtecs. Los técnicos deben proporcionar evidencia del trabajo realizado (fotos, videos, reportes) si se requiere durante la mediación."
    },
    {
      title: "18. Política de Actualizaciones y Cambios en los Términos",
      content: "Airtecs se reserva el derecho de actualizar estos Términos y Condiciones para Técnicos. Las actualizaciones serán notificadas con antelación razonable, y el uso continuo de la Plataforma implica la aceptación de los nuevos términos."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <motion.button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center text-cyan-600 hover:text-cyan-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft className="mr-2" />
            <span className="font-medium">Regresar</span>
          </motion.button>

          <h1 className="text-4xl font-bold text-cyan-800 mb-8 text-center">Términos y Condiciones para Técnicos</h1>
          
          <div className="space-y-8">
            {terms.map((term, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h2 className="text-2xl font-semibold text-cyan-700 mb-3">{term.title}</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{term.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsAndConditions;


import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-200 via-blue-300 to-blue-600 text-white py-8 mt-12">
      <div className="container mx-auto text-center">
        <div className="flex justify-center items-center mb-6">
          <div className="text-3xl font-extrabold text-gray-800">
            Air<span className="text-blue-700">Tecs</span>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-6 mb-8">
          <SocialLink
            href="https://facebook.com/Air-Tec's"
            Icon={FaFacebookF}
          />
          <SocialLink
            href="https://twitter.com/AirTecs"
            Icon={FaTwitter}
          />
          <SocialLink
            href="https://linkedin.com/company/air-tecs"
            Icon={FaLinkedinIn}
          />
          <SocialLink
            href="https://instagram.com/@Airtechnicians"
            Icon={FaInstagram}
          />
          <SocialLink
            href="https://youtube.com/AirTecs"
            Icon={FaYoutube}
          />
        </div>
        <div className="text-sm text-gray-200 mb-4">
          <p>© {new Date().getFullYear()} Air Tecs. Todos los derechos reservados.</p>
        </div>
        <div className="text-xs text-gray-300">
          <a href="/terminos-y-condiciones" className="hover:underline">
            Términos y Condiciones
          </a>
        </div>
      </div>
    </footer>
  );
};

// Componente reutilizable para los enlaces a redes sociales
function SocialLink({ href, Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-full bg-white text-blue-700 transition-all duration-300 transform hover:bg-blue-500 hover:text-white hover:scale-110"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}

export default Footer;

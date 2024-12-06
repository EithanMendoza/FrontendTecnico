import React from 'react';
import { Link } from 'react-router-dom';

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-12 mt-12">
      <div className="container mx-auto text-center">
        <div className="flex justify-center items-center mb-8">
          <div className="text-3xl font-extrabold">
            Air<span className="text-blue-300">Tecs</span>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-6 mb-10">
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
        <div className="text-sm text-blue-200 mb-4">
          <p>© {new Date().getFullYear()} Air Tecs. Todos los derechos reservados.</p>
        </div>

        <div className="text-xs text-blue-300">
          <Link to="/terminos-y-condiciones" className="hover:underline transition-colors duration-300">
            Términos y Condiciones
          </Link>
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
      className="p-3 rounded-full bg-blue-800 text-blue-300 transition-all duration-300 hover:bg-blue-700 hover:text-white"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}

export default Footer;


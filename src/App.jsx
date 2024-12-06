import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPageT from './components/LandingPageT';
import LoginT from './components/LoginT';
import RegisterT from './components/RegisterT';
import PaginaPrincipalT from './components/PaginaPrincipalT';
import Services from './components/Services';
import PerfilT from './components/PerfilT';
import UpdateService from './components/UpdateService';
import ServicesFinished from './components/ServicesFinished';
import TermsAndConditions from './components/TermsandConditions';
import Payments from './components/Payments';
import Tutorial from './components/tutorial';  // Importa el componente Tutorial
import Details from './components/Details';
import ComoFunciona from './components/funcionamiento';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPageT />} />
        <Route path="/loginT" element={<LoginT />} />
        <Route path="/registerT" element={<RegisterT />} />
        <Route path="/homeT" element={<PaginaPrincipalT />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/perfilT" element={<PerfilT />} />
        <Route path="/updateService/:solicitudId" element={<UpdateService />} />
        <Route path="/servicios-finalizados" element={<ServicesFinished />} />
        <Route path="/terminos-y-condiciones" element={<TermsAndConditions />} />
        <Route path="/pagos" element={<Payments />} />
        <Route path="/tutorial" element={<Tutorial />} /> {/* Nueva ruta */}
        <Route path="/details" element={<Details />} />
        <Route path="/como-funciona" element={<ComoFunciona />} />
      </Routes>
    </Router>
  );
};

export default App;

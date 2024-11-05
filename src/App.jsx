import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPageT from './components/LandingPageT';
import LoginT from './components/LoginT';
import RegisterT from './components/RegisterT';
import PaginaPrincipalT from './components/paginaprincipalT';
import Services from './components/Services';
import PerfilT from './components/PerfilT';
import UpdateService from './components/UpdateService';
import ServicesFinished  from './components/ServicesFinished';
import TermsAndConditions from './components/TermsandConditions';
import Payments from './components/Payments';

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
      </Routes>
    </Router>
  );
};
export default App;

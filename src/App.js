import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ClienteForm from './Components/ClienteForm';
import MotoristaForm from './Components/MotoristaForm';
import VeiculoForm from './Components/VeiculoForms';
import ControleChamado from './Components/MenuChamado';
import IniciarChamadoForm from './Components/IniciarChamadoForm';
import FinalizarChamadoID from './Components/FinalizarChamadoID';
import Home from './Components/Home';
import './index.css';

function App() {
  return (
    <Router>
      <nav className="NavBar">
        <div className="menu">
          <Link to="/">Home</Link>
          <Link to="/cliente">Cliente</Link>
          <Link to="/motorista">Motorista</Link>
          <Link to="/veiculo">Veiculo</Link>
          <Link to="/chamado">Chamado</Link>
        </div>
      </nav>

      <div className="pagina">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cliente" element={<ClienteForm />} />
          <Route path="/motorista" element={<MotoristaForm />} />
          <Route path="/veiculo" element={<VeiculoForm />} />
          <Route path="/chamado" element={<ControleChamado />} />
          <Route path="/iniciar-chamado" element={<IniciarChamadoForm />} />
          <Route path="/finalizar/:id" element={<FinalizarChamadoID />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { Link } from 'react-router-dom';
import './StyleComponents/Home.css';



const Home = () => {
  return (
    <div className="home-container">
      <h1>PROJETO TAXI</h1>
      <p>Selecione uma opção para começar:</p>

      <div className="card-container">
        <Link to="/cliente" className="card">
          <h3>Cadastrar novo cliente</h3>
        </Link>

        <Link to="/motorista" className="card">
          <h3>Cadastrar novo motorista</h3>
        </Link>

        <Link to="/veiculo" className="card">
          <h3>Cadastrar veículo</h3>
        </Link>

        <Link to="/chamado" className="card">
          <h3>Iniciar Chamado</h3>
        </Link>


      </div>
    </div>
  );
};

export default Home;

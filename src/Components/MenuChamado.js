import React, { useState, useEffect } from 'react';
import IniciarChamadoForm from './IniciarChamadoForm';
import { useNavigate } from 'react-router-dom';
import './StyleComponents/MenuChamado.css';

import axios from 'axios';

const MenuChamado = () => {
  const [mostrarChamadosAbertos, setMostrarChamadosAbertos] = useState(false);
  const [mostrarFormularioIniciar, setMostrarFormularioIniciar] = useState(false);
  const [chamadosAbertos, setChamadosAbertos] = useState([]);
  const navigate = useNavigate();

  const buscarChamadosAbertos = async () => {
    try {
      const resp = await axios.get('http://localhost:8080/projeto-taxi-api/api/chamados/abertos');
      setChamadosAbertos(resp.data);
    } catch (err) {
      console.error('Erro ao buscar chamados:', err);
    }
  };

  useEffect(() => {
    if (mostrarChamadosAbertos) {
      buscarChamadosAbertos();
    }
  }, [mostrarChamadosAbertos]);

  return (
    <div className='menu-chamado-container'>
      <h2>Menu Chamado</h2>

      
    {!mostrarFormularioIniciar && (
      
  <button onClick={() => navigate('/iniciar-chamado')}>
    Novo Chamado
  </button>

)}


    
      {mostrarFormularioIniciar && (
        <IniciarChamadoForm
          onChamadoCriado={() => {
            if (mostrarChamadosAbertos) {
              buscarChamadosAbertos();
            }
            setMostrarFormularioIniciar(false);
          }}
        />
      )}

      
      <button
        onClick={() => setMostrarChamadosAbertos((prev) => !prev)}
      >
        {mostrarChamadosAbertos ? 'Ocultar Abertos' : 'Ver Chamados Abertos'}
      </button>

      
      {mostrarChamadosAbertos && (
        <div>
          <h3>Chamados em Aberto</h3>
          {chamadosAbertos.length > 0 ? (
            <ul>
              {chamadosAbertos.map((chamado) => (
                <li key={chamado.idChamado} >
                  <strong>Chamado #{chamado.idChamado}</strong> — Tipo: {chamado.tipo}<br />
                  Cliente: {chamado.cliente?.nome || '—'}<br />
                  Motorista: {chamado.motorista?.nome || '—'} | Veículo: {chamado.veiculo?.placa || '—'}<br />
                  <button
                    onClick={() => navigate(`/finalizar/${chamado.idChamado}`)}
                  >
                    Finalizar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum chamado em aberto no momento.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuChamado;

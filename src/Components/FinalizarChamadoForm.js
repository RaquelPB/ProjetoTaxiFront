import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FinalizarChamadoForm = ({ chamadoId, kminicio, onChamadoFinalizado }) => {
  const [kmFinal, setKmFinal] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const finalizarChamado = async () => {
    const kmFinalValue = parseFloat(kmFinal);

    if (isNaN(kmFinalValue)) {
      setMensagem('Por favor, insira um valor numérico válido para KM Final.');
      return;
    }

    if (kmFinalValue <= kminicio) {
      setMensagem(`KM final (${kmFinalValue}) não pode ser menor que KM início (${kminicio}).`);
      return;
    }

    try {
      await axios.put(`http://localhost:8080/projeto-taxi-api/api/chamados/${chamadoId}/finalizar`, {
        kmfinal: kmFinalValue
      });

      setMensagem('Chamado finalizado com sucesso!');
      if (onChamadoFinalizado) onChamadoFinalizado();

   
      setTimeout(() => {
        navigate('/chamado');
      }, 1500);
    } catch (error) {
      setMensagem(`Erro ao finalizar: ${error.response?.data || error.message}`);
    }
  };

  return (
    <div>
      <h2>Finalizar Chamado #{chamadoId}</h2>

      <label>KM Final:</label>
      <input
        type="text"
        inputMode="decimal"
        placeholder={`Mínimo: ${kminicio}`}
        value={kmFinal}
        onChange={(e) => setKmFinal(e.target.value.replace(',', '.'))}
        style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
        required
      />

      <button onClick={finalizarChamado}>
        Finalizar Chamado
      </button>

      <p>{mensagem}</p>
    </div>
  );
};

export default FinalizarChamadoForm;

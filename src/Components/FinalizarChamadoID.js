import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FinalizarChamadoForm from './FinalizarChamadoForm';

const FinalizarChamadoID = () => {
  const { id } = useParams();
  const [dadosChamado, setDadosChamado] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const buscarChamado = async () => {
      try {
        const resp = await axios.get(`http://localhost:8080/projeto-taxi-api/api/chamados/${id}`);
        setDadosChamado(resp.data);
      } catch (error) {
        setErro('Não foi possível carregar os dados do chamado.');
        console.error(error);
      }
    };

    buscarChamado();
  }, [id]);

  if (erro) return <p>{erro}</p>;
  if (!dadosChamado) return <p>Carregando dados do chamado...</p>;

  return (
    <FinalizarChamadoForm
      chamadoId={id}
      kminicio={dadosChamado.kminicio}
    />
  );
};

export default FinalizarChamadoID;

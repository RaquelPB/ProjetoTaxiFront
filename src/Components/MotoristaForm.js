import React, { useState } from 'react';
import axios from 'axios';
import './StyleComponents/MotoristaForm.css';


const MotoristaForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    cnh: '',
    endereco: {
      logradouro: '',
      numero: '',
      cidade: '',
      estado: ''
    }
  });

  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('endereco.')) {
      const campo = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [campo]: campo === 'numero' ? Number(value) || 0 : value
        }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setMensagem('Enviando...');

    try {
      const resposta = await axios.post(
        'http://localhost:8080/projeto-taxi-api/api/motoristas',
        formData,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );


      setMensagem('Motorista cadastrado com sucesso!');
      setFormData({
        nome: '',
        telefone: '',
        cnh: '',
        endereco: {
          logradouro: '',
          numero: '',
          cidade: '',
          estado: ''
        }
      });
    } catch (error) {
      const erroTexto = error.response?.data?.message || error.message;
      setMensagem(`Erro ao cadastrar motorista: ${erroTexto}`);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="container-formulario">
      <h2>Cadastro de Motorista</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />

        <label>Telefone:</label>
        <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} required />

        <label>CNH:</label>
        <input type="text" name="cnh" value={formData.cnh} onChange={handleChange} required />

        <h3>Endereço</h3>

        <label>Logradouro:</label>
        <input type="text" name="endereco.logradouro" value={formData.endereco.logradouro} onChange={handleChange} required />

        <label>Número:</label>
        <input type="number" name="endereco.numero" value={formData.endereco.numero} onChange={handleChange} required />

        <label>Cidade:</label>
        <input type="text" name="endereco.cidade" value={formData.endereco.cidade} onChange={handleChange} required />

        <label>Estado:</label>
        <input type="text" name="endereco.estado" value={formData.endereco.estado} onChange={handleChange} required />

        <button type="submit" disabled={carregando}>
          {carregando ? 'Salvando...' : 'Cadastrar Motorista'}
        </button>
      </form>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default MotoristaForm;

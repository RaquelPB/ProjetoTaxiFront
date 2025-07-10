import React, { useState } from 'react';
import axios from 'axios';
import './StyleComponents/ClienteForm.css';




function ClienteForm() {


  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    endereco: {
      logradouro: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: ''
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

  
  const limparCPF = (cpf) => cpf.replace(/\D/g, '');

  
  const dadosLimpos = {
    ...formData,
    cpf: limparCPF(formData.cpf)
  };

  try {
    const resposta = await axios.post(
      'http://localhost:8080/projeto-taxi-api/api/clientes',
      dadosLimpos,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

  
    setMensagem('Cliente cadastrado com sucesso!');

    setFormData({
      nome: '',
      cpf: '',
      telefone: '',
      endereco: {
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: ''
      }
    });

  } catch (error) {
    const erroTexto = error.response?.data?.message || error.message;
    setMensagem(`Erro ao cadastrar cliente: ${erroTexto}`);
  } finally {
    setCarregando(false);
  }
};


  

  return (
    <div className='cliente-form-container'>
      <h2>Cadastro de Cliente</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input name="nome" value={formData.nome} onChange={handleChange} required />

        <label>CPF:</label>
        <input name="cpf" value={formData.cpf} onChange={handleChange} required />

        <label>Telefone:</label>
           <input
             type="tel"
             name="telefone"
             value={formData.telefone}
             onChange={handleChange}
             inputMode="numeric"
             pattern="^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$"
             placeholder="(48) 99999-9999"
             required
            />

        <h4>Endereço</h4>

        <label>Logradouro:</label>
        <input name="endereco.logradouro" value={formData.endereco.logradouro} onChange={handleChange} required />

        <label>Número:</label>
        <input
          name="endereco.numero"
          type="number"
          value={formData.endereco.numero}
          onChange={handleChange}
          required
        />

        <label>Bairro:</label>
        <input name="endereco.bairro" value={formData.endereco.bairro} onChange={handleChange} required />

        <label>Cidade:</label>
        <input name="endereco.cidade" value={formData.endereco.cidade} onChange={handleChange} required />

        <label>Estado:</label>
        <input name="endereco.estado" value={formData.endereco.estado} onChange={handleChange} required />

        <label>CEP:</label>
        <input name="endereco.cep" value={formData.endereco.cep} onChange={handleChange} required />

        <br /><br />
        <button type="submit" disabled={carregando}>
          {carregando ? 'Salvando...' : 'Salvar Cliente'}
        </button>
      </form>

      {mensagem}
    </div>
  );
}

export default ClienteForm;

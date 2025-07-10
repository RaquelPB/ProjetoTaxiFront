import React, { useState } from 'react';
import axios from 'axios';

const VeiculoForm = () => {
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    cor: '',
    placa: '',
    ano: '',
    motorista: { cnh: '' }
  });

  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('motorista.')) {
      const [, campo] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        motorista: { ...prev.motorista, [campo]: value }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'ano' ? value.replace(/\D/g, '') : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);

    try {
      await axios.post(
        'http://localhost:8080/projeto-taxi-api/api/veiculos',
        {
          ...formData,
          ano: Number(formData.ano)
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      setMensagem('Veículo cadastrado com sucesso!');
      setFormData({
        marca: '',
        modelo: '',
        cor: '',
        placa: '',
        ano: '',
        motorista: { cnh: '' }
      });
    } catch (error) {
      const erroTexto = error.response?.data || error.message;
      setMensagem(`Erro ao cadastrar veículo: ${erroTexto}`);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="container-formulario">
      <h2>Cadastro de Veículo</h2>
      <form onSubmit={handleSubmit}>
        <label>Marca:</label>
        <input name="marca" value={formData.marca} onChange={handleChange} required />

        <label>Modelo:</label>
        <input name="modelo" value={formData.modelo} onChange={handleChange} required />

        <label>Cor:</label>
        <input name="cor" value={formData.cor} onChange={handleChange} required />

        <label>Placa:</label>
        <input name="placa" value={formData.placa} onChange={handleChange} required />

        <label>Ano:</label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          name="ano"
          value={formData.ano}
          onChange={handleChange}
          required
        />

        <label>CNH do Motorista:</label>
        <input
          name="motorista.cnh"
          value={formData.motorista.cnh}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={carregando}>
          {carregando ? 'Salvando...' : 'Cadastrar Veículo'}
        </button>
      </form>

      {mensagem && <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{mensagem}</p>}
    </div>
  );
};

export default VeiculoForm;

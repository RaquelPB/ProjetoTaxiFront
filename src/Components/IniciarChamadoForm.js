import React, { useState } from 'react';
import axios from 'axios';
import './StyleComponents/IniciarChamadoForm.css';

const IniciarChamadoForm = ({ onChamadoCriado }) => {
  const [formData, setFormData] = useState({
    cliente: { cpf: '' },
    motorista: { cnh: '' },
    veiculo: { placa: '' },
    origem: { logradouro: '', numero: '', cidade: '', estado: '' },
    destino: { logradouro: '', numero: '', cidade: '', estado: '' },
    tipo: 'COMUN',
    kminicio: '',
    valorPorKm: ''
  });

  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    const partes = name.split('.');

    if (partes.length === 2) {
      const [grupo, campo] = partes;
      const isNumero = campo === 'numero';
      const valorConvertido = isNumero ? parseInt(value) || '' : value;

      setFormData((prev) => ({
        ...prev,
        [grupo]: {
          ...prev[grupo],
          [campo]: valorConvertido
        }
      }));
    } else {
      const valorFinal = (name === 'kminicio' || name === 'valorPorKm')
        ? parseFloat(value.replace(',', '.')) || ''
        : value;

      setFormData((prev) => ({ ...prev, [name]: valorFinal }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        'http://localhost:8080/projeto-taxi-api/api/chamados/iniciar',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const idExtraido = typeof data === 'string'
        ? data.match(/\d+/)?.[0]
        : data?.id;

      setMensagem('Chamado iniciado com sucesso!');

      if (idExtraido && typeof onChamadoCriado === 'function') {
        onChamadoCriado(parseInt(idExtraido));
      }
    } catch (error) {
      const erroTexto = error.response?.data || error.message;
      setMensagem(`Erro ao iniciar chamado: ${erroTexto}`);
    }
  };

  return (
    <div className="iniciar-chamado-container">
      <h2>Iniciar Chamado</h2>
      <form onSubmit={handleSubmit}>
        <label>CPF Cliente:</label>
        <input name="cliente.cpf" value={formData.cliente.cpf} onChange={handleChange} required />

        <label>CNH Motorista:</label>
        <input name="motorista.cnh" value={formData.motorista.cnh} onChange={handleChange} required />

        <label>Placa Veículo:</label>
        <input name="veiculo.placa" value={formData.veiculo.placa} onChange={handleChange} required />

        <h4>Origem</h4>
        <input name="origem.logradouro" placeholder="Logradouro" value={formData.origem.logradouro} onChange={handleChange} required />
        <input name="origem.numero" placeholder="Número" inputMode="numeric" value={formData.origem.numero} onChange={handleChange} required />
        <input name="origem.cidade" placeholder="Cidade" value={formData.origem.cidade} onChange={handleChange} required />
        <input name="origem.estado" placeholder="Estado" value={formData.origem.estado} onChange={handleChange} required />

        <h4>Destino</h4>
        <input name="destino.logradouro" placeholder="Logradouro" value={formData.destino.logradouro} onChange={handleChange} required />
        <input name="destino.numero" placeholder="Número" inputMode="numeric" value={formData.destino.numero} onChange={handleChange} required />
        <input name="destino.cidade" placeholder="Cidade" value={formData.destino.cidade} onChange={handleChange} required />
        <input name="destino.estado" placeholder="Estado" value={formData.destino.estado} onChange={handleChange} required />

        <label>Tipo:</label>
        <select name="tipo" value={formData.tipo} onChange={handleChange}>
          <option value="VIAGEM">VIAGEM</option>
          <option value="COMUN">COMUN</option>
          <option value="EXECUTIVO">EXECUTIVO</option>
        </select>

        <label>KM Início:</label>
        <input
          name="kminicio"
          placeholder="Número"
          value={formData.kminicio}
          onChange={handleChange}
          required
        />

        <label>Valor por KM (R$):</label>
        <input
          type="text"
          name="valorPorKm"
          value={formData.valorPorKm}
          placeholder="Ex: 2,50"
          onChange={handleChange}
          required
        />

        <button type="submit">Iniciar Chamado</button>
      </form>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default IniciarChamadoForm;

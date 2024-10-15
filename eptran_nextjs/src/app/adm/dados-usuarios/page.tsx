"use client";

import React, { useState } from 'react';

interface FormData {
  nome: string;
  email: string;
  senha: string;
  dataNascimento: string;
  sexo: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
}

export default function DadosUsuarios() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    senha: '',
    dataNascimento: '',
    sexo: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <main className="w-full min-h-screen p-4 md:p-8 lg:pl-64 lg:pt-36 lg:mr-80">
      <h1 className="text-darkBlue-500 font-bold text-2xl md:text-3xl mb-4">
        Dados Pessoais de USUÁRIO
      </h1>
      <hr className="bg-darkBlue-500 my-4 border-1 border-darkBlue-500 rounded-full" />

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">DADOS PESSOAIS</h2>
          <hr className="bg-darkBlue-400 w-full my-4 border-1 border-darkBlue-500 rounded-full" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="NOME"
              id="nome"
              type="text"
              placeholder="NOME COMPLETO DO USUÁRIO"
              value={formData.nome}
              onChange={handleInputChange}
            />
            <InputField
              label="E-MAIL"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <InputField
              label="SENHA"
              id="senha"
              type="password"
              value={formData.senha}
              onChange={handleInputChange}
            />
            <InputField
              label="DATA DE NASCIMENTO"
              id="dataNascimento"
              type="date"
              value={formData.dataNascimento}
              onChange={handleInputChange}
            />
            <div className="space-y-2 w-auto mr-7">
              <label htmlFor="sexo" className="block font-semibold text-darkBlue-400">
                SEXO
              </label>
              <select
                id="sexo"
                className="w-full border-darkBlue-300 border rounded-md h-10 px-2"
                value={formData.sexo}
                onChange={handleInputChange}
              >
                <option value="" disabled>Selecione o seu Gênero</option>
                <option value="Feminino">Feminino</option>
                <option value="Masculino">Masculino</option>
                <option value="Prefiro não Informar">Prefiro não Informar</option>
              </select>
            </div>
            <button
              className="bg-darkBlue-400 hover:bg-darkBlue-600 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
              type="submit"
            >
              Salvar
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">DADOS DE ENDEREÇO</h2>
          <hr className="bg-darkBlue-400 w-full my-4 border-1 border-darkBlue-500 rounded-full" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="ENDEREÇO"
              id="endereco"
              type="text"
              placeholder="ENDEREÇO COMPLETO DO USUÁRIO"
              value={formData.endereco}
              onChange={handleInputChange}
            />
            <InputField
              label="CIDADE"
              id="cidade"
              type="text"
              value={formData.cidade}
              onChange={handleInputChange}
            />
            <div className="space-y-2 mr-7 w-auto">
              <label htmlFor="estado" className="block font-semibold text-darkBlue-400">
                ESTADO
              </label>
              <select
                id="estado"
                className="w-full border-darkBlue-300 border rounded-md h-10 px-2"
                value={formData.estado}
                onChange={handleInputChange}
              >
                <option value="" disabled>Selecione o Estado</option>
                <option value="São Paulo">São Paulo</option>
                <option value="Rio de Janeiro">Rio de Janeiro</option>
                <option value="Minas Gerais">Minas Gerais</option>
                <option value="Bahia">Bahia</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
            <InputField
              label="CEP"
              id="cep"
              type="text"
              value={formData.cep}
              onChange={handleInputChange}
            />
            <button
              className="bg-darkBlue-400 hover:bg-darkBlue-600 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
              type="submit"
            >
              Salvar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputField({ label, id, type, placeholder, value, onChange }: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block font-semibold text-darkBlue-400">
        {label}
      </label>
      <div className="flex items-center">
        <input
          className="w-full border-darkBlue-300 border rounded-md h-10 px-2"
          placeholder={placeholder}
          type={type}
          id={id}
          value={value}
          onChange={onChange}
        />
        <svg
          width="20"
          height="20"
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
          fill="#003966"
          className="ml-2 flex-shrink-0"
        >
          <path d="M2.25,12.9378906 L2.25,15.75 L5.06210943,15.75 L13.3559575,7.45615192 L10.5438481,4.64404249 L2.25,12.9378906 Z M15.5306555,5.28145396 C15.8231148,4.98899458 15.8231148,4.5165602 15.5306555,4.22410082 L13.7758992,2.46934454 C13.4834398,2.17688515 13.0110054,2.17688515 12.718546,2.46934454 L11.3462366,3.84165394 L14.1583461,6.65376337 L15.5306555,5.28145396 Z" />
        </svg>
      </div>
    </div>
  );
}
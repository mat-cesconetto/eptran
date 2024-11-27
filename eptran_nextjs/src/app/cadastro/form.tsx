"use client";

import React, { useState, useEffect } from "react";
import { useCadastro } from "@/hooks/useCadastro";
import { useCidade } from "@/hooks/useCidades";
import { useCep } from "@/hooks/useCep";
import CustomCheckbox from "../components/ui/checkbox";
import { useRouter } from "next/navigation";
import { maskCEP } from "../components/mask/mask";

const estados = [
  { sigla: "AC", nome: "Acre" },
  { sigla: "AL", nome: "Alagoas" },
  { sigla: "AP", nome: "Amapá" },
  { sigla: "AM", nome: "Amazonas" },
  { sigla: "BA", nome: "Bahia" },
  { sigla: "CE", nome: "Ceará" },
  { sigla: "DF", nome: "Distrito Federal" },
  { sigla: "ES", nome: "Espírito Santo" },
  { sigla: "GO", nome: "Goiás" },
  { sigla: "MA", nome: "Maranhão" },
  { sigla: "MT", nome: "Mato Grosso" },
  { sigla: "MS", nome: "Mato Grosso do Sul" },
  { sigla: "MG", nome: "Minas Gerais" },
  { sigla: "PA", nome: "Pará" },
  { sigla: "PB", nome: "Paraíba" },
  { sigla: "PR", nome: "Paraná" },
  { sigla: "PE", nome: "Pernambuco" },
  { sigla: "PI", nome: "Piauí" },
  { sigla: "RJ", nome: "Rio de Janeiro" },
  { sigla: "RN", nome: "Rio Grande do Norte" },
  { sigla: "RS", nome: "Rio Grande do Sul" },
  { sigla: "RO", nome: "Rondônia" },
  { sigla: "RR", nome: "Roraima" },
  { sigla: "SC", nome: "Santa Catarina" },
  { sigla: "SP", nome: "São Paulo" },
  { sigla: "SE", nome: "Sergipe" },
  { sigla: "TO", nome: "Tocantins" }
];

const Formulario: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { registerUser } = useCadastro();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    cep: "",
    estado: "",
    cidade: "",
    bairro: "",
    rua: "",
    escola: "",
    data_nasc: "",
    escolaridade: "",
    sexo: ""
  });
  const { cityNames, isLoading: isLoadingCities } = useCidade(formData.estado);
  const { cepData, isLoading: isLoadingCep, error: cepError } = useCep(formData.cep.replace(/\D/g, ""));

  useEffect(() => {
    if (cepData) {
      console.log("Dados recebidos do CEP:", cepData);
      setFormData(prev => ({
        ...prev,
        cidade: cepData.localidade,
        bairro: cepData.bairro,
        rua: cepData.logradouro,
        estado: cepData.uf
      }));
    }
  }, [cepData]);

  useEffect(() => {
    if (cepError) {
      setError(cepError);
    } else {
      setError(null);
    }
  }, [cepError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, cep: maskCEP(value) }));
  };

  const handleFormulario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await registerUser(
        formData.nome,
        formData.email,
        formData.senha,
        formData.cep,
        formData.rua,
        formData.bairro,
        formData.cidade,
        formData.estado,
        formData.escola,
        formData.data_nasc,
        formData.escolaridade,
        formData.sexo
      );
      console.log("Cadastro realizado com sucesso");
      router.push("/login");
    } catch (error: any) {
      setError(error.message || "Houve um erro ao cadastrar o usuário");
    }
  };

  return (
    <form
      onSubmit={handleFormulario}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full"
    >
      <FormField 
        label="Nome completo" 
        type="text" 
        id="nome" 
        name="nome" 
        value={formData.nome}
        onChange={handleInputChange}
      />
      <FormField
        label="Data de nascimento"
        type="date"
        id="data_nasc"
        name="data_nasc"
        value={formData.data_nasc}
        onChange={handleInputChange}
      />
      <FormField 
        label="Email" 
        type="email" 
        id="email" 
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <FormField 
        label="Senha" 
        type="password" 
        id="senha" 
        name="senha"
        value={formData.senha}
        onChange={handleInputChange}
      />
      <FormField 
        label="Sexo" 
        type="select" 
        id="sexo" 
        name="sexo"
        value={formData.sexo}
        onChange={handleInputChange}
      >
        <option value="" disabled>Selecione</option>
        <option value="MASCULINO">Masculino</option>
        <option value="FEMININO">Feminino</option>
        <option value="NAO_DECLARAR">Prefiro Não Dizer</option>
      </FormField>
      <FormField
        label="CEP"
        type="text"
        id="cep"
        name="cep"
        value={formData.cep}
        onChange={handleInputChange}
        onChangeCEP={handleCEPChange}
        maxLength={9}
      />
      <FormField
        label="Estado"
        type="select"
        id="estado"
        name="estado"
        value={formData.estado}
        onChange={handleInputChange}
      >
        <option value="">Selecione um estado</option>
        {estados.map((estado) => (
          <option key={estado.sigla} value={estado.sigla}>
            {estado.nome}
          </option>
        ))}
      </FormField>
      <FormField
        label="Cidade"
        type="select"
        id="cidade"
        name="cidade"
        value={formData.cidade}
        onChange={handleInputChange}
      >
        <option value="">Selecione uma cidade</option>
        {isLoadingCities ? (
          <option value="" disabled>Carregando cidades...</option>
        ) : (
          cityNames.map((cidadeNome) => (
            <option key={cidadeNome} value={cidadeNome}>
              {cidadeNome}
            </option>
          ))
        )}
      </FormField>
      <FormField
        label="Bairro"
        type="text"
        id="bairro"
        name="bairro"
        value={formData.bairro}
        onChange={handleInputChange}
      />
      <FormField
        label="Rua"
        type="text"
        id="rua"
        name="rua"
        value={formData.rua}
        onChange={handleInputChange}
      />
      <FormField 
        label="Escola" 
        type="text" 
        id="escola" 
        name="escola"
        value={formData.escola}
        onChange={handleInputChange}
      />
      <FormField
        label="Escolaridade"
        type="select"
        id="escolaridade"
        name="escolaridade"
        value={formData.escolaridade}
        onChange={handleInputChange}
      >
        <option value="" disabled>Selecione</option>
        <option value="ENSINO_FUNDAMENTAL_I">Ensino Fundamental 1</option>
        <option value="ENSINO_FUNDAMENTAL_II">Ensino Fundamental 2</option>
        <option value="ENSINO_MEDIO">Ensino Médio</option>
      </FormField>
      <CustomCheckbox label="Concordo com os termos de serviço" />
      {error && <div className="text-red-500 col-span-full">{error}</div>}
      <button
        type="submit"
        className="bg-[#003966] text-white w-full h-12 rounded-md font-bold text-lg col-span-full disabled:opacity-50"
        disabled={isLoadingCep}
      >
        {isLoadingCep ? "Carregando..." : "Cadastrar"}
      </button>
    </form>
  );
};

interface FormFieldProps {
  label: string;
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onChangeCEP?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  children?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
  onChangeCEP,
  maxLength,
  children,
}) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-base text-[#003966] font-bold mb-1">{label}</label>
    {type === "select" ? (
      <select
        id={id}
        name={name}
        className="border-2 border-[#003966] border-opacity-30 rounded-md p-2 text-black w-full"
        onChange={onChange}
        value={value}
      >
        {children}
      </select>
    ) : (
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChangeCEP || onChange}
        maxLength={maxLength}
        className="border-2 border-[#003966] border-opacity-30 rounded-md p-1 text-black w-full"
      />
    )}
  </div>
);

export default Formulario;


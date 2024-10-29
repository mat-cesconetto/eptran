"use client";

import React from "react";
import { useCadastro } from "@/hooks/useCadastro";
import { useState } from "react";
import CustomCheckbox from "./checkbox";
import Router from "next/router";
import { maskCEP } from "../components/mask/mask";


const Formulario: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { registerUser } = useCadastro();
  const [crudCEP, setCEP] = useState("");

  const handleFormulario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const nome = formData.get("nome")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const senha = formData.get("senha")?.toString() || "";
    const cep = formData.get("cep")?.toString() || "";
    const rua = formData.get("rua")?.toString() || "";
    const bairro = formData.get("bairro")?.toString() || "";
    const cidade = formData.get("cidade")?.toString() || "";
    const estado = formData.get("estado")?.toString() || "";
    const escola = formData.get("escola")?.toString() || "";
    const data_nasc = formData.get("data_nasc")?.toString() || "";
    const escolaridade = formData.get("escolaridade")?.toString() || "";
    const sexo = formData.get("sexo")?.toString() || "";

    try {
      await registerUser(
        nome,
        email,
        senha,
        cep,
        rua,
        bairro,
        cidade,
        estado,
        escola,
        data_nasc,
        escolaridade,
        sexo
      );
      console.log("Deu tudo certo");
      Router.push("/");
    } catch (error: any) {
      setError(error.message || "Houve um erro ao cadastrar o usuário");
    }
  };

  function handleChangeMaskCEP(event: any) {
    const { value } = event.target;
    setCEP(maskCEP(value));
  }

  return (
    <form
      onSubmit={handleFormulario}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full"
    >
      <FormField label="Nome completo" type="text" id="nome" name="nome" />
      <FormField label="Estado" type="select" id="estado" name="estado">
        <option value="" disabled>
          Selecione
        </option>
        <option value="AC">Acre</option>
        <option value="AL">Alagoas</option>
        <option value="AP">Amapá</option>
        <option value="AM">Amazonas</option>
        <option value="BA">Bahia</option>
        <option value="CE">Ceará</option>
        <option value="DF">Distrito Federal</option>
        <option value="ES">Espírito Santo</option>
        <option value="GO">Goiás</option>
        <option value="MA">Maranhão</option>
        <option value="MT">Mato Grosso</option>
        <option value="MS">Mato Grosso do Sul</option>
        <option value="MG">Minas Gerais</option>
        <option value="PA">Pará</option>
        <option value="PB">Paraíba</option>
        <option value="PR">Paraná</option>
        <option value="PE">Pernambuco</option>
        <option value="PI">Piauí</option>
        <option value="RJ">Rio de Janeiro</option>
        <option value="RN">Rio Grande do Norte</option>
        <option value="RS">Rio Grande do Sul</option>
        <option value="RO">Rondônia</option>
        <option value="RR">Roraima</option>
        <option value="SC">Santa Catarina</option>
        <option value="SP">São Paulo</option>
        <option value="SE">Sergipe</option>
        <option value="TO">Tocantins</option>
      </FormField>
      <FormField label="Email" type="email" id="email" name="email" />
      <FormField label="Senha" type="password" id="senha" name="senha" />
      <FormField
        label="Data de nascimento"
        type="date"
        id="data_nasc"
        name="data_nasc"
      />
      <FormField label="Cidade" type="text" id="cidade" name="cidade" />
      <FormField label="Bairro" type="text" id="bairro" name="bairro" />
      <FormField label="Rua" type="text" id="rua" name="rua" />
      <FormField label="Bairro" type="text" id="bairro" name="bairro" />
      <FormField label="Sexo" type="select" id="sexo" name="sexo">
        <option value="" disabled>
          Selecione
        </option>
        <option value="MASCULINO">Masculino</option>
        <option value="FEMININO">Feminino</option>
        <option value="NAO_DECLARAR">Prefiro Não Dizer</option>
      </FormField>
      <FormField label="Escola" type="text" id="escola" name="escola" />
      <FormField
        label="CEP"
        type="text"
        id="cep"
        name="cep"
        value={crudCEP}
        onChange={handleChangeMaskCEP}
        maxLength={9}
      />

      <FormField
        label="Escolaridade"
        type="select"
        id="escolaridade"
        name="escolaridade"
      >
        <option value="" disabled>
          Selecione
        </option>
        <option value="ENSINO_FUNDAMENTAL_I">Ensino Fundamental 1</option>
        <option value="ENSINO_FUNDAMENTAL_II">Ensino Fundamental 2</option>
        <option value="ENSINO_MEDIO">Ensino Médio</option>
      </FormField>
      <CustomCheckbox label="Concordo com os termos de serviço" />
      <button
        type="submit"
        className="bg-[#003966] text-white w-full h-12 rounded-md font-bold text-lg col-span-full disabled:opacity-50"
      >
        Cadastrar
      </button>
    </form>
  );
};

interface FormFieldProps {
  label: string;
  type: string;
  id: string;
  name: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
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
  maxLength,
  children,
}) => (
  <div className="flex flex-col">
    <label className="text-base text-[#003966] font-bold mb-1">{label}</label>
    {type === "select" ? (
      <select
        id={id}
        name={name}
        className="border-2 border-[#003966] border-opacity-30 rounded-md p-2 text-black w-full"
      >
        {children}
      </select>
    ) : (
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className="border-2 border-[#003966] border-opacity-30 rounded-md p-1 text-black w-full"
      />
    )}
  </div>
);

export default Formulario;

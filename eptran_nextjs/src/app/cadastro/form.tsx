import React, { useState } from "react";
import { useCadastro } from "@/hooks/useCadastro";
import { Sexo, Estado, Escolaridade } from "@/hooks/enum";
import CustomCheckbox from "./checkbox";

// Interfaces
interface FormData {
  nome: string;
  estado: Estado;
  email: string;
  senha: string;
  data_nasc: string;
  cidade: string;
  bairro: string;
  rua: string;
  sexo: Sexo;
  escola: string;
  cep: string;
  escolaridade: Escolaridade;
}

interface FormFieldProps {
  label: string;
  type: string;
  id: string;
  name: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  required?: boolean;
  pattern?: string;
  title?: string;
  children?: React.ReactNode;
}

// Componente FormField
const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  id,
  name,
  onChange,
  required = false,
  pattern,
  title,
  children,
}) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-base text-[#003966] font-bold mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === "select" ? (
      <select
        id={id}
        name={name}
        onChange={onChange}
        required={required}
        className="border-2 border-[#003966] border-opacity-30 rounded-md p-2 text-black w-full"
      >
        {children}
      </select>
    ) : (
      <input
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        required={required}
        pattern={pattern}
        title={title}
        className="border-2 border-[#003966] border-opacity-30 rounded-md p-2 text-black w-full"
      />
    )}
  </div>
);

// Componente Principal do Formulário
const Formulario: React.FC = () => {
  const { registerUser, isLoading, error } = useCadastro();
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    estado: "" as Estado,
    email: "",
    senha: "",
    data_nasc: "",
    cidade: "",
    bairro: "",
    rua: "",
    sexo: "" as Sexo,
    escola: "",
    cep: "",
    escolaridade: "" as Escolaridade,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Formata a data para o formato YYYY-MM-DD
      const formattedData = {
        ...formData,
        // Garante que a data está no formato correto
        data_nasc: formData.data_nasc,
        // Remove possíveis espaços extras
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        cidade: formData.cidade.trim(),
        bairro: formData.bairro.trim(),
        rua: formData.rua.trim(),
        escola: formData.escola.trim(),
        // Formata o CEP removendo caracteres não numéricos se necessário
        cep: formData.cep.replace(/\D/g, ""),
      };

      console.log("Tentando cadastrar com os dados:", formattedData);

      await registerUser(formattedData);
      alert("Usuário cadastrado com sucesso!");

      // Limpa o formulário
      setFormData({
        nome: "",
        estado: "" as Estado,
        email: "",
        senha: "",
        data_nasc: "",
        cidade: "",
        bairro: "",
        rua: "",
        sexo: "" as Sexo,
        escola: "",
        cep: "",
        escolaridade: "" as Escolaridade,
      });
    } catch (err) {
      console.error("Erro durante o cadastro:", err);
      alert(
        err instanceof Error
          ? err.message
          : "Erro desconhecido ao cadastrar usuário"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full"
    >
      <FormField
        label="Nome completo"
        type="text"
        id="nome"
        name="nome"
        onChange={handleChange}
        required
      />

      <FormField
        label="Estado"
        type="select"
        id="estado"
        name="estado"
        onChange={handleChange}
        required
      >
        <option value="" disabled selected>
          Selecione
        </option>
        {Object.entries(Estado).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </FormField>

      <FormField
        label="Email"
        type="email"
        id="email"
        name="email"
        onChange={handleChange}
        required
      />

      <FormField
        label="Senha"
        type="password"
        id="senha"
        name="senha"
        onChange={handleChange}
        required
      />

      <FormField
        label="Data de nascimento"
        type="date"
        id="data_nasc"
        name="data_nasc"
        onChange={handleChange}
        required
      />

      <FormField
        label="Cidade"
        type="text"
        id="cidade"
        name="cidade"
        onChange={handleChange}
        required
      />

      <FormField
        label="Bairro"
        type="text"
        id="bairro"
        name="bairro"
        onChange={handleChange}
        required
      />

      <FormField
        label="Rua"
        type="text"
        id="rua"
        name="rua"
        onChange={handleChange}
        required
      />

      <FormField
        label="Sexo"
        type="select"
        id="sexo"
        name="sexo"
        onChange={handleChange}
        required
      >
        <option value="" disabled selected>
          Selecione
        </option>
        {Object.entries(Sexo).map(([key, value]) => (
          <option key={key} value={value}>
            {value.replace("_", " ")}
          </option>
        ))}
      </FormField>

      <FormField
        label="Escola"
        type="text"
        id="escola"
        name="escola"
        onChange={handleChange}
        required
      />

      <FormField
        label="CEP"
        type="text"
        id="cep"
        name="cep"
        onChange={handleChange}
        required
        pattern="\d{5}-?\d{3}"
        title="Digite um CEP válido (formato: 12345-678 ou 12345678)"
      />

      <FormField
        label="Escolaridade"
        type="select"
        id="escolaridade"
        name="escolaridade"
        onChange={handleChange}
        required
      >
        <option value="" disabled selected>
          Selecione
        </option>
        {Object.entries(Escolaridade).map(([key, value]) => (
          <option key={key} value={value}>
            {value.replace(/_/g, " ")}
          </option>
        ))}
      </FormField>
      <CustomCheckbox label="Concordo com os termos de serviço" />
      <div className="col-span-2">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#003966] text-white w-full h-12 rounded-md mt-6 font-bold text-lg disabled:opacity-50"
        >
          {isLoading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </div>

      {error && (
        <div className="col-span-2 text-red-500 text-center">
          {error.message}
        </div>
      )}
    </form>
  );
};

export default Formulario;

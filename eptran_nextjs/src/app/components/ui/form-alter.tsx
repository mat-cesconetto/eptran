"use client";

import { useUser } from "@/hooks/useUserData";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";

const AlterData: React.FC = () => {
  const { userName, isLoading } = useUser();

  if (isLoading) {
    return <p>Carregando...</p>; // Ou um spinner para indicar carregamento
  }

  return (
    <form className="grid grid-cols-1 gap-4 w-full">
      <EditableFormField
        label="NOME"
        type="text"
        id="nome"
        name="nome"
        placeholder={userName}
      />
      <EditableFormField
        label="Data de Nascimento"
        type="date"
        id="data_nasc"
        name="data_nasc"
        placeholder="01/01/2000"
      />
      <EditableFormField label="Sexo" type="select" id="sexo" name="sexo">
        <option value="" disabled>
          Selecione
        </option>
        <option value="MASCULINO">Masculino</option>
        <option value="FEMININO">Feminino</option>
        <option value="NAO_DECLARAR">Prefiro Não Dizer</option>
      </EditableFormField>
      <EditableFormField
        label="CEP"
        type="text"
        id="cep"
        name="cep"
        placeholder="00000-000"
      />
      <EditableFormField label="Estado" type="select" id="estado" name="estado">
        <option value="" disabled>
          Selecione
        </option>
        {/* Opções de estados */}
      </EditableFormField>
      <EditableFormField
        label="Cidade"
        type="text"
        id="cidade"
        name="cidade"
        placeholder="Cidade do usuário"
      />
      <EditableFormField
        label="Bairro"
        type="text"
        id="bairro"
        name="bairro"
        placeholder="Bairro do usuário"
      />
      <EditableFormField
        label="Rua"
        type="text"
        id="rua"
        name="rua"
        placeholder="Rua do usuário"
      />
    </form>
  );
};

interface EditableFormFieldProps {
  label: string;
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  children?: React.ReactNode;
}

const EditableFormField: React.FC<EditableFormFieldProps> = ({
  label,
  type,
  id,
  name,
  placeholder,
  children,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col mt-2">
      <label className="text-sm sm:text-base text-[#003966] font-bold mb-1">
        {label}
      </label>
      <div className="flex items-center">
        {isEditing ? (
          type === "select" ? (
            <select
              id={id}
              name={name}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border-2 border-[#003966] border-opacity-30 rounded-md p-1 text-black flex-1 w-full"
            >
              {children}
            </select>
          ) : (
            <input
              type={type}
              id={id}
              name={name}
              value={value}
              placeholder={placeholder}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border-2 border-[#003966] border-opacity-30 rounded-md p-1 text-black flex-1 w-full"
            />
          )
        ) : (
          <div className="flex items-center justify-between w-full">
            <div className="flex-1 border-2 border-[#003966] border-opacity-30 rounded-md p-1 min-h-[38px] flex items-center">
              <span className="truncate">{value || placeholder}</span>
            </div>
            <span className="ml-3 cursor-pointer" onClick={handleEditClick}>
              <FaPencilAlt />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlterData;

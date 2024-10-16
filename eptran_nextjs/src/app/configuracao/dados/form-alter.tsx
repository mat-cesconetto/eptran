"use client";

import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

const AlterData: React.FC = () => {
  return (
    <form className="grid grid-cols-1 gap-4 w-full">
      <EditableFormField
        label="NOME"
        type="text"
        id="nome"
        name="nome"
        icon={<FaPencilAlt />}
      />
      <EditableFormField
        label="Data de Nascimento"
        type="date"
        id="data_nasc"
        name="data_nasc"
        icon={<FaPencilAlt />}
      />
      <EditableFormField
        label="Sexo"
        type="select"
        id="sexo"
        name="sexo"
        icon={<FaPencilAlt />}
      >
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
        icon={<FaPencilAlt />}
      />
      <EditableFormField
        label="Estado"
        type="select"
        id="estado"
        name="estado"
        icon={<FaPencilAlt />}
      >
        <option value="" disabled>
          Selecione
        </option>
        {/* Adicione aqui as opções do estado */}
      </EditableFormField>
      <EditableFormField
        label="Cidade"
        type="text"
        id="cidade"
        name="cidade"
        icon={<FaPencilAlt />}
      />
      <EditableFormField
        label="Bairro"
        type="text"
        id="bairro"
        name="bairro"
        icon={<FaPencilAlt />}
      />
      <EditableFormField
        label="Rua"
        type="text"
        id="rua"
        name="rua"
        icon={<FaPencilAlt />}
      />
    </form>
  );
};

interface EditableFormFieldProps {
  label: string;
  type: string;
  id: string;
  name: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}

const EditableFormField: React.FC<EditableFormFieldProps> = ({
  label,
  type,
  id,
  name,
  icon,
  children,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("");

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
      <div className="flex">
        {isEditing ? (
          <>
            {type === "select" ? (
              <select
                id={id}
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border-2 border-[#003966] border-opacity-30 rounded-md p-1 text-black w-2/3"
              >
                {children}
              </select>
            ) : (
              <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border-2 border-[#003966] border-opacity-30 rounded-md p-1 text-black w-2/3"
              />
            )}
          </>
        ) : (
          <div className="border-2 border-[#003966] border-opacity-30 rounded-md p-1 text-black w-2/3 flex items-center justify-between">
            <span>{value || "INFO DO USUÁRIO"}</span>
            <span className="ml-3 cursor-pointer" onClick={handleEditClick}>
              {icon}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlterData;

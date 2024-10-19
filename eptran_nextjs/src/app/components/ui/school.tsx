"use client";

import { useUser } from "@/hooks/useUserData";
import React, { useState, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";


interface SchoolProps {
  onFormChange: (data: { [key: string]: string }) => void; // Tipagem da prop onFormChange
}


const School: React.FC<SchoolProps> = ({ onFormChange }) => {
  const { userEscola, userEscolaridade, isLoading } = useUser();

  const handleAlter = (e: React.ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    onFormChange({ [name]: value }); // Passa o novo valor ao pai
  };


  if (isLoading) {
    return <p className="text-black">Carregando...</p>;
  }

  return (
    <form onChange={handleAlter} className="grid grid-cols-1 gap-4 w-full placeholder-black text-black">
      <EditableFormField
        label="ESCOLA"
        type="text"
        id="escola"
        name="escola"
        placeholder="Escola"
        defaultValue={userEscola}
      />
      <EditableFormField
        label="SÉRIE"
        type="select"
        id="serie"
        name="serie"
        defaultValue={userEscolaridade}
      >
        <option value="" disabled>
          Selecione
        </option>
        <option value="ENSINO_FUNDAMENTAL_I">Ensino Fundamental 1</option>
        <option value="ENSINO_FUNDAMENTAL_II">Ensino Fundamental 2</option>
        <option value="ENSINO_MEDIO">Ensino Médio</option>
      </EditableFormField>
    </form>
  );
};

interface EditableFormFieldProps {
  label: string;
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  children?: React.ReactNode;
}

const EditableFormField: React.FC<EditableFormFieldProps> = ({
  label,
  type,
  id,
  name,
  placeholder,
  defaultValue = "",
  children,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

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
      <label className="text-sm sm:text-base text-[#003966] font-bold mb-1">{label}</label>
      <div className="flex items-center">
        {isEditing ? (
          <>
            {type === "select" ? (
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
            )}
          </>
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

export default School;

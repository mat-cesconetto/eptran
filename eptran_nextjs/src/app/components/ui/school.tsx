"use client";

import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

const School: React.FC = () => {
  return (
    <form className="grid grid-cols-1 gap-4 w-full">
      <EditableFormField
        label="ESCOLA"
        type="text"
        id="escola"
        name="escola"
        placeholder="Nome da escola"
      />
      <EditableFormField
        label="SÉRIE"
        type="select"
        id="serie"
        name="serie"
        placeholder="Selecione a série"
      >
        <option value="" disabled>
          Selecione
        </option>
        <option value="1">1ª Série</option>
        <option value="2">2ª Série</option>
        <option value="3">3ª Série</option>
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
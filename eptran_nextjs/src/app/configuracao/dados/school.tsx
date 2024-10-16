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
        name="ecola"
        icon={<FaPencilAlt />}
      />
      <EditableFormField
        label="SÉRIE"
        type="select"
        id="serie"
        name="serie"
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

export default School;

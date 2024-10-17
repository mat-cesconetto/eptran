"use client";

import { useUser } from "@/hooks/useUserData";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";

const formatDate = (dateString: string) => {
  if (!dateString) return ""; // Retorna vazio se não houver data
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0'); // Garante dois dígitos
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`; // Formato DD/MM/YYYY
};

const AlterData: React.FC = () => {
  const {
    userName,
    userDataNasc,
    userSexo,
    userCep,
    userEstado,
    userCidade,
    userRua,
    isLoading,
  } = useUser();

  if (isLoading) {
    return <p>Carregando...</p>; // Ou um spinner para indicar carregamento
  }

  // Aqui formatamos a data antes de passar para o input
  const formattedDate = formatDate(userDataNasc);


  return (
    <form className="grid grid-cols-1 gap-4 w-full text-black placeholder-black">
      <EditableFormField
        label="NOME"
        type="text"
        id="nome"
        name="nome"
        placeholder={userName}
        defaultValue={userName}
      />
      <EditableFormField
        label="Data de Nascimento"
        type="date"
        id="data_nasc"
        name="data_nasc"
        placeholder={formattedDate} // Usa a data formatada
        defaultValue={formattedDate} // Usa a data formatada
      />
      <EditableFormField
        label="Sexo"
        type="select"
        id="sexo"
        name="sexo"
        defaultValue={userSexo}
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
        placeholder={userCep}
        defaultValue={userCep}
      />
      <EditableFormField
        label="Estado"
        type="select"
        id="estado"
        name="estado"
        defaultValue={userEstado}
      >
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
      </EditableFormField>
      <EditableFormField
        label="Cidade"
        type="text"
        id="cidade"
        name="cidade"
        placeholder={userCidade}
        defaultValue={userCidade}
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
        placeholder={userRua}
        defaultValue={userRua}
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
  const [isEditing, setIsEditing] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);

  // Sincroniza o valor com o defaultValue quando ele muda
  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col mt-2 placeholder-black">
      <label className="text-sm sm:text-base text-[#003966] font-bold mb-1">
        {label}
      </label>
      <div className="flex items-center">
        {isEditing ? (
          type === "select" ? (
            <select
              id={id}
              name={name}
              value={value} // Use `value` para campos controlados
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
              className="border-2 border-[#003966] border-opacity-30 rounded-md p-1 text-black placeholder-black flex-1 w-full"
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

import React from "react";

const Formulario: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
      <FormField label="Nome completo" type="text" id="nome" name="nome" />
      <FormField label="Estado" type="select" id="estado" name="estado">
        <option value="" disabled selected>
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
      <FormField label="Data de nascimento" type="date" id="data" name="data" />
      <FormField label="Cidade" type="text" id="cidade" name="cidade" />
      <FormField label="Bairro" type="text" id="bairro" name="bairro" />
      <FormField label="Rua" type="text" id="rua" name="rua" />
      <FormField label="Sexo" type="select" id="sexo" name="sexo">
        <option value="" disabled selected>Selecione</option>
        <option value="MASCULINO">Masculino</option>
        <option value="FEMININO">Feminino</option>
        <option value="NAO_DECLARAR">Prefirio Não Dizer</option>
      </FormField>
      <FormField label="Escola" type="text" id="escola" name="escola" />
      <FormField label="CEP" type="text" id="cep" name="cep" />
      <FormField
        label="Escolaridade"
        type="select"
        id="escolaridade"
        name="escolaridade"
      >
        <option value="">Selecione</option>
      </FormField>
    </div>
  );
};

interface FormFieldProps {
  label: string;
  type: string;
  id: string;
  name: string;
  children?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  id,
  name,
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
        className="border-2 border-[#003966] border-opacity-30 rounded-md p-1 text-black w-full"
      />
    )}
  </div>
);

export default Formulario;

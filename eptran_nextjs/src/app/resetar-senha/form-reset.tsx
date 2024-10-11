'use client';

import React, { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useReset } from "@/hooks/useReset";

const FormularioReset: React.FC = () => {
  const [newPassword, setnewPassword] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { resetPassword } = useReset();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Extrai o token da URL
    const queryToken = searchParams.get('token');
    if (queryToken) {
      setToken(queryToken);
    }
  }, [searchParams]);

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Verifica se as senhas coincidem
    if (newPassword !== repetirSenha) {
      setError("As senhas não coincidem");
      return;
    }

    if (!token) {
      setError("Token inválido ou ausente");
      return;
    }

    try {
      // Processa o reset da senha com o token extraído
      await resetPassword(newPassword, token);
      console.log('Senha redefinida com sucesso');
      setError(null); // Reseta o erro se for bem-sucedido
    } catch (error: any) {
      setError(error.message || 'Houve um erro ao redefinir a senha');
    }
  };

  return (
    <form className="grid grid-cols-1 gap-4 w-full" onSubmit={handleReset}>
      <FormField 
        label="Senha Nova" 
        type="password" 
        id="senha-nova" 
        name="senha-nova" 
        value={newPassword}
        onChange={(e) => setnewPassword(e.target.value)} 
      />

      <FormField 
        label="Repetir Senha Nova" 
        type="password" 
        id="repetir-senha" 
        name="repetir-senha" 
        value={repetirSenha}
        onChange={(e) => setRepetirSenha(e.target.value)} 
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="bg-[#003966] text-white w-full h-12 rounded-md font-bold text-lg col-span-full mt-10 mb-3"
      >
        Redefinir Senha
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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
}) => (
  <div className="flex flex-col">
    <label className="text-base text-[#003966] font-bold mb-1">{label}</label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="border-2 border-[#003966] border-opacity-30 rounded-md p-2 text-black w-full"
    />
  </div>
);

export default FormularioReset;

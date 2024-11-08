"use client";

import React, { useState } from "react";
import CustomCheckbox from "../components/ui/checkbox";
import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";

const FormularioLogin: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { loginUser } = useLogin();
  const router = useRouter();

  const handleRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Lógica para lidar com o estado de "lembrar-me"
    console.log("Lembrar-me:", e.target.checked);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Ativa o estado de carregamento

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const senha = formData.get("senha")?.toString() || "";

    try {
      await loginUser(email, senha);
      console.log("Login bem-sucedido");
      router.push("/");
    } catch (error: any) {
      setError(error.message || "Houve um erro ao logar o usuário");
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <form onSubmit={handleLogin} className="grid grid-cols-1 gap-4 w-full">
      <FormField label="Email" type="email" id="email" name="email" />
      <FormField label="Senha" type="password" id="senha" name="senha" />

      <div className="w-full flex justify-between items-center mb-4">
        <CustomCheckbox label="Lembrar" onChange={handleRememberMe} isForLogin />
        <Link href={"./forgot-password"}>
          <p className="text-[#003966] text-sm md:text-base">
            Esqueceu sua senha?
          </p>
        </Link>
      </div>

      <button
        type="submit"
        className="bg-[#003966] text-white w-full h-12 rounded-md font-bold text-lg col-span-full mb-3"
        disabled={isLoading} // Desativa o botão enquanto carrega
      >
        {isLoading ? "Carregando..." : "Entrar"}
      </button>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </form>
  );
};

interface FormFieldProps {
  label: string;
  type: string;
  id: string;
  name: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, type, id, name }) => (
  <div className="flex flex-col">
    <label className="text-base text-[#003966] font-bold mb-1">{label}</label>
    <input
      type={type}
      id={id}
      name={name}
      className="border-2 border-[#003966] border-opacity-30 rounded-md p-2 text-black w-full"
    />
  </div>
);

export default FormularioLogin;
'use client';

import React, { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useReset } from "@/hooks/useReset";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

      <Button
        onPress={onOpen}
        type="submit"
        className="bg-[#003966] text-white w-full h-12 rounded-md font-bold text-base sm:text-lg col-span-full mt-6 sm:mt-10 mb-3"
      >
        Redefinir a Senha
      </Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        placement="center"
        hideCloseButton
        classNames={{
          backdrop: "bg-black/70 backdrop-opacity-40",
          base: "border-[#003966] bg-white dark:bg-[#003966] max-w-[85%] sm:max-w-[60%] md:max-w-[40%] lg:max-w-[26%]",
          header: "border-b-[1px] border-[#003966]",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <div className="p-4 sm:p-5 md:p-6 text-center rounded-lg bg-white shadow-2xl">
              <div className="flex flex-col text-left gap-2 text-[#003966] text-xl sm:text-xl md:text-2xl font-bold mb-3">
                Senha alterada com sucesso!
              </div>
              <ModalBody className="w-full p-0">
                <div className="w-full h-0.5 bg-black mb-3"></div>
                <p className="text-sm sm:text-sm md:text-base text-[#003966] text-left mb-4">
                  A senha da sua conta foi alterada com sucesso, não se esqueça dela.
                </p>
              </ModalBody>  
              <ModalFooter className="justify-center p-0">
                <Button
                  className="bg-[#003966] text-white font-bold w-full rounded-md h-9 sm:h-10"
                  onPress={onClose}
                >
                  Ok
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
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

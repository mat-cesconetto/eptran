"use client";

import { useForgot } from "@/hooks/useForgot";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

const FormularioForgot: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { forgotPassword } = useForgot();

  const handleForgot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() || "";

    try {
      await forgotPassword(email);
      console.log("tudo funcionando");
    } catch (error: any) {
      setError(error.message || "Houve um erro ao resetar a senha do usuário");
    }
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <form onSubmit={handleForgot} className="grid grid-cols-1 gap-4 w-full">
      <FormField label="Email" type="email" id="email" name="email" />
      <Button
        onPress={onOpen}
        type="submit"
        className="bg-[#003966] text-white w-full h-12 rounded-md font-bold text-base sm:text-lg col-span-full mt-6 sm:mt-10 mb-3"
      >
        Enviar E-mail
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
                Pedido de redefinição de senha enviado!
              </div>
              <ModalBody className="w-full p-0">
                <div className="w-full h-0.5 bg-black mb-3"></div>
                <p className="text-sm sm:text-sm md:text-base text-[#003966] text-left mb-4">
                  Fique de olho no seu e-mail para fazer a redefinição de sua
                  senha.
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
    <label className="text-sm sm:text-base text-[#003966] font-bold mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      className="border-2 border-[#003966] border-opacity-30 rounded-md p-2 text-black w-full"
    />
  </div>
);

export default FormularioForgot;

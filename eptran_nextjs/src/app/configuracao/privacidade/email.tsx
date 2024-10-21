"use client";

import { useEmail } from "@/hooks/useEmail";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";



const RedefinirEmail: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { changeEmail } = useEmail();
  const { isOpen, onOpen, onOpenChange } = useDisclosure()


  const handleEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const emailAntigo = formData.get("emailAntigo")?.toString() || "";
    const emailNovo = formData.get("emailNovo")?.toString() || "";

    try {
      await changeEmail(emailAntigo, emailNovo);
      console.log("deu boa");
      onOpen()
    } catch (error: any) {
      setError(error.message || "Houve um erro ao resetar a senha do usuário");
    }
  };

  return (
    <form onSubmit={handleEmail} action="" className="flex flex-col w-full">
      <div className="flex flex-col space-y-4">
        <div>
          <label
            htmlFor="emailAntigo"
            className="text-sm sm:text-base md:text-lg text-[#003966] font-bold mb-1 block"
          >
            E-MAIL ANTIGO
          </label>
          <input
            type="email"
            id="emailAntigo"
            name="emailAntigo"
            placeholder="emaildousuario@gmail.com"
            className="border-2 border-[#003966] border-opacity-30 rounded-md p-2 text-black w-full lg:w-2/3"
          />
        </div>
        <div>
          <label
            htmlFor="emailNovo"
            className="text-sm sm:text-base md:text-lg text-[#003966] font-bold mb-1 block"
          >
            E-MAIL NOVO
          </label>
          <input
            type="email"
            id="emailNovo"
            name="emailNovo"
            placeholder="emaildousuario@gmail.com"
            className="border-2 border-[#003966] border-opacity-30 rounded-md p-2 text-black w-full lg:w-2/3"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="bg-[#003966] text-white w-full lg:w-2/5 h-11 rounded-md font-semibold text-base sm:text-lg mt-6 mb-3"
      >
        REDEFINIR E-MAIL
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        hideCloseButton
        classNames={{
          backdrop: "bg-black/70 backdrop-opacity-40",
          base: "border-[#003966] bg-white dark:bg-[#003966] max-w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[40%]",
          header: "border-b-[1px] border-[#003966]",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <div className="p-4 sm:p-5 md:p-6 text-center rounded-lg bg-white shadow-2xl">
              <div className="flex flex-col text-left gap-2 text-[#003966] text-xl sm:text-2xl font-bold mb-3">
                Pedido de redefinição de e-mail enviado!
              </div>
              <ModalBody className="w-full p-0">
                <div className="w-full h-0.5 bg-black mb-3"></div>
                <p className="text-sm sm:text-base text-[#003966] text-left mb-4">
                  Fique de olho no seu e-mail para fazer a redefinição de sua
                  e-mail.
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
      {error && (
        <p className="text-red-500 text-sm text-center mt-2">{error}</p>
      )}
    </form>
  );
};




export default RedefinirEmail


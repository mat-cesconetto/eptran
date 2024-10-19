"use client"

import { useForgot } from "@/hooks/useForgot"
import { useState } from "react"
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react"
import React from "react"

const RedefinirSenha: React.FC = () => {
  const [error, setError] = useState<string | null>(null)
  const { forgotPassword } = useForgot()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleForgot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email")?.toString() || ""

    try {
      await forgotPassword(email)
      onOpen()
    } catch (error: any) {
      setError(error.message || "Houve um erro ao resetar a senha do usuário")
    }
  }

  return (
    <form onSubmit={handleForgot} className="flex flex-col w-full">
      <div className="mb-4">
        <label htmlFor="email" className="text-sm sm:text-base md:text-lg text-[#003966] font-bold mb-1 block">
          E-MAIL
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="emaildousuario@gmail.com"
          className="border-2 border-[#003966] border-opacity-30 rounded-md p-2 text-black w-full lg:w-2/3"
        />
      </div>
      <Button
        type="submit"
        className="bg-[#003966] text-white w-full lg:w-2/5 h-11 rounded-md font-semibold text-base sm:text-lg mt-4 mb-3"
      >
        REDEFINIR SENHA
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
                Pedido de redefinição de senha enviado!
              </div>
              <ModalBody className="w-full p-0">
                <div className="w-full h-0.5 bg-black mb-3"></div>
                <p className="text-sm sm:text-base text-[#003966] text-left mb-4">
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
      {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
    </form>
  )
}

export default RedefinirSenha
'use client'

import React, { useState } from "react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react"

interface Section {
  title: string
  items: string[]
}

interface GridSectionProps {
  sections: Section[]
}

export default function GridSection({ sections }: GridSectionProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [modalTitle, setModalTitle] = useState("")
  const [modalContent, setModalContent] = useState("")

  const modalContentMap: Record<string, string> = {
    "Como Recuperar Senha": "Para recuperar sua senha, clique em 'Esqueci minha senha' na tela de login e siga as instruções.",
    "Alterar Região de Residência": "Para alterar sua região de residência, acesse as configurações da conta e selecione 'Alterar Região'.",
    "Alterar Escola": "Para alterar sua escola, entre em contato com o suporte ao cliente.",
    "Como recuperar a senha": "Veja a seção 'Como Recuperar Senha' para mais informações.",
    "Erro ao entrar no jogo": "Verifique sua conexão de internet ou tente reiniciar o aplicativo.",
    "Problema na visualização de conteúdo": "Limpe o cache do seu navegador e tente novamente.",
    "Restrição de conteúdo": "Alguns conteúdos podem estar restritos em sua região.",
    "Solicitar dados da conta": "Você pode solicitar seus dados através da seção de privacidade.",
    "Exclusão da conta": "Para excluir sua conta, entre em contato com o suporte.",
  }

  const handleButtonClick = (item: string) => {
    setModalTitle(item)
    setModalContent(modalContentMap[item] || "Conteúdo não disponível.")
    onOpen()
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map((section, index) => (
          <div key={index} className="flex flex-col items-start">
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">
              {section.title}
            </h2>
            {section.items.map((item, itemIndex) => (
              <button
                key={itemIndex}
                onClick={() => handleButtonClick(item)}
                className="bg-neutral-100 text-black w-full h-12 mb-2 rounded-md shadow-sm hover:bg-neutral-200 transition-all duration-200 text-sm sm:text-base px-4 text-left"
              >
                {item}
              </button>
            ))}
          </div>
        ))}
      </div>

      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        className="max-w-[90%] md:max-w-[80%] lg:max-w-[40%] mx-auto my-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <ModalContent className="max-h-[80vh] sm:max-h-none">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-lg md:text-xl lg:text-2xl">
                  {modalTitle}
                </ModalHeader>
                <ModalBody>
                  <p className="text-sm md:text-base">{modalContent}</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose} className="w-full sm:w-auto">
                    Fechar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </div>
      </Modal>
    </div>
  )
}
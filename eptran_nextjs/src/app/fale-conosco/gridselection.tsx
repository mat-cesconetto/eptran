"use client"; // Adicionando para garantir que o componente seja um componente do cliente
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

interface Section {
  title: string;
  items: string[];
}

interface GridSectionProps {
  sections: Section[];
}

const GridSection: React.FC<GridSectionProps> = ({ sections }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  // Mapeia os conteúdos para cada item
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
  };

  const handleButtonClick = (item: string) => {
    setModalTitle(item); // Define o título do modal com o texto do botão
    setModalContent(modalContentMap[item] || "Conteúdo não disponível."); // Define o conteúdo do modal
    onOpen(); // Abre o modal
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map((section, index) => (
          <div key={index} className="flex flex-col items-start">
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">
              {section.title}
            </h2>
            {section.items.map((item, itemIndex) => (
              <button
                key={itemIndex}
                onClick={() => handleButtonClick(item)} // Abre o modal com o conteúdo do item
                className="bg-neutral-100 text-black w-full h-12 mb-2 rounded-md shadow-sm hover:bg-neutral-200 transition-all duration-200 text-sm sm:text-base"
              >
                {item} {/* Exibe o texto do botão */}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{modalTitle}</ModalHeader> {/* Título do modal baseado no botão clicado */}
              <ModalBody>
                <p>{modalContent}</p> {/* Exibe o conteúdo do modal */}
              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default GridSection;

import { Button } from "@nextui-org/react";
import React from "react";

interface AwardProps {
  title: string;
  description: string;
  status: string; //"emProgresso" | "resgatar" | "resgatado"
}

const Award: React.FC<AwardProps> = ({ title, description, status }) => {
  // Função para aplicar as classes com base no status
  const getButtonStyles = () => {
    switch (status) {
      case "emProgresso":
        return "bg-white text-black border border-black";
      case "resgatar":
        return "bg-[#00BF63] text-white";
      case "resgatado":
        return "bg-[#00BF63] text-white border border-white";
      default:
        return "";
    }
  };

  // Texto do botão com base no status
  const getButtonText = () => {
    switch (status) {
      case "emProgresso":
        return "Em Progresso";
      case "resgatar":
        return "Resgatar";
      case "resgatado":
        return "Resgatado";
      default:
        return "";
    }
  };

  // Função para mudar o fundo e o texto do card no estado "resgatar"
  const getCardStyles = () => {
    if (status === "resgatado") {
      return "bg-[#00BF63] text-white"; // Fundo verde e texto branco
    }
    return "bg-white text-black"; // Fundo padrão (branco) e texto preto
  };

  return (
    <div className={`w-80 h-96 rounded-2xl border-2 border-solid shadow-lg ${getCardStyles()}`}>
      <div className="w-full bg-white rounded-t-xl h-2/5 shadow-xl"></div>
      <div className="px-10 text-center mt-6">
        <h1 className="text-xl font-semibold">{title}</h1>
        <hr className="h-px my-2 border-0 dark:bg-gray-700" />
        <p>{description}</p>
      </div>
      <div className="mt-6 mx-10">
        <Button className={`w-full ${getButtonStyles()}`}>
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
};

export default Award;

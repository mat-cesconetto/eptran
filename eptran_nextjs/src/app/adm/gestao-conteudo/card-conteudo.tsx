import React from "react";
import { Material } from "@/@types/Material";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, SquarePen, Trash } from "lucide-react";

interface CardProps {
  material: Material;
  onEdit: () => void;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({ material, onEdit, onDelete }) => {
  return (
    <div className="relative border rounded-lg shadow-lg p-4 m-4 bg-white">
      <img
        src="/Image/mat1.svg"
        alt="imagem conteudo"
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="font-bold text-lg">{material.titulo}</h2>
        <p className="text-sm text-gray-600">{material.descricao}</p>
        <p className="text-sm text-gray-600">{material.escolaridade}</p>
      </div>
      <div className="absolute bottom-2 right-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="bg-transparent text-gray-600 hover:text-gray-800 focus:outline-none text-lg">
              <MoreHorizontal />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={onEdit}>
              <SquarePen className="mr-2" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>
              <Trash className="mr-2" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Card;
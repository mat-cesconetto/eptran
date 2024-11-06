import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, SquarePen, Trash } from "lucide-react";

interface CardProps {
  src: string; // URL da imagem
  alt: string; // Texto alternativo da imagem
  conteudo: string; // Conteúdo do card
  data: string; // Data associada
  paginas: string; // Número de páginas
  nivel: string; // Nível de escolaridade
  tamanho: string; // Tamanho do material
}

const Card: React.FC<CardProps> = ({
  src,
  alt,
  conteudo,
  data,
  paginas,
  nivel,
  tamanho,
}) => {
  return (
    <div className="relative border rounded-lg shadow-lg p-4 m-4 bg-white">
      <img
        src={src}
        alt={alt}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="font-bold text-lg">{conteudo}</h2>
        <p className="text-sm text-gray-600">{data}</p>
        <p className="text-sm text-gray-600">{paginas}</p>
        <p className="text-sm text-gray-600">{nivel}</p>
        <p className="text-sm text-gray-600">{tamanho}</p>
      </div>
      {/* Dropdown com os três pontos */}
      <div className="absolute bottom-2 right-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="bg-transparent text-gray-600 hover:text-gray-800 focus:outline-none text-lg">
              <MoreHorizontal /> {/* Ícone de três pontos */}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <SquarePen className="mr-2" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem>
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

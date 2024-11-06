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

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[600px] w-full">
          <DialogHeader>
            <DialogTitle className="text-[40px] font-bold text-darkBlue-500">
              Editar Conteúdo
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid">
              <Label
                htmlFor="link"
                className="text-xs font-bold text-darkBlue-600"
              >
                LINK DO CONTEÚDO
              </Label>
              <Input
                id="link"
                className="border-darkBlue-400"
                placeholder="http://sia.com.br"
              />
            </div>
            <div className="grid">
              <Label
                htmlFor="name"
                className="text-xs font-bold text-darkBlue-600"
              >
                NOME DO CONTEÚDO
              </Label>
              <Input
                id="name"
                className="border-darkBlue-400"
                placeholder="Nome conteúdo EPTRAN"
              />
            </div>
            <div className="grid">
              <Label
                htmlFor="description"
                className="text-xs font-bold text-darkBlue-600"
              >
                DESCRIÇÃO DO CONTEÚDO
              </Label>
              <Textarea
                id="description"
                placeholder="Descrição conteúdo EPTRAN"
                className="border-darkBlue-400"
              />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="w-[45%]">
              <Label
                htmlFor="classification"
                className="text-xs font-bold text-darkBlue-600 block"
              >
                CLASSIFICAÇÃO
              </Label>
              <Select>
                <SelectTrigger className="border-darkBlue-400 w-full">
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-school">Ensino Médio</SelectItem>
                  <SelectItem value="elementary">Ensino Fundamental</SelectItem>
                  <SelectItem value="early-grades">Séries Iniciais</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-[45%] flex justify-end space-x-2">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="w-full border-darkBlue-400 font-bold text-xs hover:bg-slate-200"
                  onClick={() => setEditOpen(false)}
                >
                  CANCELAR
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="w-full bg-darkBlue-500 text-white font-bold text-xs"
              >
                ENVIAR
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-[400px] w-full">
          <DialogHeader>
            <DialogTitle className="text-[24px] font-bold text-darkBlue-500">
              Excluir Conteúdo
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-darkBlue-600">
              Tem certeza de que deseja excluir este conteúdo? Esta ação não pode ser desfeita.
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="border-darkBlue-400 font-bold text-xs hover:bg-slate-200"
                onClick={() => setDeleteOpen(false)}
              >
                CANCELAR
              </Button>
            </DialogClose>
            <Button
              className="bg-red-500 text-white font-bold text-xs"
              onClick={handleDelete}
            > 
              EXCLUIR
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Card;

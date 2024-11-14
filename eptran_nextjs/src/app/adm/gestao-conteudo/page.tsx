'use client'
import { useState, useEffect } from "react";
import { Material } from "@/@types/Material";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Card from "./card-conteudo"; 
import { useMateriais } from "@/hooks/useMateriais";
import useAddMaterial from "@/hooks/useAddMaterial";
import useEditMaterial from "@/hooks/useEditMaterial";

export default function Conteudo() {
  const { materiais, isLoading, isError } = useMateriais();
  const [escolaridade, setEscolaridade] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [materialLink, setMaterialLink] = useState("");
  const { addMaterial } = useAddMaterial();
  const { editMaterial } = useEditMaterial();
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);  // Controle de abertura do popup

  // Use useEffect to set the values for editing when editingMaterial changes
  useEffect(() => {
    if (editingMaterial) {
      setEscolaridade(editingMaterial.escolaridade);
      setTitulo(editingMaterial.titulo);
      setDescricao(editingMaterial.descricao);
      setMaterialLink(editingMaterial.materialLink);
      setDialogOpen(true);  // Abrir o diálogo automaticamente quando for editar
    } else {
      setEscolaridade("");
      setTitulo("");
      setDescricao("");
      setMaterialLink("");
    }
  }, [editingMaterial]);

  // Limpar todos os campos do formulário
  const resetForm = () => {
    setEscolaridade("");
    setTitulo("");
    setDescricao("");
    setMaterialLink("");
    setEditingMaterial(null);
  };

  const handleAddMaterial = () => {
    const newMaterial: Material = {
      id: 0,  // ID gerado no backend
      escolaridade,
      titulo,
      descricao,
      materialLink,
    };
    addMaterial(newMaterial);
    resetForm(); // Limpar os campos após adicionar
    setDialogOpen(false); // Fechar o diálogo após adicionar
  };

  const handleEditMaterial = () => {
    if (editingMaterial) {
      const updatedMaterial: Material = {
        ...editingMaterial,
        escolaridade,
        titulo,
        descricao,
        materialLink,
      };
      editMaterial(updatedMaterial);
      resetForm(); // Limpar após editar
      setDialogOpen(false); // Fechar o diálogo após editar
    }
  };
  
  return (
    <main>
      <div className="flex">
        <Image
          className="bg-darkBlue-500 rounded-lg h-14 w-14 ml-14 mt-10"
          src="/Image/livro.svg"
          alt="Livro"
          width="56"
          height="56"
        />
        <h1 className="text-darkBlue-500 font-bold text-5xl pl-4 pt-10 -mb-96">
          Gestão de Conteúdo
        </h1>
      </div>

      <div className="ml-6 pt-0.5 p-8">
        <div className="w-full flex mt-10 justify-between">
          <div className="relative w-[28vw]">
            <div className="absolute flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 mt-3 text-darkBlue-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="procurar"
              className="font-semibold block items-center h-10 ps-10 min-w-72 w-full text-sm bg-white rounded-lg border-gray-300 border-1 placeholder-darkBlue-300"
              placeholder="Procurar"
            />
          </div>

          <div className="">
            <Dialog open={dialogOpen} onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) {
                resetForm(); // Limpar os campos quando o popup for fechado sem salvar
              }
            }}>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  className=" font-semibold w-56 h-10 mt-1 shadow-xl flex items-center bg-darkBlue-500 text-white px-5 rounded-md text-lg"
                >
                  <Image
                    className="w-7 mr-1"
                    src="/Image/circulo.svg"
                    alt="Adicionar"
                    width={28}
                    height={28}
                  />
                  Adicionar Material
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] w-full">
                <DialogHeader>
                  <DialogTitle className="text-[40px] font-bold text-darkBlue-500">
                    {editingMaterial ? "Editar Conteúdo" : "Adicionar Conteúdo"}
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
                      value={materialLink}
                      onChange={(e) => setMaterialLink(e.target.value)}
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
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
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
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </div>
                  <div className="grid">
                    <Label
                      htmlFor="escolaridade"
                      className="text-xs font-bold text-darkBlue-600"
                    >
                      NÍVEL ESCOLAR
                    </Label>
                    <Select
                      onValueChange={setEscolaridade}
                      value={escolaridade}
                    >
                      <SelectTrigger className="w-[180px] text-xs">
                        <SelectValue placeholder="Escolaridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Séries Iniciais">Séries Iniciais</SelectItem>
                        <SelectItem value="Ensino Fundamental">Ensino Fundamental</SelectItem>
                        <SelectItem value="Ensino Médio">Ensino Médio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    className="w-[180px] h-10 bg-darkBlue-500 text-white"
                    onClick={editingMaterial ? handleEditMaterial : handleAddMaterial}
                  >
                    {editingMaterial ? "Salvar Edição" : "Adicionar"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {isLoading && <p>Carregando...</p>}
        {isError && <p>Ocorreu um erro ao carregar os materiais.</p>}

        <div className="grid grid-cols-3 gap-5">
          {materiais.map((material) => (
            <Card
              key={material.id}
              material={material}
              onEdit={() => setEditingMaterial(material)}  // Chama a função de editar
            />
          ))}
        </div>
      </div>
    </main>
  );
}
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
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Card from "./card-conteudo"; 
import { useMateriais } from "@/hooks/useMateriais";
import useAddMaterial from "@/hooks/useAddMaterial";
import useEditMaterial from "@/hooks/useEditMaterial";
import useDeleteMaterial from "@/hooks/useDeleteMaterial";

export default function Component() {
  const { materiais, isLoading, isError } = useMateriais();
  const [escolaridade, setEscolaridade] = useState<string>("");
  const [titulo, setTitulo] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [materialLink, setMaterialLink] = useState<string>("");
  const { addMaterial } = useAddMaterial();
  const { editMaterial } = useEditMaterial();
  const { deleteMaterial } = useDeleteMaterial();
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDeleteMaterial, setConfirmDeleteMaterial] = useState<Material | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (editingMaterial) {
      setEscolaridade(editingMaterial.escolaridade || "");
      setTitulo(editingMaterial.titulo || "");
      setDescricao(editingMaterial.descricao || "");
      setMaterialLink(editingMaterial.materialLink || "");
      setDialogOpen(true);
    } else {
      resetForm();
    }
  }, [editingMaterial]);

  const resetForm = () => {
    setEscolaridade("");
    setTitulo("");
    setDescricao("");
    setMaterialLink("");
    setEditingMaterial(null);
  };

  const handleAddMaterial = () => {
    const newMaterial: Material = {
      id: 0,
      escolaridade,
      titulo,
      descricao,
      materialLink,
    };
    addMaterial(newMaterial);
    resetForm();
    setDialogOpen(false);
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
      resetForm();
      setDialogOpen(false);
    }
  };

  const handleConfirmDelete = () => {
    if (confirmDeleteMaterial) {
      deleteMaterial(confirmDeleteMaterial.id);
      setConfirmDeleteMaterial(null);
    }
  };

  const filteredMateriais = materiais.filter((material) =>
    material.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-center mb-8">
        <Image
          className="bg-darkBlue-500 rounded-lg h-14 w-14 mb-4 md:mb-0 md:mr-4"
          src="/Image/livro.svg"
          alt="Livro"
          width={56}
          height={56}
        />
        <h1 className="text-darkBlue-500 font-bold text-3xl md:text-5xl text-center md:text-left">
          Gestão de Conteúdo
        </h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="relative w-full md:w-[28vw] mb-4 md:mb-0">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-darkBlue-500"
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
            className="font-semibold block w-full pl-10 pr-3 py-2 text-sm bg-white rounded-lg border border-gray-300 placeholder-darkBlue-300"
            placeholder="Procurar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            resetForm();
          }
        }}>
          <DialogTrigger asChild>
            <Button
              variant="default"
              className="font-semibold w-full md:w-56 h-10 shadow-xl flex items-center justify-center bg-darkBlue-500 text-white px-5 rounded-md text-lg"
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
              <DialogTitle className="text-2xl md:text-[40px] font-bold text-darkBlue-500">
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
                  placeholder="Link do conteúdo"
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
                  <SelectTrigger className="w-full md:w-[180px] text-xs">
                    <SelectValue placeholder="Escolaridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ENSINO_FUNDAMENTAL_I">Séries Iniciais</SelectItem>
                    <SelectItem value="ENSINO_FUNDAMENTAL_II">Ensino Fundamental</SelectItem>
                    <SelectItem value="ENSINO_MEDIO">Ensino Médio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                className="w-full md:w-[180px] h-10 bg-darkBlue-500 text-white"
                onClick={editingMaterial ? handleEditMaterial : handleAddMaterial}
              >
                {editingMaterial ? "Salvar Alterações" : "Adicionar"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
        {!isLoading && !isError ? (
          filteredMateriais.map((material) => (
            <Card
              key={material.id}
              material={material}
              onEdit={() => setEditingMaterial(material)}
              onDelete={() => setConfirmDeleteMaterial(material)}
            />
          ))
        ) : (
          <p className="text-darkBlue-500">Carregando...</p>
        )}
      </div>

      {confirmDeleteMaterial && (
        <Dialog open={true} onOpenChange={() => setConfirmDeleteMaterial(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tem certeza que deseja excluir?</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmDeleteMaterial(null)}>
                Cancelar
              </Button>
              <Button className="bg-red-500 text-white" onClick={handleConfirmDelete}>
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
}
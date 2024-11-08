"use client";

import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'; // Ajuste para sua biblioteca
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const EditDeleteComponent = () => {
  // Diálogo de edição
  const [editOpen, setEditOpen] = useState(false);

  // Diálogo de exclusão
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = () => {
    // Lógica de exclusão
    console.log("Conteúdo excluído!");
    setDeleteOpen(false);
  };

  return (
    <div>
      {/* Botão para abrir o diálogo de edição */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="p-0" onClick={() => setEditOpen(true)}>Editar Conteúdo</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] w-full">
          <DialogHeader>
            <DialogTitle className="text-[40px] font-bold text-darkBlue-500">Editar Conteúdo</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid">
              <Label htmlFor="link" className="text-xs font-bold text-darkBlue-600">LINK DO CONTEÚDO</Label>
              <Input id="link" className="border-darkBlue-400" placeholder="http://sia.com.br" />
            </div>
            <div className="grid">
              <Label htmlFor="name" className="text-xs font-bold text-darkBlue-600">NOME DO CONTEÚDO</Label>
              <Input id="name" className="border-darkBlue-400" placeholder="Nome conteúdo EPTRAN" />
            </div>
            <div className="grid">
              <Label htmlFor="description" className="text-xs font-bold text-darkBlue-600">DESCRIÇÃO DO CONTEÚDO</Label>
              <Textarea id="description" placeholder="Descrição conteúdo EPTRAN" className="border-darkBlue-400" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="w-[45%]">
              <Label htmlFor="classification" className="text-xs font-bold text-darkBlue-600 block">CLASSIFICAÇÃO</Label>
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
                <Button variant="outline" className="w-full border-darkBlue-400 font-bold text-xs hover:bg-slate-200" onClick={() => setEditOpen(false)}>CANCELAR</Button>
              </DialogClose>
              <Button type="submit" className="w-full bg-darkBlue-500 text-white font-bold text-xs">ENVIAR</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Botão para abrir o diálogo de exclusão */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="p-0" onClick={() => setDeleteOpen(true)}>Excluir Conteúdo</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px] w-full">
          <DialogHeader>
            <DialogTitle className="text-[24px] font-bold text-darkBlue-500">Excluir Conteúdo</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-darkBlue-600">Tem certeza de que deseja excluir este conteúdo? Esta ação não pode ser desfeita.</p>
          </div>
          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline" className="border-darkBlue-400 font-bold text-xs hover:bg-slate-200" onClick={() => setDeleteOpen(false)}>CANCELAR</Button>
            </DialogClose>
            <Button className="bg-red-500 text-white font-bold text-xs" onClick={handleDelete}>EXCLUIR</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditDeleteComponent;
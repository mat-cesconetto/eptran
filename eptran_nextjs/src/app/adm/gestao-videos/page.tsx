'use client'

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { MoreHorizontal, Trash, SquarePen } from "lucide-react"
import { Textarea } from "@/components/ui/textarea";

export default function VideoManagement() {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [addVideoOpen, setAddVideoOpen] = useState(false)

  const handleDelete = () => {
    console.log("Video deleted!")
    setDeleteOpen(false)
  }

  const VideoCard = () => (
    <div className="rounded-xl w-72 bg-darkBlue-500">
      <Image
        className="border rounded-t-xl w-full"
        src="/placeholder.svg"
        alt="Video Thumbnail"
        width={288}
        height={162}
      />
      <div className="flex justify-between">
        <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-32 h-6 pt-1">
          Vídeo Educativo Eptran
        </p>
        <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-24 h-6 p-1">
          21/07/2024
        </p>
      </div>
      <div className="flex justify-start">
        <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-8 h-6 p-1">
          3:02
        </p>
        <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">
          EM
        </p>
        <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">
          207 MB
        </p>
      </div>
      <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 ml-2 mt-1">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => setEditOpen(true)}>
              <SquarePen className="mr-2 h-4 w-4" />
              Editar Vídeo
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setDeleteOpen(true)}>
              <Trash className="mr-2 h-4 w-4" />
              Excluir Vídeo
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )

  return (
    <main className="p-8">
      <div className="flex items-center mb-8">
        <Image
          className="bg-darkBlue-500 rounded-lg h-14 w-16 mr-4"
          src="/placeholder.svg"
          alt="Video Camera"
          width={56}
          height={56}
        />
        <h1 className="text-darkBlue-500 font-bold text-5xl">Gestão de Vídeos</h1>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Procurar"
            className="pl-10 w-80"
          />
          <svg
            className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="flex space-x-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ensino Médio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high-school">Ensino Médio</SelectItem>
              <SelectItem value="elementary">Ensino Fundamental</SelectItem>
              <SelectItem value="early-grades">Séries Iniciais</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Mais recentes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Mais recentes</SelectItem>
              <SelectItem value="oldest">Mais antigos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={addVideoOpen} onOpenChange={setAddVideoOpen}>
          <DialogTrigger asChild>
            <Button className="bg-darkBlue-500 text-white">
              <Image
                className="w-5 h-5 mr-2"
                src="/placeholder.svg"
                alt="Add"
                width={20}
                height={20}
              />
              Adicionar Vídeo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-darkBlue-500">Adicionar Vídeo</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label className="text-xs font-semibold text-darkBlue-500">LINK DO VÍDEO</Label>
                <Input placeholder="http://sia.com.br" />
              </div>
              <div className="grid gap-2">
                <Label className="text-xs font-semibold text-darkBlue-500">NOME DO VÍDEO</Label>
                <Input placeholder="Nome vídeo EPTRAN" />
              </div>
              <div className="grid gap-2">
                <Label className="text-xs font-semibold text-darkBlue-500">DESCRIÇÃO DO VÍDEO</Label>
                <Textarea placeholder="Descrição vídeo EPTRAN" className="resize-none" />
              </div>
              <div className="grid gap-2">
                <Label className="text-xs font-semibold text-darkBlue-500">CLASSIFICAÇÃO</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ensino-medio">Ensino Médio</SelectItem>
                    <SelectItem value="ensino-fundamental">Ensino Fundamental</SelectItem>
                    <SelectItem value="series-iniciais">Séries Iniciais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">CANCELAR</Button>
              </DialogClose>
              <Button type="submit" className="bg-darkBlue-500">ENVIAR</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <VideoCard key={i} />
        ))}
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-darkBlue-500">Editar Vídeo</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label className="text-xs font-semibold text-darkBlue-500">LINK DO VÍDEO</Label>
              <Input placeholder="http://sia.com.br" />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs font-semibold text-darkBlue-500">NOME DO VÍDEO</Label>
              <Input placeholder="Nome vídeo EPTRAN" />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs font-semibold text-darkBlue-500">DESCRIÇÃO DO VÍDEO</Label>
              <Textarea placeholder="Descrição vídeo EPTRAN" className="resize-none" />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs font-semibold text-darkBlue-500">CLASSIFICAÇÃO</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ensino-medio">Ensino Médio</SelectItem>
                  <SelectItem value="ensino-fundamental">Ensino Fundamental</SelectItem>
                  <SelectItem value="series-iniciais">Séries Iniciais</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">CANCELAR</Button>
            </DialogClose>
            <Button type="submit" className="bg-darkBlue-500">ENVIAR</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Vídeo</DialogTitle>
          </DialogHeader>
          <p>Tem certeza de que deseja excluir este vídeo? Esta ação não pode ser desfeita.</p>
          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline">CANCELAR</Button>
            </DialogClose>
            <Button onClick={handleDelete} variant="destructive">
              EXCLUIR
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Copy, Link } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import Image from "next/image";

import { Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
 } from "@/components/ui/select";

 import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";

import { MoreHorizontal, Trash, SquarePen, Search } from "lucide-react";



export default function Conteudo() {
    return (
        <main>
            
            <div className="flex">
                <Image
                    className="bg-darkBlue-500 rounded-lg h-14 w-14 ml-14 mt-10"
                    src="/Image/livro.svg"
                    alt="Livro"
                    width='56'
                    height='56'
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
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
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

                    <div className="flex justify-between mr-[30%]">
                        <div className="mx-8">
                        <Select>
              <SelectTrigger className="border-gray-300 border-1 w-52 h-10 text-darkBlue-500 font-bold text-md">
                <SelectValue placeholder="Selecionar" />
              </SelectTrigger>
              <SelectContent className="shadow-xl">
                <SelectItem className="text-darkBlue-500 font-semibold " value="high-school">Ensino Médio</SelectItem>
                <SelectItem className="text-darkBlue-500 font-semibold " value="elementary">Ensino Fundamental</SelectItem>
                <SelectItem className="text-darkBlue-500 font-semibold " value="early-grades">Séries Iniciais</SelectItem>
              </SelectContent>
            </Select>
                        </div>

                        <div>
                        <Select>
              <SelectTrigger className="border-gray-300 border-1 w-48 h-10 text-darkBlue-500 font-bold text-md">
                <SelectValue placeholder="Selecionar" />
              </SelectTrigger>
              <SelectContent className="shadow-xl">
        <SelectGroup >
          <SelectItem className="text-darkBlue-500 font-semibold " value="recent">Mais Recentes</SelectItem>
          <SelectItem className="text-darkBlue-500 font-semibold " value="older">Mais Antigos</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
                        </div>
                    </div>

                    <div className="">
                    <Dialog>
      <DialogTrigger asChild>
      <Button variant="default" className=" font-semibold w-56 h-10 mt-1 shadow-xl flex items-center bg-darkBlue-500 text-white px-5 rounded-md text-lg"> 
      <Image className="w-7 mr-1" src="/Image/circulo.svg" alt="Adicionar" width={28} height={28} 
      />Adicionar Material</Button> 
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] w-full">
        <DialogHeader>
          <DialogTitle className="text-[40px] font-bold text-darkBlue-500">Adicionar Conteúdo</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid">
            <Label htmlFor="link" className="text-xs font-bold text-darkBlue-600">
              LINK DO CONTEÚDO
            </Label>
            <Input id="link" className="border-darkBlue-400" placeholder="http://sia.com.br" />
          </div>
          <div className="grid">
            <Label htmlFor="name" className="text-xs font-bold text-darkBlue-600">
              NOME DO CONTEÚDO
            </Label>
            <Input id="name" className="border-darkBlue-400" placeholder="Nome conteúdo EPTRAN" />
          </div>
          <div className="grid">
            <Label htmlFor="description" className="text-xs font-bold text-darkBlue-600">
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
            <Label htmlFor="classification" className="text-xs font-bold text-darkBlue-600 block">
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
              <Button variant="outline" className="w-full border-darkBlue-400 font-bold text-xs hover:bg-slate-200">CANCELAR</Button>
            </DialogClose>
            <Button type="submit" className="w-full bg-darkBlue-500 text-white font-bold text-xs">ENVIAR</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
                    </div>
                </div>

                <div className="w-full rounded-xl mt-16">
                    <div className="flex justify-between">
                        {/* Primeira Div */}
                        <div className="rounded-xl w-48 bg-darkBlue-500">
                            <Image
                                className="border rounded-t-xl"
                                src="/Image/mat1.svg"
                                alt="Material 1"
                                width={192}
                                height={192}
                            />
   
                            
                            <div className="flex justify-between">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">
                                    Conteúdo Eptran
                                </p>
                                <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">
                                    21/07/2024
                                </p>
                            </div>
                            <div className="flex justify-start">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-9 h-6 p-1">
                                    27 PG
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
                                        <Button variant="default" className="h-8 w-8 p-0 ml-2 mt-1 bg-transparent border-0">
                                         <span className="sr-only">Abrir menu</span>
                                        <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="start"
                                            className="text-darkBlue-500 font-bold">
                                            <DropdownMenuItem>
                                                <SquarePen className="mr-2 h-4 w-4" />
                                                 <Dialog>
      <DialogTrigger asChild>
    <Button variant="ghost" className="p-0">Editar Usuário</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] w-full">
        <DialogHeader>
          <DialogTitle className="text-[40px] font-bold text-darkBlue-500">Adicionar Conteúdo</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid">
            <Label htmlFor="link" className="text-xs font-bold text-darkBlue-600">
              LINK DO CONTEÚDO
            </Label>
            <Input id="link" className="border-darkBlue-400" placeholder="http://sia.com.br" />
          </div>
          <div className="grid">
            <Label htmlFor="name" className="text-xs font-bold text-darkBlue-600">
              NOME DO CONTEÚDO
            </Label>
            <Input id="name" className="border-darkBlue-400" placeholder="Nome conteúdo EPTRAN" />
          </div>
          <div className="grid">
            <Label htmlFor="description" className="text-xs font-bold text-darkBlue-600">
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
            <Label htmlFor="classification" className="text-xs font-bold text-darkBlue-600 block">
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
              <Button variant="outline" className="w-full border-darkBlue-400 font-bold text-xs hover:bg-slate-200">CANCELAR</Button>
            </DialogClose>
            <Button type="submit" className="w-full bg-darkBlue-500 text-white font-bold text-xs">ENVIAR</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

                                                
      
                                                    
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Trash className="mr-2 h-4 w-4" />
                                                
                                            <Button variant="ghost" className="p-0">Excluir Usuário</Button>
      
                                            </DropdownMenuItem>
                                           
                                        </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <div className="rounded-xl w-48 bg-darkBlue-500">
                            <Image
                                className="border rounded-t-xl"
                                src="/Image/mat1.svg"
                                alt="Material 1"
                                width={192}
                                height={192}
                            />
                            <div className="flex justify-between">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">
                                    Conteúdo Eptran
                                </p>
                                <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">
                                    21/07/2024
                                </p>
                            </div>
                            <div className="flex justify-start">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-9 h-6 p-1">
                                    27 PG
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">
                                    EF
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">
                                    207 MB
                                </p>
                            </div>
                            <div className="flex">
                                <button className="cursor-pointer">
                                    <Image
                                        className="w-8 mt-2 ml-3"
                                        src="/Image/pontinhos.svg"
                                        alt="Opções"
                                        width={32}
                                        height={32}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="rounded-xl w-48 bg-darkBlue-500">
                            <Image
                                className="border rounded-t-xl"
                                src="/Image/mat1.svg"
                                alt="Material 1"
                                width={192}
                                height={192}
                            />
                            <div className="flex justify-between">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">
                                    Conteúdo Eptran
                                </p>
                                <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">
                                    21/07/2024
                                </p>
                            </div>
                            <div className="flex justify-start">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-9 h-6 p-1">
                                    27 PG
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">
                                    EF
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">
                                    207 MB
                                </p>
                            </div>
                            <div className="flex">
                                <button className="cursor-pointer">
                                    <Image
                                        className="w-8 mt-2 ml-3"
                                        src="/Image/pontinhos.svg"
                                        alt="Opções"
                                        width={32}
                                        height={32}
                                    />
                                </button>
                            </div>
                        </div>

                        

                        

                        {/* Segunda Div */}
                        <div className="rounded-xl w-48 bg-darkBlue-500">
                            <Image
                                className="border rounded-t-xl"
                                src="/Image/mat1.svg"
                                alt="Material 1"
                                width={192}
                                height={192}
                            />
                            <div className="flex justify-between">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">
                                    Conteúdo Eptran
                                </p>
                                <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">
                                    21/07/2024
                                </p>
                            </div>
                            <div className="flex justify-start">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-9 h-6 p-1">
                                    27 PG
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">
                                    EF
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">
                                    207 MB
                                </p>
                            </div>
                            <div className="flex">
                                <button className="cursor-pointer">
                                    <Image
                                        className="w-8 mt-2 ml-3"
                                        src="/Image/pontinhos.svg"
                                        alt="Opções"
                                        width={32}
                                        height={32}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Terceira Div */}
                        <div className="rounded-xl w-48 bg-darkBlue-500">
                            <Image
                                className="border rounded-t-xl"
                                src="/Image/mat1.svg"
                                alt="Material 1"
                                width={192}
                                height={192}
                            />
                            <div className="flex justify-between">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">
                                    Conteúdo Eptran
                                </p>
                                <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">
                                    21/07/2024
                                </p>
                            </div>
                            <div className="flex justify-start">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-9 h-6 p-1">
                                    27 PG
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">
                                    EM
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">
                                    207 MB
                                </p>
                            </div>
                            <div className="flex">
                                <button className="cursor-pointer">
                                    <Image
                                        className="w-8 mt-2 ml-3"
                                        src="/Image/pontinhos.svg"
                                        alt="Opções"
                                        width={32}
                                        height={32}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Quarta Div */}
                        <div className="rounded-xl w-48 bg-darkBlue-500">
                            <Image
                                className="border rounded-t-xl"
                                src="/Image/mat1.svg"
                                alt="Material 1"
                                width={192}
                                height={192}
                            />
                            <div className="flex justify-between">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">
                                    Conteúdo Eptran
                                </p>
                                <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">
                                    21/07/2024
                                </p>
                            </div>
                            <div className="flex justify-start">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-9 h-6 p-1">
                                    27 PG
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">
                                    EM
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">
                                    207 MB
                                </p>
                            </div>
                            <div className="flex">
                                <button className="cursor-pointer">
                                    <Image
                                        className="w-8 mt-2 ml-3"
                                        src="/Image/pontinhos.svg"
                                        alt="Opções"
                                        width={32}
                                        height={32}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full rounded-xl mt-16">
                    <div className="flex justify-between">
                        {/* Primeira Div */}
                        <div className="rounded-xl w-48 bg-darkBlue-500">
                            <Image
                                className="border rounded-t-xl"
                                src="/Image/mat1.svg"
                                alt="Material 1"
                                width={192}
                                height={192}
                            />
                            <div className="flex justify-between">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">
                                    Conteúdo Eptran
                                </p>
                                <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">
                                    21/07/2024
                                </p>
                            </div>
                            <div className="flex justify-start">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-9 h-6 p-1">
                                    27 PG
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">
                                    EM
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">
                                    207 MB
                                </p>
                            </div>
                            <div className="flex">
                                <button className="cursor-pointer">
                                    <Image
                                        className="w-8 mt-2 ml-3"
                                        src="/Image/pontinhos.svg"
                                        alt="Opções"
                                        width={32}
                                        height={32}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="rounded-xl w-48 bg-darkBlue-500">
                            <Image
                                className="border rounded-t-xl"
                                src="/Image/mat1.svg"
                                alt="Material 1"
                                width={192}
                                height={192}
                            />
                            <div className="flex justify-between">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">
                                    Conteúdo Eptran
                                </p>
                                <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">
                                    21/07/2024
                                </p>
                            </div>
                            <div className="flex justify-start">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-9 h-6 p-1">
                                    27 PG
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">
                                    EF
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">
                                    207 MB
                                </p>
                            </div>
                            <div className="flex">
                                <button className="cursor-pointer">
                                    <Image
                                        className="w-8 mt-2 ml-3"
                                        src="/Image/pontinhos.svg"
                                        alt="Opções"
                                        width={32}
                                        height={32}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="rounded-xl w-48 bg-darkBlue-500">
                            <Image
                                className="border rounded-t-xl"
                                src="/Image/mat1.svg"
                                alt="Material 1"
                                width={192}
                                height={192}
                            />
                            <div className="flex justify-between">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">
                                    Conteúdo Eptran
                                </p>
                                <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">
                                    21/07/2024
                                </p>
                            </div>
                            <div className="flex justify-start">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-9 h-6 p-1">
                                    27 PG
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">
                                    EF
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">
                                    207 MB
                                </p>
                            </div>
                            <div className="flex">
                                <button className="cursor-pointer">
                                    <Image
                                        className="w-8 mt-2 ml-3"
                                        src="/Image/pontinhos.svg"
                                        alt="Opções"
                                        width={32}
                                        height={32}
                                    />
                                </button>
                            </div>
                        </div>

                        

                        

                        {/* Segunda Div */}
                        <div className="rounded-xl w-48 bg-darkBlue-500">
                            <Image
                                className="border rounded-t-xl"
                                src="/Image/mat1.svg"
                                alt="Material 1"
                                width={192}
                                height={192}
                            />
                            <div className="flex justify-between">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">
                                    Conteúdo Eptran
                                </p>
                                <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">
                                    21/07/2024
                                </p>
                            </div>
                            <div className="flex justify-start">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-9 h-6 p-1">
                                    27 PG
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">
                                    EF
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">
                                    207 MB
                                </p>
                            </div>
                            <div className="flex">
                                <button className="cursor-pointer">
                                    <Image
                                        className="w-8 mt-2 ml-3"
                                        src="/Image/pontinhos.svg"
                                        alt="Opções"
                                        width={32}
                                        height={32}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Terceira Div */}
                        <div className="rounded-xl w-48 bg-darkBlue-500">
                            <Image
                                className="border rounded-t-xl"
                                src="/Image/mat1.svg"
                                alt="Material 1"
                                width={192}
                                height={192}
                            />
                            <div className="flex justify-between">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">
                                    Conteúdo Eptran
                                </p>
                                <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">
                                    21/07/2024
                                </p>
                            </div>
                            <div className="flex justify-start">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-9 h-6 p-1">
                                    27 PG
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">
                                    EM
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">
                                    207 MB
                                </p>
                            </div>
                            <div className="flex">
                                <button className="cursor-pointer">
                                    <Image
                                        className="w-8 mt-2 ml-3"
                                        src="/Image/pontinhos.svg"
                                        alt="Opções"
                                        width={32}
                                        height={32}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Quarta Div */}
                        <div className="rounded-xl w-48 bg-darkBlue-500">
                            <Image
                                className="border rounded-t-xl"
                                src="/Image/mat1.svg"
                                alt="Material 1"
                                width={192}
                                height={192}
                            />
                            <div className="flex justify-between">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">
                                    Conteúdo Eptran
                                </p>
                                <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">
                                    21/07/2024
                                </p>
                            </div>
                            <div className="flex justify-start">
                                <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-9 h-6 p-1">
                                    27 PG
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">
                                    EM
                                </p>
                                <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">
                                    207 MB
                                </p>
                            </div>
                            <div className="flex">
                                <button className="cursor-pointer">
                                    <Image
                                        className="w-8 mt-2 ml-3"
                                        src="/Image/pontinhos.svg"
                                        alt="Opções"
                                        width={32}
                                        height={32}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           
                
        </main>
    );
}

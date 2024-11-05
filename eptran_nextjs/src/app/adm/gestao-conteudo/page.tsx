"use client";

import { Material } from "@/@types/Material"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Copy, Link } from "lucide-react";
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
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,

  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import Card from "./card-conteudo";

export default function Conteudo() {
  const { materiais, loading, error } = useMateriais();
  const [escolaridade, setEscolaridade] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [materialLink, setMaterialLink] = useState("");
  const { addMaterial } = useAddMaterial();

  const handleAddMaterial = () => {
    const newMaterial: Material = {
      escolaridade,
      titulo,
      descricao,
      materialLink,
    };
    console.log(newMaterial)

    addMaterial(newMaterial);

    // Limpar os campos do diálogo
    setEscolaridade("");
    setTitulo("");
    setDescricao("");
    setMaterialLink("");
  };

  return (
    <main className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8 sm:mb-0">
        <Image
          className="bg-darkBlue-500 rounded-lg h-14 w-14 mb-4 sm:mb-0 sm:mr-4"
          src="/Image/livro.svg"
          alt="Livro"
          width="56"
          height="56"
        />
        <h1 className="text-darkBlue-500 font-bold text-3xl sm:text-4xl lg:text-5xl text-center sm:text-left">
          Gestão de Conteúdo
        </h1>
      </div>

      <div className="mt-8 sm:mt-12">
        <div className=" flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="relative w-full sm:w-[28vw] max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-darkBlue-500" />
            </div>
            <input
              type="text"
              id="procurar"
              className="font-semibold block w-full h-10 pl-10 text-sm bg-white rounded-lg border border-gray-300 placeholder-darkBlue-300"
              placeholder="Procurar"
            />
          </div>

          <div className="xl:pl-48 flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
            <Select>
              <SelectTrigger className="border-gray-300 border w-full sm:w-52 h-10 text-darkBlue-500 font-bold text-md">
                <SelectValue placeholder="Selecionar" />
              </SelectTrigger>
              <SelectContent className="shadow-xl">
                <SelectItem className="text-darkBlue-500 font-semibold" value="high-school">
                  Ensino Médio
                </SelectItem>
                <SelectItem className="text-darkBlue-500 font-semibold" value="elementary">
                  Ensino Fundamental
                </SelectItem>
                <SelectItem className="text-darkBlue-500 font-semibold" value="early-grades">
                  Séries Iniciais
                </SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="border-gray-300 border w-full sm:w-48 h-10 text-darkBlue-500 font-bold text-md">
                <SelectValue placeholder="Selecionar" />
              </SelectTrigger>
              <SelectContent className="shadow-xl">
                <SelectGroup>
                  <SelectItem className="text-darkBlue-500 font-semibold" value="recent">
                    Mais Recentes
                  </SelectItem>
                  <SelectItem className="text-darkBlue-500 font-semibold" value="older">
                    Mais Antigos
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="lg:pr-14 w-full sm:w-auto">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  className="font-semibold w-full sm:w-52 h-10 shadow-xl flex items-center justify-center bg-darkBlue-500 text-white px-5 rounded-md text-lg"
                >
                  <Image
                    className="w-7 mr-2"
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
                    Adicionar Conteúdo
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid">
                    <Label htmlFor="link" className="text-xs font-bold text-darkBlue-600">
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
                    <Label htmlFor="name" className="text-xs font-bold text-darkBlue-600">
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
                    <Label htmlFor="description" className="text-xs font-bold text-darkBlue-600">
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
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                  <div className="w-full sm:w-[45%]">
                    <Label
                      htmlFor="classification"
                      className="text-xs font-bold text-darkBlue-600 block"
                    >
                      CLASSIFICAÇÃO
                    </Label>
                    <Select
                      value={escolaridade}
                      onValueChange={setEscolaridade}
                    >
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
                  <div className="w-full sm:w-[45%] flex flex-col sm:flex-row justify-end gap-2">
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto border-darkBlue-400 font-bold text-xs hover:bg-slate-200"
                      >
                        CANCELAR
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      className="w-full sm:w-auto bg-darkBlue-500 text-white font-bold text-xs"
                      onClick={handleAddMaterial}
                    >
                      ENVIAR
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="w-full rounded-xl mt-8 sm:mt-16 flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 lg:gap-[70px]">
          {[...Array(12)].map((_, index) => (
            <Card
              key={index}
              src="/Image/mat1.svg"
              alt="imagem"
              conteudo="Conteúdo Eptran"
              data="21/07/2024"
              paginas="27 PG"
              nivel="EM"
              tamanho="207 MB"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
'use client'
import { useState } from "react";
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
import Card from "./card-conteudo"; // Certifique-se de que o caminho está correto
import { useMateriais } from "@/hooks/useMateriais"; // Ajuste o caminho conforme necessário
import useAddMaterial from "@/hooks/useAddMaterial";

export default function Conteudo() {
  const { materiais, isLoading, isError } = useMateriais();
  const [escolaridade, setEscolaridade] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [materialLink, setMaterialLink] = useState("");
  const { addMaterial } = useAddMaterial();
  const handleAddMaterial = () => {
    const newMaterial: Material = {
      id: 0,  // Assumindo que o ID será gerado no backend ou pelo serviço de adição
      escolaridade,
      titulo,
      descricao,
      materialLink,
    };
    console.log(newMaterial);
    addMaterial(newMaterial);
    // Limpar os campos do diálogo
    setEscolaridade("");
    setTitulo("");
    setDescricao("");
    setMaterialLink("");
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
            <Dialog>
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
                    Adicionar Conteúdo
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
                </div>
                <div className="flex items-end justify-between">
                  <div className="w-[45%]">
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
                        <SelectItem value="FUNDAMENTAL">
                          Séries Iniciais
                        </SelectItem>
                        <SelectItem value="MEDIO">Séries Finais</SelectItem>
                        <SelectItem value="SUPERIOR">
                          Ensino Médio
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-[45%] flex justify-end space-x-2">
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        className="w-full border-darkBlue-400 font-bold text-xs hover:bg-slate-200"
                      >
                        CANCELAR
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      className="w-full bg-darkBlue-500 text-white font-bold text-xs"
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

        <div className="w-full rounded-xl mt-16 flex flex-wrap lg:gap-[70px]">
          {isLoading && <p>Carregando materiais...</p>}
          {isError && <p>Erro ao carregar os materiais. Tente novamente.</p>}
          {!isLoading &&
            !isError &&
            materiais.map((material) => (
              <Card
                key={material.id}
                src={"/Image/mat1.svg"} // Use uma imagem específica se necessário
                alt={"imagem"}
                conteudo={material.titulo}
                data={new Date().toLocaleDateString()} // Adapte conforme necessário
                paginas={"27 PG"} // Adapte conforme necessário
                nivel={material.escolaridade}
                tamanho={"207 MB"} // Adapte conforme necessário
              />
            ))}
        </div>
      </div>
    </main>
  );
}

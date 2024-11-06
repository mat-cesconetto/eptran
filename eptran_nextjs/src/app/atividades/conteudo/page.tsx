'use client'
import { Link } from "lucide-react";
import Image from "next/image";
import ConteudoCard from "./conteudo";
import { useMateriais } from "@/hooks/useConteudo";

export default function Conteudo() {
  const { materiais, isLoading, isError } = useMateriais();

  if (isLoading) return <div className="text-center p-4">Carregando conteúdos...</div>;
  if (isError) return <div className="text-center p-4">Erro ao carregar conteúdos</div>;

  return (
    <main className="bg-[url('/bg-conteudo.png')] bg-cover overflow-y-hidden">
      <div className="flex w-96 bg-white rounded-r-xl h-28 mt-10 items-center">
        <Image
          className="bg-darkBlue-500 rounded-lg h-14 w-14 ml-6"
          src="/Image/livros-conteudo.svg"
          alt="Livro"
          width={56}
          height={56}
        />
        <h1 className="text-darkBlue-500 font-bold text-5xl pl-4">Conteúdo</h1>
      </div>

      <div className="pl-24 pt-20 flex gap-36 h-[599px] scroll-px-3 overflow-y-scroll flex-wrap mb-20">
        {materiais.map((material) => (
          <ConteudoCard
            key={material.id}
            title={material.titulo}
            text={material.descricao}
          />
        ))}
      </div>
    </main>
  );
}
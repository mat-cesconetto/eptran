'use client'

import Image from "next/image"
import ConteudoCard from "./conteudo"
import { useMateriais } from "@/hooks/useConteudo"

export default function Conteudo() {
  const { materiais, isLoading, isError } = useMateriais()

  if (isLoading) return <div className="text-center p-4">Carregando conteúdos...</div>
  if (isError) return <div className="text-center p-4">Erro ao carregar conteúdos</div>

  return (
    <main className="bg-[url('/bg-conteudo.png')] bg-cover min-h-screen">
      <div className="flex flex-col sm:flex-row items-center justify-start p-4 sm:p-10">
        <div className="flex items-center bg-white rounded-xl sm:rounded-r-xl p-4 sm:p-6 mb-4 sm:mb-0 w-full sm:w-auto">
          <Image
            className="bg-darkBlue-500 rounded-lg h-10 w-10 sm:h-14 sm:w-14"
            src="/Image/livros-conteudo.svg"
            alt="Livro"
            width={56}
            height={56}
          />
          <h1 className="text-darkBlue-500 font-bold text-3xl sm:text-5xl pl-4">Conteúdo</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-10 overflow-y-auto max-h-[calc(100vh-200px)]">
        {materiais.map((material) => (
          <ConteudoCard
            key={material.id}
            title={material.titulo}
            text={material.descricao}
            link={material.materialLink}
          />
        ))}
      </div>
    </main>
  )
}
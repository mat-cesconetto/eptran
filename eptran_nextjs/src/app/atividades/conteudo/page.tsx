// conteudo.tsx
import ConteudoCard from "./conteudo";
import { useConteudos } from "@/hooks/useConteudo"

export default function Conteudo() {
  const { conteudos, isLoading, isError } = useConteudos();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load contents.</p>;

  return (
    <main className="bg-[url('/bg-conteudo.png')] bg-cover overflow-y-hidden">
      <div className="flex w-96 bg-white rounded-r-xl h-28 mt-10 items-center">
        <h1 className="text-darkBlue-500 font-bold text-5xl pl-4">Conteúdo</h1>
      </div>

      <div className="pl-24 pt-20 flex gap-36 h-[599px] scroll-px-3 overflow-y-scroll flex-wrap mb-20">
        {conteudos.map((conteudo: { id: number; titulo: string; descricao: string }) => (
          <ConteudoCard
            key={conteudo.id}
            title={conteudo.titulo}
            text={conteudo.descricao}
          />
        ))}
      </div>
    </main>
  );
}

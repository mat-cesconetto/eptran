import { Link } from "lucide-react";
import Image from "next/image";
import ConteudoCard from "./conteudo";
import Footer from "@/app/components/ui/footer";

export default function Conteudo() {
  return (
    <main className="bg-[url('/bg-conteudo.png')] bg-cover overflow-y-hidden	">

      {/*colocar flex flex-grow */}
      <div className="flex  w-96 bg-white rounded-r-xl h-28 mt-10 items-center ">
        <Image
          className="bg-darkBlue-500 rounded-lg h-14 w-14 ml-6 "
          src="/Image/livros-conteudo.svg"
          alt="Livro"
          width={56}
          height={56}
        />
        <h1 className="text-darkBlue-500 font-bold text-5xl pl-4 ">Conteúdo</h1>
      </div>
      {/* div conteudos */}
      <div className="pl-24 pt-20 flex gap-36 h-[599px] scroll-px-3 overflow-y-scroll flex-wrap mb-20">
        {/* div 1 */}
        <ConteudoCard
          title={"Conteúdo EPTRAN"}
          text={
            "Este conteúdo serve para sla ensinar crianças a não fazer coisa errada no trânsito"
          }
        />
        <ConteudoCard
          title={"Conteúdo EPTRAN"}
          text={
            "Este conteúdo serve para sla ensinar crianças a não fazer coisa errada no trânsito"
          }
        />
        <ConteudoCard
          title={"Conteúdo EPTRAN"}
          text={
            "Este conteúdo serve para sla ensinar crianças a não fazer coisa errada no trânsito"
          }
        />
        <ConteudoCard
          title={"Conteúdo EPTRAN"}
          text={
            "Este conteúdo serve para sla ensinar crianças a não fazer coisa errada no trânsito"
          }
        />
        <ConteudoCard
          title={"Conteúdo EPTRAN"}
          text={
            "Este conteúdo serve para sla ensinar crianças a não fazer coisa errada no trânsito"
          }
        />
        <ConteudoCard
          title={"Conteúdo EPTRAN"}
          text={
            "Este conteúdo serve para sla ensinar crianças a não fazer coisa errada no trânsito"
          }
        />
        <ConteudoCard
          title={"Conteúdo EPTRAN"}
          text={
            "Este conteúdo serve para sla ensinar crianças a não fazer coisa errada no trânsito"
          }
        />
        <ConteudoCard
          title={"Conteúdo EPTRAN"}
          text={
            "Este conteúdo serve para sla ensinar crianças a não fazer coisa errada no trânsito"
          }
        />
      </div>

    </main>
  );
}

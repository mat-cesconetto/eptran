import Image from "next/image";
import Footer from "../components/ui/footer";

export default function Home() {
  return (
    <div className="">
      <div className="flex items-center">
        <div className="flex items-center relative m-10 ml-44">
          <div className="w-14 h-14 bg-[#023859] rounded-xl flex items-center justify-center">
            <Image
              src="/Prize.svg"
              width={42}
              height={42}
              alt="sobre"
              className="m-2"
            />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-[#023859]">Sobre Nós</h1>
      </div>
      <div className="relative p-16">
        <div className="absolute -top-[10%] left-[750px] w-[1000px] h-[600px] bg-gray-300 rounded-lg"></div>
        <div className="w-[680px] h-96 bg-[#023859] ml-64 rounded-xl relative z-10">
          <h1 className="p-16 pb-10 w-full font-semibold text-white text-4xl">
            Nossa Missão
          </h1>
          <div className="w-[552px] ml-16 h-0.5 bg-white mb-4"></div>
          <p className="pl-16 w-[615px] text-justify">
            A Escola de Trânsito Eptran tem a missão de educar motoristas,
            pedestres e ciclistas para garantir um trânsito mais seguro. Com
            foco em informação e formação prática, oferecemos cursos e palestras
            sobre regras de trânsito, direção defensiva e prevenção de
            acidentes. Nossa equipe experiente promove uma cultura de respeito e
            responsabilidade, preparando cidadãos conscientes para os desafios
            do trânsito diário.
          </p>
        </div>
      </div>
      <div className="mt-24 mb-36 flex">
        <Image
          src="/eptran-team.svg"
          width={350}
          height={350}
          alt="sobre"
          className="ml-44"
        />
        <Image
          src="/eptran-team.svg"
          width={350}
          height={350}
          alt="sobre"
          className="ml-10"
        />
        <Image
          src="/eptran-team.svg"
          width={350}
          height={350}
          alt="sobre"
          className="ml-10"
        />
        <Image
          src="/eptran-team.svg"
          width={350}
          height={350}
          alt="sobre"
          className="ml-10"
        /> 
      </div>

      <Footer />
    </div>
  );
}

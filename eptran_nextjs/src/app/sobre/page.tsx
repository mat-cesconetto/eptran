import Image from "next/image";
import Footer from "../components/ui/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center p-4 sm:p-10 sm:ml-44">
        <div className="flex items-center justify-center w-14 h-14 bg-[#023859] rounded-xl mr-4">
          <Image
            src="/Prize.svg"
            width={42}
            height={42}
            alt="sobre"
            className="m-2"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#023859]">Sobre Nós</h1>
      </div>

      <div className="relative p-4 sm:p-16">
        <div className="hidden lg:block absolute -top-[5%] left-[25%]  w-[60%] h-[500px] bg-gray-300 rounded-lg"></div>
        <div className="w-full max-w-[680px] bg-[#023859] mx-auto lg:ml-64 rounded-xl relative z-10 p-6 sm:p-16">
          <h1 className="font-semibold text-white text-3xl sm:text-4xl mb-6">
            Nossa Missão
          </h1>
          <div className="w-full h-0.5 bg-white mb-4"></div>
          <p className="text-white text-sm sm:text-base text-justify">
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

      <div className="mt-12 sm:mt-24 mb-12 sm:mb-36 flex flex-wrap justify-center gap-4 sm:gap-10">
        {[1, 2, 3, 4].map((index) => (
          <Image
            key={index}
            src="/eptran-team.svg"
            width={350}
            height={350}
            alt={`Equipe Eptran ${index}`}
            className="w-full max-w-[250px] sm:max-w-[350px] h-auto"
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}
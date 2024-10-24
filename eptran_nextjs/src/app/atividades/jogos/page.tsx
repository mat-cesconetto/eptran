import Footer from "@/app/components/ui/footer";
import Image from "next/image";
import { Micro_5 } from "next/font/google";
import Link from "next/link";
import Game from "./game";

const micro5 = Micro_5({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full flex-grow bg-left lg:bg-bottom bg-[url('/fundo-jogos.png')] bg-cover lg:flex-row justify-between h-auto lg:h-screen">
        <div className="bg-white w-full lg:w-1/5 h-20 mt-4 lg:mt-10 flex items-center">
          <div className="bg-[#023859] w-12 lg:w-1/5 h-12 lg:h-3/4 mt-0 lg:mt-2 ml-4 lg:ml-10 rounded-xl flex items-center justify-center">
            <Image
              src="/control.svg"
              width={55}
              height={70}
              alt="verde"
              className="m-auto w-8 h-8 lg:w-auto lg:h-auto"
            />
          </div>
          <h1 className="ml-4 lg:ml-10 mt-0 lg:mt-5 text-[#023859] font-bold text-2xl lg:text-4xl">
            Jogos
          </h1>
        </div>
        <div className="px-4 lg:pl-24 w-full flex flex-wrap justify-center lg:justify-start">
          <Game imageUrl="/quiz.png" title="Quiz Eptran" />
          <Game imageUrl="/travessia.png" title="Jogo da Travessia" />
          <Game imageUrl="/forca.png" title="Jogo da Forca" />
          <Game imageUrl="/desvio.png" title="Jogo do Desvio" />
          <Game imageUrl="/memoria.png" title="Jogo da Memória" />
          <Game imageUrl="/1cruzada.png" title="Palavras Cruzadas" />
          <Game imageUrl="/caca.png" title="Caça Palavras" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
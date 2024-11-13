"use client"

import Footer from "@/app/components/ui/footer";
import Image from "next/image";
import { Micro_5 } from "next/font/google";
import Game from "./game";
import { useUser } from "@/hooks/useUserData";

const micro5 = Micro_5({
  weight: "400",
  subsets: ["latin"],
});

interface GameData {
  imageUrl: string;
  title: string;
  href: string;
  escolaridade: string; // Educational level filter
}

const gamesData: GameData[] = [
  { imageUrl: "/quizzI.webp", title: "Quiz Geral", href: "./jogos/QuizzI", escolaridade: "ENSINO_MEDIO" },
  { imageUrl: "/quizzII.png", title: "Quiz das Placas", href: "./jogos/QuizzII", escolaridade: "ENSINO_MEDIO" },
  { imageUrl: "/travessia.png", title: "Jogo da Travessia", href: "./jogos/travessia", escolaridade: "ENSINO_MEDIO" },
  { imageUrl: "/Forca.png", title: "Jogo da Forca", href: "./jogos/forca", escolaridade: "ENSINO_MEDIO" },
  { imageUrl: "/transito_maluco.png", title: "Trânsito Maluco", href: "./jogos/TransitoMaluco", escolaridade: "ENSINO_MEDIO" },
  { imageUrl: "/memoria.png", title: "Jogo da Memória", href: "./jogos/jogoDaMemoria", escolaridade: "ENSINO_MEDIO" },
  { imageUrl: "/VouF.png", title: "Verdadeiro ou Falso", href: "./jogos/verdadeiroOuFalso", escolaridade: "ENSINO_MEDIO" },
  { imageUrl: "/caca.png", title: "Caça Palavras", href: "./jogos/cacaPalavras", escolaridade: "ENSINO_MEDIO" },
  { imageUrl: "/jogoDescrever.png", title: "Descreva a Imagem", href: "./jogos/jogoTransito", escolaridade: "ENSINO_MEDIO" },
  { imageUrl: "/sem_freio.png", title: "Sem Freio", href: "./jogos/semFreio", escolaridade: "ENSINO_MEDIO" },
];

export default function Home() {
  const { userEscolaridade, isLoading } = useUser();

  // Filter games based on the user's educational level
  const filteredGames = gamesData.filter(game => game.escolaridade === userEscolaridade);

  return (
    <div className="min-h-screen flex flex-col bg-[url('/fundo-jogos.png')] bg-cover">
      <div className="w-full flex-grow bg-left lg:bg-bottom lg:flex-row justify-between h-auto lg:h-screen">
        <div className="bg-white w-full lg:w-[18%] rounded-r-xl h-24 mt-4 lg:mt-10 flex items-center">
          <div className="bg-[#023859] w-12 lg:w-[22%] h-12 lg:h-3/4 mt-0 ml-4 lg:ml-10 rounded-xl flex items-center justify-center">
            <Image
              src="/control.svg"
              width={100}
              height={70}
              alt="verde"
              className="m-auto w-8 h-8 lg:w-auto lg:h-auto"
            />
          </div>
          <h1 className="ml-4 lg:ml-10 mt-0 text-[#023859] font-bold text-2xl lg:text-[43px]">
            Jogos
          </h1>
        </div>
        <div className="px-4 lg:pl-24 w-full flex flex-wrap justify-center lg:justify-start">
          {isLoading ? (
            <p>Carregando...</p>
          ) : (
            filteredGames.map(game => (
              <Game key={game.title} imageUrl={game.imageUrl} title={game.title} href={game.href} />
            ))
          )}
        </div>
      </div>
      <div className="mt-[400px]">
        <Footer />
      </div>
    </div>
  );
}

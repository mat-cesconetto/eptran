import Footer from "../components/ui/footer";
import Image from "next/image";
import { Micro_5 } from "next/font/google";
import Link from "next/link";

const micro5 = Micro_5({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full flex-grow bg-left lg:bg-bottom bg-[url('/back1.png')] bg-cover flex flex-col lg:flex-row justify-between h-[calc(100vh-112px)]">
        <div className="w-full lg:w-1/3 h-screen relative order-1 lg:order-1"></div>

        <div className="w-full lg:w-1/3 h-screen relative flex flex-col items-center justify-start lg:justify-start lg:items-start order-2 lg:order-2 mt-8 lg:pt-0">
          <Link href={"./atividades/jogos"}>
            <Image
              src="/placa-red.png"
              width={402}
              height={402}
              alt="vermelho"
              className="lg:absolute lg:top-[23%] -translate-y-8 z-10 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:translate-y-[-10px] object-contain mb-4 lg:mb-0"
            />
          </Link>
          <Link href={"./atividades/videos"}>
            <Image
              src="/placa-yel.png"
              width={402}
              height={402}
              alt="amarelo"
              className="lg:absolute lg:top-2 -translate-y-10 z-10 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:translate-y-[-10px] object-contain mb-4 lg:mb-0"
            />
          </Link>
          <Link href={"./atividades/conteudo"}>
            <Image
              src="/placa-green.png"
              width={402}
              height={402}
              alt="verde"
              className="lg:absolute lg:top-2/3 -translate-y-12 z-10 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:translate-y-[-10px] object-contain"
            />
          </Link>
          <Image
            src="/placa-ativ1.png"
            width={402}
            height={402}
            alt="placa"
            className="absolute top-0 lg:top-1/4 -translate-y-10"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
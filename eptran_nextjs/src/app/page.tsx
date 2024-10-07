import Image from "next/image";
import NavBar from "./components/ui/navbar";
import Footer from "./components/ui/footer";
import Placa from "./placa";

export default function Home() {
  return (
    <div className="bg-neutral-100">
      <NavBar />
      <div className="relative h-[400px] sm:h-[500px] md:h-[607px] bg-[url('/joinville2.svg')] bg-cover bg-center opacity-90">
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-100 via-neutral-100/100 to-transparent"></div>
        <div className="relative z-10 flex justify-center">
          <h1 className="text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mt-24 sm:mt-32 md:mt-48">
            Ensinando para <br /> salvar{" "}
            <span className="text-[#FFE500] relative">
              vidas!
              <Image
                src="/sublinhado.svg"
                width={225}
                height={55}
                alt="imagem logo"
                className="absolute left-1/2 transform -translate-x-1/2 w-3/4 sm:w-full"
              />
            </span>
          </h1>
        </div>
      </div>
      <Placa />
      <Footer />
    </div>
  );
}
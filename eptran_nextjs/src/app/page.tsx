import Image from "next/image";
import NavBar from "./components/ui/navbar";
import Footer from "./components/ui/footer";

export default function Home() {
  return (
    <div className="bg-neutral-100">
      <NavBar />
      <div className="relative h-[1007px] bg-[url('/joinville.svg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-400 to-neutral-0"></div>
        <div className="relative z-10 flex justify-center h-full">
          <h1 className="text-black text-8xl text-center mt-24">Ensinando para <br></br> salvar vidas!</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}

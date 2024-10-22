import Footer from "../components/ui/footer";
import Image from "next/image";
import { Micro_5 } from "next/font/google";

const micro5 = Micro_5({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="">
      <div className="w-full h-screen flex bg-bottom  bg-[url('/back.png')] bg-cover">
        <div className="w-1/3 hg-screen relative">
          <Image
            src="/trofeu.png"
            width={302}
            height={302}
            alt="trofeu"
            className="absolute bottom-0 ml-60 transition-transform duration-300 ease-in-out hover:scale-110 hover:translate-y-[-10px] object-contain cursor-pointer trofeu-image"
          />

          <h1
            className={`text-black text-7xl absolute top-[580px] ml-[344px] ${micro5.className} trofeu-text transition-transform duration-300 ease-in-out`}
          >
            9/16
          </h1>
        </div>
        <div className="w-1/3 hg-screen flex">
          <Image
            src="/foca.png"
            width={302}
            height={302}
            alt="foca"
            className="absolute bottom-0 -mb-24 ml-20"
          />
        </div>
        <div className="relative w-1/3 h-screen">
          <div className="w-96 h-32 absolute ml-4 top-1/3 cursor-pointer z-10"></div>
          <div className="w-96 h-32 absolute  mt-2 top-1/2 cursor-pointer z-10"></div>
          <div className="w-96 h-32 absolute top-3/4 -mt-14 cursor-pointer z-10"></div>
          <Image
            src="/placa-ativ1.png"
            width={402}
            height={402}
            alt="placa"
            className="absolute top-1/3"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

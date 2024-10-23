import Footer from "../components/ui/footer"
import Image from "next/image"
import { Micro_5 } from "next/font/google"

const micro5 = Micro_5({
  weight: "400",
  subsets: ["latin"],
})

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full flex-grow bg-left lg:bg-bottom bg-[url('/back1.png')] bg-cover flex flex-col lg:flex-row justify-between h-[calc(130vh)] lg:h-screen">
        <div className="w-full lg:w-1/3 h-screen relative order-1 lg:order-1">
          <Image
            src="/trofeu.png"
            width={302}
            height={302}
            alt="trofeu"
            className="absolute lg:bottom-20 left-1/2 transform bottom-4 -translate-x-1/2 lg:translate-x-0 transition-transform duration-300 ease-in-out hover:scale-110 hover:translate-y-[-10px] object-contain cursor-pointer trofeu-image"
          />

          <h1
            className={`text-black text-[80px] absolute bottom-1/2 lg:bottom-1/2 lg:top-1/2 lg:ml-24  left-1/2 transform -translate-x-1/2 lg:translate-x-0 ${micro5.className} trofeu-text transition-transform duration-300 ease-in-out`}
          >
            9/16
          </h1>
        </div>

        <div className="w-full lg:w-1/3 h-screen relative flex flex-col items-center justify-start lg:justify-start lg:items-start order-2 lg:order-2 mt-8 lg:pt-0">
          <Image
            src="/placa-red.png"
            width={402}
            height={402}
            alt="vermelho"
            className="lg:absolute lg:top-1/3 mt-0 lg:mt-0 z-10 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:translate-y-[-10px] object-contain mb-4 lg:mb-0"
          />
          <Image
            src="/placa-yel.png"
            width={402}
            height={402}
            alt="amarelo"
            className="lg:absolute lg:top-1/2 lg:mt-2 mt-4 z-10 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:translate-y-[-10px] object-contain mb-4 lg:mb-0"
          />
          <Image
            src="/placa-green.png"
            width={402}
            height={402}
            alt="verde"
            className="lg:absolute lg:top-3/4 lg:-mt-14 mt-6 lg:mr-2 z-10 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:translate-y-[-10px] object-contain"
          />
          <Image
            src="/placa-ativ1.png"
            width={402}
            height={402}
            alt="placa"
            className="absolute top-0 lg:top-1/3"
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}
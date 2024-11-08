import { Link } from "lucide-react"
import Footer from "./components/ui/footer"
import Placa from "./placa"

export default function Home() {
  return (
    <div className="bg-neutral-100 min-h-screen flex flex-col">
      <div className="relative grid grid-rows-[auto_1fr_auto] h-[400px] sm:h-[500px] md:h-[880px] bg-[url('/joinville.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <div></div>
        <div className="relative z-20 flex justify-center items-end">
          <div className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[558px] md:h-[558px]">
          <Placa />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
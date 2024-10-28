import * as React from "react"
import { Video } from "lucide-react"
import Footer from "@/app/components/ui/footer"

export default function Component() {
  return (
    <main>
    <div className="container mx-auto px-4 pt-10 mb-40">
      {/* Título */}
      <div className="mb-6">
        <div className="text-2xl font-bold text-darkBlue-500 flex items-center">
          <span className="bg-darkBlue-500 text-white p-2 rounded-md mr-2">
            <Video className="h-6 w-6" />
          </span>
          Vídeos
        </div>
      </div>

      {/* Seção de vídeo principal e lista de vídeos */}
      <div className="flex flex-col md:flex-row gap-16 border-solid">
        {/* Vídeo principal */}
        <div className="w-full md:w-2/3">
          <div className="bg-gray-900 aspect-video rounded-[20px] mb-4">
          <iframe src="https://www.youtube.com/watch?v=6ixvM3Cez_E" title="video" className="w-full h-full"></iframe>
          </div>
          <div className="text-xl font-semibold text-blue-900">
            Eptran: Como ter uma vida segura
          </div>
          <p className="text-sm text-gray-600">
            Nesse vídeo o eptran ensinará a como ter uma vida mais segura, respeitando as leis de trânsito.
          </p>
        </div>

        {/* Lista de vídeos à direita */}
        <div className="w-full h-[470px] md:w-1/2 space-y-4 scroll-m-1 overflow-y-scroll">
          {[
            { title: "Segurança no Trânsito", series: "Séries Iniciais" },
            { title: "Legislação nas Ruas", series: "Séries Iniciais" },
            { title: "Direito do Pedestre", series: "Séries Iniciais" },
            { title: "Direito do Pedestre", series: "Séries Iniciais" },
            
          ].map((video, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-[270px]">
                <div className="bg-gray-900 aspect-video rounded-[20px] border-solid"></div>
              </div>
              <div className="w-3/5">
                <div className="text-base text-darkBlue-400 mb-1 font-bold text-">{video.series}</div>
                <div className="text-[25px] font-bold text-darkBlue-500">{video.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
    <Footer></Footer>
    </main>
  )
}
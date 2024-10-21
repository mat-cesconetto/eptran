import { Button } from "@nextui-org/react"
import Image from "next/image"

export default function Suporte() {
  return (
    <div className="flex min-h-screen bg-white">
      
      <main className="flex-1 p-4 md:p-8 mt-40">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-darkBlue-500 font-bold text-2xl md:text-3xl mb-4">ARQUIVO</h1>
          <hr className="bg-darkBlue-500 w-full border-1 border-darkBlue-500 rounded-full mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-6">
              <section>
                <h2 className="font-semibold text-xl text-darkBlue-500 mb-2">DESCRIÇÃO</h2>
                <hr className="bg-darkBlue-400 w-full border-1 border-darkBlue-500 rounded-full mb-4" />
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-md text-darkBlue-500 mb-2">NOME DO VÍDEO</h3>
                    <input 
                      type="text" 
                      className="border-darkBlue-300 border-2 rounded-md h-12 w-full max-w-md p-3" 
                      placeholder="Vídeo Educativo EPTRAN"
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-md text-darkBlue-500 mb-2">DESCRIÇÃO DO VÍDEO</h3>
                    <textarea 
                      className="border-2 border-darkBlue-300 rounded-md w-full max-w-md resize-none p-3" 
                      name="descricao" 
                      id="Descricao" 
                      rows={4} 
                      placeholder="Vídeo Educativo Eptran"
                    ></textarea>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-md text-darkBlue-500 mb-2">MINIATURA</h3>
                <div className="w-40 h-28 border-dashed border-2 border-darkBlue-300 rounded-lg flex flex-col justify-center items-center">
                  <Image src="/Image/docs.svg" width={40} height={40} alt="Upload icon" className="mb-2" />
                  <p className="text-darkBlue-400 text-center text-[10px]">Fazer upload do arquivo</p>
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-md text-darkBlue-500 mb-2">CLASSIFICAÇÃO</h3>
                <select
                  className="text-darkBlue-300 block font-semibold p-2 text-sm shadow-md rounded-lg cursor-pointer border-2 border-darkBlue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full max-w-xs"
                  name="selecionar"
                >
                  <option className="text-darkBlue-300" value="selecionar" disabled selected>Selecionar</option>
                  <option className="text-darkBlue-500" value="ensino-medio">Ensino Médio</option>
                  <option className="text-darkBlue-500" value="ensino-fundamental">Ensino Fundamental</option>
                  <option className="text-darkBlue-500" value="series-iniciais">Séries Iniciais</option>
                </select>
              </section>
            </div>

            <div className="space-y-6 flex flex-col justify-between">
              <section>
                <h2 className="text-xl font-semibold text-darkBlue-500 mb-2">CONTEÚDO</h2>
                <hr className="bg-darkBlue-400 w-full border-1 border-darkBlue-500 rounded-full mb-4" />
                
                <div className="space-y-4">
                  <div className="w-full max-w-md h-56 bg-darkBlue-400 rounded-md"></div>
                  
                  <h3 className="text-darkBlue-500 font-semibold text-sm">67% CONCLUÍDO</h3>
                  <br>
                  </br>
                  <div className="flex flex-wrap gap-4 text-darkBlue-500 font-semibold text-sm items-start space-x-20 ">
                    <div>
                      <p className="text-xs font-bold">ARQUIVO</p>
                      <p className="text-black text-sm">arquivo.mp4</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold">PÁGINAS</p>
                      <p className="text-black text-sm">27</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold">TAMANHO</p>
                      <p className="text-black text-sm">370 MB</p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-darkBlue-500 text-white font-semibold py-2 px-6 rounded-md">ENVIAR</Button>
                <Button className="border border-darkBlue-500 bg-white text-darkBlue-500 font-semibold py-2 px-6 rounded-md">CANCELAR</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
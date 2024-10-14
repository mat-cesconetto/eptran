export default function Suporte() {
  return (
<main className="w-auto h-screen ml-60 pl-14 pt-36 pr-10">
    <h1 className="flex text-darkBlue-500 font-bold justify-start text-3xl pl-10 pt-10">ARQUIVO</h1>
    <hr className="bg-darkBlue-500 w-auto my-4 border-1 border-darkBlue-500 rounded-full ml-10" />

    <div className="px-10 grid grid-cols-2 gap-10 pt-10">
      <div className="col-span-1">
        <h2 className="font-semibold mt-1 text-darkBlue-500 text-xl">DESCRIÇÂO</h2>
        <hr className="bg-darkBlue-400 w-[600px] border-1 border-darkBlue-500 rounded-full"/>
        <br/>
          <h3 className="font-semibold mt-1 text-darkBlue-500 text-md">NOME DO VÍDEO</h3>
            <div className="w-auto">
              <input type="text" className="border-darkBlue-500 border-2 rounded-md h-12 w-96" placeholder="  Vídeo Educativo EPTRAN"/>
            </div>
            <h3 className="font-semibold mt-8 text-darkBlue-500 text-md">DESCRIÇÃO DO VÍDEO</h3>
            <div className="w-auto">
              <textarea className="border-2 border-darkBlue-400 rounded-md w-96 resize-none" name="descricao" id="Descricao" rows={4} placeholder="  Vídeo Educativo Eptran"></textarea>
            </div>
          <h3 className="font-semibold text-darkBlue-500 text-md mt-4">MINIATURA</h3>

          <div className="w-40 h-28 border-dashed border-2 border-darkBlue-300 rounded-lg flex flex-col justify-center items-center">
            <img src="../img/docs.png" className="w-10 h-10 mb-2" />
            <p className="text-darkBlue-400 text-center text-[10px]">Fazer upload do arquivo</p>
        </div>
        <div>
            <h3 className="font-semibold mt-8 text-darkBlue-500 text-md">classNameIFICAÇÃO</h3>
            <select
    className="text-darkBlue-300 block font-semibold p-2 text-sm shadow-md rounded-lg mb-6 cursor-pointer border-2 border-darkBlue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-60"
    name="selecionar">
    <option className="text-darkBlue-300" value="selecionar" selected>Selecionar</option>
    <option className="text-darkBlue-500" value="user-ativo">Ensino Médio</option>
    <option className="text-darkBlue-500" value="user-ativo">Ensino Fundamental</option>
    <option className="text-darkBlue-500" value="user-inativo">Séries Iniciais</option>
</select>

        </div>
        
      </div>
    <div className="col-span-1">
      <h2 className="text-xl font-semibold ml-20 text-darkBlue-500">VÍDEO</h2>
      <hr className="bg-darkBlue-400 w-[690px] border-1 border-darkBlue-500 rounded-full ml-20" />
      <br/>

      <div className="">
      <div className="w-96 h-56 bg-darkBlue-400 rounded-md ml-20"></div>
    
      <h1 className="text-darkBlue-500 mt-2 font-semibold text-sm ml-20">67% CONCLUÍDO</h1>
      
      <div className="flex mt-4 text-darkBlue-500 font-semibold text-sm">
          <div>
              <p className="text-xs ml-20">ARQUIVO</p>
              <p className="text-black text-sm ml-20">arquivo.mp4</p>
          </div>
          <div>
              <p className="text-xs ml-20">DURAÇÃO</p>
              <p className="text-black text-sm ml-20">3:07</p>
          </div>
          <div>
              <p className="text-xs ml-20">TAMANHO</p>
              <p className="text-black text-sm ml-20">370 MB</p>
          </div>
      </div>

      <div className="flex justify-start mt-6 gap-4">
          <button className="border border-darkBlue-500 text-darkBlue-500 font-semibold py-2 px-6 rounded-md ml-20">CANCELAR</button>
          <button className="bg-darkBlue-500 text-white font-semibold py-2 px-6 rounded-md">ENVIAR</button>
      </div>
    </div>
  </div>
      

      </div>
 
  </main>
  )
}


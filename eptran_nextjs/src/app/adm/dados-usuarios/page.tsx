import DateAdm from "./date-adm"
import { Button } from "@nextui-org/react";
import Photo from "../../components/ui/photo";
import School from "../../components/ui/school";


export default function DadosUsuarios() {
  return (
    <main className="w-full min-h-screen bg-white p-4 pt-20 lg:mr-80">
      <h1 className="text-darkBlue-500 pl-8 font-bold text-2xl md:text-3xl mb-4">
        Dados Pessoais de USUÁRIO
      </h1>
      <hr className="bg-darkBlue-500 ml-10 w-auto my-4 border-1 border-darkBlue-500 rounded-full" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-auto pl-8 col-span-1 ">
          <h2 className="text-xl font-semibold mb-4">DADOS PESSOAIS</h2>
          <hr className="bg-darkBlue-400 w-auto my-4 border-1 border-darkBlue-500 rounded-full" />
          <DateAdm />
        </div>


        <div className="w-auto pl-8">
          <h2 className="text-xl font-semibold mb-4">FOTO</h2>
          <hr className="bg-darkBlue-400 w-auto my-4 border-1 border-darkBlue-500 rounded-full" />
          <Photo />

          <h2 className="text-xl font-semibold mb-4">ESCOLARIDADE</h2>
          <hr className="bg-darkBlue-400 w-auto my-4 border-1 border-darkBlue-500 rounded-full" />
          <School />
          <div className="mt-10 lg:mt-14 flex flex-col sm:flex-row gap-4">
            <Button className="bg-white text-[#003966] font-bold w-full sm:w-1/3 rounded-md h-10 border border-[#003966]">
              Cancelar
            </Button>
            <Button className="bg-[#003966] text-white font-bold w-full sm:w-1/3 rounded-md h-10">
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

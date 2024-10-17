import { Button } from "@nextui-org/react";
import AlterData from "./form-alter";
import Photo from "./photo";
import School from "./school";

export default function Home() {
  return (
    <div className=" px-32 pt-14">
      <h1 className="text-4xl font-bold text-[#003966]">Dados Pessoais</h1>
      <hr className="w-full bg-black h-0.5" />
      <div className="flex">
        <div className="w-1/2 pr-20 pt-10">
          <h2 className="text-black text-2xl">DADOS PESSOAIS</h2>
          <hr className="w-full bg-black h-0.5 " />
          <AlterData />
        </div>
        <div className="w-1/2 pr-20 pt-10">
          <h2 className="text-black text-2xl">FOTO</h2>
          <hr className="w-full bg-black h-0.5 " />
          <Photo />
          <h2 className="text-black text-2xl mt-10">ESCOLARIDADE</h2>
          <hr className="w-full bg-black h-0.5 " />
          <School />
          <div className="mt-14">
            <Button className="bg-white text-[#003966] font-bold w-1/3 mr-10 rounded-md h-9 sm:h-10 border border-[#003966]">
              Cancelar
            </Button>
            <Button className="bg-[#003966] text-white font-bold w-1/3 rounded-md h-9 sm:h-10">
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

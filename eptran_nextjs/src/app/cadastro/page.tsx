"use client";

import { useState } from "react";
import Formulario from "./form";
import CustomCheckbox from "./checkbox";
import { Button } from "@nextui-org/react";

export default function Home() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex flex-col md:flex-row w-full h-[1000px]">
      <div className="relative w-full md:w-3/6 h-64 md:h-[1000px] bg-[url('/moinho.svg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-t from-[#003966] to-transparent"></div> 
      </div>
      <div className="w-full md:w-3/6 md:h-[937px] flex flex-col items-center justify-center px-4 py-8 md:py-0">
        <div className="w-full md:w-10/12 px-4">
          <h1 className="text-[#003966] font-bold text-4xl md:text-6xl mt-8 md:mt-32">Cadastre-se</h1> 
          <h3 className="text-neutral-400 text-base mt-2 mb-6 md:mb-10">Siga os passos para se cadastrar</h3>
          <Formulario />
          <div className="mt-4 md:mt-7">
            <CustomCheckbox
              label="Concordo com os termos de serviço"
              onChange={(e) => setIsChecked(e.target.checked)}
            />
          </div>
          <Button 
            className="bg-[#003966] text-white w-full h-12 rounded-md mt-6 md:mt-10 font-bold text-lg"
            disabled={!isChecked}
          >
            Cadastrar
          </Button>
        </div>
      </div>
    </div>
  );
}
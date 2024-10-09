"use client";

import { useState } from "react";
import Formulario from "./form";

export default function Home() {
  const [isChecked, setIsChecked] = useState(false);
 
  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      <div className="relative w-full md:w-3/6 h-64 md:h-[840px] bg-[url('/moinho.svg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-t from-[#003966] to-transparent"></div> 
      </div>
      <div className="w-full md:w-3/6 md:h-[840px] flex flex-col items-center justify-center px-4 py-8 md:py-0">
        <div className="w-full md:w-10/12 px-4">
          <h1 className="text-[#003966] font-bold text-2xl md:text-5xl">Cadastre-se</h1> 
          <h3 className="text-neutral-400 text-base mt-2 mb-6 ">Siga os passos para se cadastrar</h3>
          <Formulario />
          <div className="mt-4 md:mt-7">
          </div>
        </div>
      </div>
    </div>
  );
}

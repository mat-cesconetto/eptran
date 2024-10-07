import React from "react";

const Placa: React.FC = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row justify-around items-center sm:items-end gap-12 sm:gap-0 my-12 sm:my-0">
      <div className="flex flex-col items-center mb-12 sm:mb-48">
        <div className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] rotate-45 border-2 border-black rounded-lg bg-red-500 flex justify-center items-center">
          <h1 className="transform -rotate-45 font-bold text-base sm:text-lg text-black">
            SOBRE NÓS
          </h1>
        </div>
        <div className="w-[14px] h-[120px] sm:h-[190px] rounded-xl bg-neutral-500"></div>
      </div>
      <div className="flex flex-col items-center mb-12 sm:mb-24">
        <div className="w-[160px] h-[160px] sm:w-[210px] sm:h-[210px] rotate-45 bg-green-500 border-2 rounded-lg border-black flex justify-center items-center">
          <h1 className="transform -rotate-45 font-bold text-2xl sm:text-3xl text-black">
            JOGAR
          </h1>
        </div>
        <div className="w-[14px] h-[180px] sm:h-[250px] rounded-xl bg-neutral-500"></div>
      </div>
      <div className="flex flex-col items-center mb-12 sm:mb-48">
        <div className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] rotate-45 bg-yellow-500 border-2 rounded-lg border-black flex justify-center items-center">
          <h1 className="transform -rotate-45 font-bold text-sm sm:text-lg text-black">
            FALE CONOSCO
          </h1>
        </div>
        <div className="w-[14px] h-[120px] sm:h-[190px] rounded-xl bg-neutral-500"></div>
      </div>
    </div>
  );
};

export default Placa;
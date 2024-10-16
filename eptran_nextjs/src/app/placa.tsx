import React from "react";
import Image from "next/image";

const Placa: React.FC = () => {
  return (
    <div className="">
      <Image
        src="/placa1.svg"
        width={408}
        height={408}
        alt="imagem placa"
        className="transition-transform duration-300 ease-in-out hover:scale-110 hover:translate-y-[-10px] relative bottom-0"
      />
    </div>
  );
};

export default Placa;

import React from "react"
import Image from "next/image"

export default function Placa() {
  return (
    <div className="w-full h-full max-w-[558px] max-h-[558px]">
      <div className="relative w-full h-full">
        <Image
          src="/placa1.svg"
          fill
          alt="imagem placa"
          className="transition-transform duration-300 ease-in-out hover:scale-110 hover:translate-y-[-10px] object-contain cursor-pointer"
        />
      </div>
    </div>
  )
}
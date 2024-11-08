import React from "react"
import Image from "next/image"
import Link from "next/link" // Importe o Link do Next.js

export default function Placa() {
  return (
    <div className="w-full h-full max-w-[558px] max-h-[558px]">
      <div className="relative w-full h-full">
        <Link href="/atividades/jogos"> {/* Altere para o caminho da página de destino */}
          <a>
            <Image
              src="/placa1.svg"
              fill
              alt="imagem placa"
              className="transition-transform duration-300 ease-in-out hover:scale-110 hover:translate-y-[-10px] object-contain cursor-pointer"
            />
          </a>
        </Link>
      </div>
    </div>
  )
}

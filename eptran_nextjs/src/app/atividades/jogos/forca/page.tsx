"use client"


import React, { useEffect, useState } from 'react'


export default function GamePage() {
  const [isMounted, setIsMounted] = useState(false)


  useEffect(() => {
    setIsMounted(true)
  }, [])


  if (!isMounted) {
    return null // ou um componente de carregamento
  }


  return (
    <div className="relative w-full h-screen">
     
      <iframe
        src="/ForcaOnibus/index.html"
        className="w-full h-full border-none"
        title="Jogo em JavaScript"
      />
    </div>
  )
}
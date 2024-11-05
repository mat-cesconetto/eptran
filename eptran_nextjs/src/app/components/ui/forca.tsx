"use client"

import React, { useState, useEffect, useRef } from 'react'

const palavrasTransito = [
  { palavra: 'semáforo', dica: 'Sinal de trânsito com luzes' },
  { palavra: 'pedestre', dica: 'Pessoa que caminha nas ruas' },
  { palavra: 'sinalização', dica: 'Placas e indicações nas vias' },
  { palavra: 'automóvel', dica: 'Veículo motorizado de quatro rodas' },
  { palavra: 'bicicleta', dica: 'Meio de transporte com duas rodas' },
  { palavra: 'faixa', dica: 'Local onde pedestres atravessam' },
  { palavra: 'capacete', dica: 'Equipamento de segurança para a cabeça' },
  { palavra: 'carona', dica: 'Transporte de um passageiro por um motorista' },
  { palavra: 'transito', dica: 'Movimento de veículos nas vias' },
  { palavra: 'ciclovia', dica: 'Via exclusiva para ciclistas' },
  { palavra: 'motorista', dica: 'Pessoa que dirige um veículo' },
  { palavra: 'estacionamento', dica: 'Lugar destinado ao estacionamento de veículos' },
  { palavra: 'multas', dica: 'Penalizações financeiras por infrações de trânsito' },
  { palavra: 'rotatória', dica: 'Interseção onde os veículos circulam em torno de um ponto central' },
  { palavra: 'tráfego', dica: 'Trânsito lento e congestionado' },
  { palavra: 'trânsito', dica: 'Movimentação de veículos e pedestres nas ruas' }
]

export default function Component() {
  const [palavraEscolhida, setPalavraEscolhida] = useState('')
  const [palavraNormalizada, setPalavraNormalizada] = useState('')
  const [palavraDisplay, setPalavraDisplay] = useState<string[]>([])
  const [dicaEscolhida, setDicaEscolhida] = useState('')
  const [tentativasErradas, setTentativasErradas] = useState(0)
  const [acertos, setAcertos] = useState(0)
  const [totalPalavras, setTotalPalavras] = useState(0)
  const [message, setMessage] = useState('')
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [carroPosicaoX, setCarroPosicaoX] = useState(50)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const carroImageRef = useRef<HTMLImageElement | null>(null)
  const posteImageRef = useRef<HTMLImageElement | null>(null)

  const maxTentativas = 6
  const carroPosicaoY = 120
  const carroLargura = 100
  const carroAltura = 100
  const posteX = 450
  const posteY = 30
  const posteLargura = 120
  const posteAltura = 190

  useEffect(() => {
    const carroImagem = new Image()
    carroImagem.src = '/placeholder.svg?height=100&width=100'
    carroImageRef.current = carroImagem

    const posteImagem = new Image()
    posteImagem.src = '/placeholder.svg?height=190&width=120'
    posteImageRef.current = posteImagem

    carroImagem.onload = desenharCenario
    posteImagem.onload = desenharCenario
  }, [])

  useEffect(() => {
    if (gameStarted) {
      desenharCenario()
    }
  }, [gameStarted, carroPosicaoX])

  function normalizarString(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  function selecionarPalavra() {
    const index = Math.floor(Math.random() * palavrasTransito.length)
    const { palavra, dica } = palavrasTransito[index]
    setPalavraEscolhida(palavra.toUpperCase())
    setPalavraNormalizada(normalizarString(palavra.toUpperCase()))
    setDicaEscolhida(dica)
    setPalavraDisplay(Array(palavra.length).fill('_'))
    setTotalPalavras((prev) => prev + 1)
  }

  function desenharCenario() {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Desenhar estrada
    ctx.fillStyle = 'gray'
    ctx.fillRect(0, 170, canvas.width, 30)

    // Desenhar carro
    if (carroImageRef.current) {
      ctx.drawImage(carroImageRef.current, carroPosicaoX, carroPosicaoY, carroLargura, carroAltura)
    }

    // Desenhar poste
    if (posteImageRef.current) {
      ctx.drawImage(posteImageRef.current, posteX, posteY, posteLargura, posteAltura)
    }
  }

  function escolherLetra(letra: string) {
    const letraNormalizada = normalizarString(letra)

    if (palavraNormalizada.includes(letraNormalizada)) {
      const novaPalavraDisplay = [...palavraDisplay]
      palavraEscolhida.split('').forEach((char, index) => {
        if (normalizarString(char) === letraNormalizada) {
          novaPalavraDisplay[index] = char
        }
      })
      setPalavraDisplay(novaPalavraDisplay)

      if (!novaPalavraDisplay.includes('_')) {
        setMessage('Parabéns, você ganhou!')
        setAcertos((prev) => prev + 1)
        setGameEnded(true)
      }
    } else {
      setTentativasErradas((prev) => {
        const novasTentativas = prev + 1
        moverCarro(novasTentativas)
        if (novasTentativas === maxTentativas) {
          setMessage('Você perdeu! O carro bateu no poste.')
          setPalavraDisplay(palavraEscolhida.split(''))
          setGameEnded(true)
        }
        return novasTentativas
      })
    }
  }

  function moverCarro(novasTentativas: number) {
    const distancia = (posteX - carroLargura - carroPosicaoX) / (maxTentativas - novasTentativas + 1)
    setCarroPosicaoX((prev) => prev + distancia)
  }

  function iniciarJogo() {
    selecionarPalavra()
    setTentativasErradas(0)
    setCarroPosicaoX(50)
    setMessage('')
    setGameStarted(true)
    setGameEnded(false)
  }

  function proximaPalavra() {
    if (totalPalavras < palavrasTransito.length) {
      iniciarJogo()
    } else {
      setMessage(`Fim do jogo! Você acertou ${acertos} de ${totalPalavras} palavras.`)
      setGameEnded(true)
    }
  }

  function reiniciarJogo() {
    setAcertos(0)
    setTotalPalavras(0)
    iniciarJogo()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Jogo de Palavras de Trânsito</h1>
      <p className="text-xl mb-4">{dicaEscolhida}</p>
      <p id="wordDisplay" className="text-2xl tracking-widest mb-4">
        {palavraDisplay.join(' ')}
      </p>
      <div className="flex flex-wrap justify-center max-w-md mb-4">
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letra) => (
          <button
            key={letra}
            onClick={() => !gameEnded && escolherLetra(letra)}
            className={`m-1 w-10 h-10 text-lg font-semibold rounded ${
              gameEnded || palavraDisplay.join('').includes(letra)
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-white border border-gray-300 hover:bg-gray-100'
            }`}
            disabled={gameEnded || palavraDisplay.join('').includes(letra)}
          >
            {letra}
          </button>
        ))}
      </div>
      <p className="text-xl font-semibold mb-4">{message}</p>
      {!gameStarted && (
        <button
          onClick={iniciarJogo}
          className="px-6 py-2 text-lg font-semibold text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
        >
          Iniciar Jogo
        </button>
      )}
      {gameEnded && totalPalavras < palavrasTransito.length && (
        <button
          onClick={proximaPalavra}
          className="px-6 py-2 text-lg font-semibold text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
        >
          Próxima Palavra
        </button>
      )}
      {gameEnded && totalPalavras === palavrasTransito.length && (
        <button
          onClick={reiniciarJogo}
          className="px-6 py-2 text-lg font-semibold text-white bg-blue-600 rounded hover:bg-red-700 transition-colors"
        >
          Reiniciar Jogo
        </button>
      )}
      <canvas
        ref={canvasRef}
        width={600}
        height={300}
        className="border-2 border-gray-300 mt-4"
      />
    </div>
  )
}
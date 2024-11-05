"use client"

import React, { useState, useEffect, useRef } from 'react'
import "./style.css";

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

const JogoDaForca: React.FC = () => {
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
    carroImagem.src = '/car_texture.png.png'
    carroImageRef.current = carroImagem

    const posteImagem = new Image()
    posteImagem.src = '/poste_texture.png'
    posteImageRef.current = posteImagem

    carroImagem.onload = desenharCenario
    posteImagem.onload = desenharCenario
  }, [])

  useEffect(() => {
    if (gameStarted) {
      desenharCenario()
    }
  }, [gameStarted, carroPosicaoX])

  const normalizarString = (str: string): string => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  const selecionarPalavra = () => {
    const index = Math.floor(Math.random() * palavrasTransito.length)
    const { palavra, dica } = palavrasTransito[index]
    setPalavraEscolhida(palavra.toUpperCase())
    setPalavraNormalizada(normalizarString(palavra.toUpperCase()))
    setDicaEscolhida(dica)
    setPalavraDisplay(Array(palavra.length).fill('_'))
    setTotalPalavras((prev) => prev + 1)
  }

  const desenharCenario = () => {
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
    } else {
      ctx.fillStyle = 'blue'
      ctx.fillRect(carroPosicaoX, carroPosicaoY, carroLargura, carroAltura)
    }

    // Desenhar poste
    if (posteImageRef.current) {
      ctx.drawImage(posteImageRef.current, posteX, posteY, posteLargura, posteAltura)
    } else {
      ctx.fillStyle = 'yellow'
      ctx.fillRect(posteX, posteY, posteLargura, posteAltura)
    }
  }

  const escolherLetra = (letra: string) => {
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

  const moverCarro = (novasTentativas: number) => {
    const distancia = (posteX - carroLargura - carroPosicaoX) / (maxTentativas - novasTentativas + 1)
    setCarroPosicaoX((prev) => prev + distancia)
  }

  const iniciarJogo = () => {
    selecionarPalavra()
    setTentativasErradas(0)
    setCarroPosicaoX(50)
    setMessage('')
    setGameStarted(true)
    setGameEnded(false)
  }

  const proximaPalavra = () => {
    if (totalPalavras < palavrasTransito.length) {
      iniciarJogo()
    } else {
      setMessage(`Fim do jogo! Você acertou ${acertos} de ${totalPalavras} palavras.`)
      setGameEnded(true)
    }
  }

  const reiniciarJogo = () => {
    setAcertos(0)
    setTotalPalavras(0)
    iniciarJogo()
  }

  return (
    <div className="game-container">
      <h1>Jogo da Forca - Trânsito</h1>
      <canvas
        ref={canvasRef}
        width={600}
        height={200}
        className="road-canvas"
      />
      <div className="word-container">
        <p>{dicaEscolhida}</p>
        <p id="wordDisplay">{palavraDisplay.join(' ')}</p>
      </div>
      <div className="letters-container">
        <p id="message">{message}</p>
        <div id="letters">
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letra) => (
            <button
              key={letra}
              onClick={() => !gameEnded && escolherLetra(letra)}
              className={`letter ${gameEnded || palavraDisplay.join('').includes(letra) ? 'disabled' : ''}`}
              disabled={gameEnded || palavraDisplay.join('').includes(letra)}
            >
              {letra}
            </button>
          ))}
        </div>
      </div>
      {!gameStarted && (
        <button onClick={iniciarJogo} className="game-button">
          Começar Jogo
        </button>
      )}
      {gameEnded && totalPalavras < palavrasTransito.length && (
        <button onClick={proximaPalavra} className="game-button">
          Próxima Palavra
        </button>
      )}
      {gameEnded && totalPalavras === palavrasTransito.length && (
        <button onClick={reiniciarJogo} className="game-button">
          Reiniciar
        </button>
      )}
    </div>
  )
}

export default JogoDaForca
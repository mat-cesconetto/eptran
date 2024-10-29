import React, { useEffect, useState, useCallback } from "react";
import "./style.css";

// Types
type GridType = string[][];
type CellPosition = { row: number; col: number };

interface Cell {
  value: string;
  isSelected: boolean;
  isFound: boolean;
}

const allWords: string[] = [
  "TRÂNSITO",
  "CARRO",
  "PLACA",
  "RODOVIA",
  "PEDESTRE",
  "TREM",
  "SINAL",
  "MULTA",
  "VELOCIDADE",
  "BICICLETA",
  "FAIXA",
  "RADAR",
  "MOTO",
  "TRAFÉGO",
  "TRANSPORTE",
];

const GamePage: React.FC = () => {
  const [screen, setScreen] = useState<"initial" | "game" | "instructions">(
    "initial"
  );
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState<string>(
    "Selecione as palavras na grade!"
  );
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [startCell, setStartCell] = useState<CellPosition | null>(null);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());

  // Helper functions
  const getRandomWords = (wordArray: string[], numWords: number): string[] => {
    const selectedWords: string[] = [];
    const usedIndices: Set<number> = new Set();

    while (selectedWords.length < numWords) {
      const randomIndex = Math.floor(Math.random() * wordArray.length);
      if (!usedIndices.has(randomIndex)) {
        selectedWords.push(wordArray[randomIndex]);
        usedIndices.add(randomIndex);
      }
    }
    return selectedWords;
  };

  const getOffsets = (direction: number): [number, number] => {
    const offsets: [number, number][] = [
      [0, 1], // right
      [1, 0], // down
      [1, 1], // diagonal down-right
      [-1, 1], // diagonal up-right
      [0, -1], // left
      [-1, 0], // up
      [-1, -1], // diagonal up-left
      [1, -1], // diagonal down-left
    ];
    return offsets[direction];
  };

  const canPlaceWord = (
    tempGrid: string[][],
    word: string,
    startRow: number,
    startCol: number,
    direction: number
  ): boolean => {
    const [rowOffset, colOffset] = getOffsets(direction);
    const wordLength = word.length;

    if (
      startRow + rowOffset * (wordLength - 1) < 0 ||
      startRow + rowOffset * (wordLength - 1) >= 13 ||
      startCol + colOffset * (wordLength - 1) < 0 ||
      startCol + colOffset * (wordLength - 1) >= 13
    ) {
      return false;
    }

    for (let i = 0; i < wordLength; i++) {
      const row = startRow + rowOffset * i;
      const col = startCol + colOffset * i;
      const currentCell = tempGrid[row][col];
      if (currentCell !== "" && currentCell !== word[i]) {
        return false;
      }
    }

    return true;
  };

  const placeWord = (
    tempGrid: string[][],
    word: string,
    startRow: number,
    startCol: number,
    direction: number
  ): void => {
    const [rowOffset, colOffset] = getOffsets(direction);
    for (let i = 0; i < word.length; i++) {
      const row = startRow + rowOffset * i;
      const col = startCol + colOffset * i;
      tempGrid[row][col] = word[i];
    }
  };

  const initializeGame = useCallback(() => {
    const emptyGrid: string[][] = Array(13)
      .fill("")
      .map(() => Array(13).fill(""));
    const newWords = getRandomWords(allWords, 8);

    // Place words in grid
    newWords.forEach((word) => {
      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * 13);
        const col = Math.floor(Math.random() * 13);
        const direction = Math.floor(Math.random() * 8);

        if (canPlaceWord(emptyGrid, word, row, col, direction)) {
          placeWord(emptyGrid, word, row, col, direction);
          placed = true;
        }
      }
    });

    // Fill empty spaces
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 13; i++) {
      for (let j = 0; j < 13; j++) {
        if (emptyGrid[i][j] === "") {
          emptyGrid[i][j] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }

    // Convert to Cell objects
    const cellGrid: Cell[][] = emptyGrid.map((row) =>
      row.map((value) => ({
        value,
        isSelected: false,
        isFound: false,
      }))
    );

    setGrid(cellGrid);
    setWords(newWords);
    setFoundWords(new Set());
    setMessage("Selecione as palavras na grade!");
    setSelectedCells(new Set());
  }, []);

  useEffect(() => {
    if (screen === "game") {
      initializeGame();
    }
  }, [screen, initializeGame]);

  // Cell selection handlers
  const handleCellMouseDown = (row: number, col: number) => {
    setIsSelecting(true);
    setStartCell({ row, col });
    setSelectedCells(new Set([`${row}-${col}`]));

    const newGrid = [...grid];
    newGrid[row][col].isSelected = true;
    setGrid(newGrid);
  };

  const handleCellMouseOver = (row: number, col: number) => {
    if (!isSelecting || !startCell) return;

    const rowDiff = row - startCell.row;
    const colDiff = col - startCell.col;

    if (
      Math.abs(rowDiff) === Math.abs(colDiff) ||
      rowDiff === 0 ||
      colDiff === 0
    ) {
      const newSelected = new Set<string>();
      const newGrid = grid.map((row) =>
        row.map((cell) => ({ ...cell, isSelected: false }))
      );

      const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
      const rowStep = steps === 0 ? 0 : rowDiff / steps;
      const colStep = steps === 0 ? 0 : colDiff / steps;

      for (let i = 0; i <= steps; i++) {
        const currentRow = Math.round(startCell.row + i * rowStep);
        const currentCol = Math.round(startCell.col + i * colStep);
        newSelected.add(`${currentRow}-${currentCol}`);
        if (!newGrid[currentRow][currentCol].isFound) {
          newGrid[currentRow][currentCol].isSelected = true;
        }
      }

      setSelectedCells(newSelected);
      setGrid(newGrid);
    }
  };

  const handleCellMouseUp = () => {
    if (!isSelecting) return;

    const selectedWord = Array.from(selectedCells)
      .map((pos) => {
        const [row, col] = pos.split("-").map(Number);
        return grid[row][col].value;
      })
      .join("");

    const reversedWord = selectedWord.split("").reverse().join("");
    const correctWord = words.includes(selectedWord)
      ? selectedWord
      : words.includes(reversedWord)
      ? reversedWord
      : null;

    if (correctWord) {
      const newFoundWords = new Set(foundWords);
      newFoundWords.add(correctWord);
      setFoundWords(newFoundWords);

      const newGrid = grid.map((row, i) =>
        row.map((cell, j) => ({
          ...cell,
          isFound: cell.isFound || selectedCells.has(`${i}-${j}`),
          isSelected: false,
        }))
      );
      setGrid(newGrid);
      setMessage(`Você encontrou a palavra: ${correctWord}`);

      if (newFoundWords.size === words.length) {
        setMessage("Parabéns! Você encontrou todas as palavras!");
      }
    } else {
      const newGrid = grid.map((row) =>
        row.map((cell) => ({
          ...cell,
          isSelected: false,
        }))
      );
      setGrid(newGrid);
    }

    setIsSelecting(false);
    setStartCell(null);
    setSelectedCells(new Set());
  };

  return (
    <div className="min-h-screen flex flex-col">
      {screen === "initial" && (
        <div id="initial-screen" className="initial-screen">
          <h1 id="titulo">CAÇA-PALAVRAS</h1>
          <button className="bt1" onClick={() => setScreen("game")}>
            Iniciar
          </button>
          <button className="bt1">Conquistas</button>
          <button className="bt1" onClick={() => setScreen("instructions")}>
            Instruções
          </button>
        </div>
      )}

      {screen === "game" && (
        <div id="game-screen">
          <div className="game-header">
            <h1>Caça-Palavras</h1>
          </div>
          <div className="main-container">
            <div className="grid-container">
              <table id="crossword">
                <tbody>
                  {grid.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td
                          key={`${i}-${j}`}
                          className={`
                            ${cell.isFound ? "found" : ""}
                            ${cell.isSelected ? "selected" : ""}
                          `}
                          onMouseDown={() => handleCellMouseDown(i, j)}
                          onMouseOver={() => handleCellMouseOver(i, j)}
                          onMouseUp={handleCellMouseUp}
                        >
                          {cell.value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="word-list-container">
              <h2 className="h2">Palavras a serem encontradas:</h2>
              <ul id="word-list">
                {words.map((word, index) => (
                  <li
                    key={index}
                    className={foundWords.has(word) ? "found-word" : ""}
                  >
                    {word}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="message" id="message">
            {message}
          </div>
          <div className="ml-[35%]">
            <button className="bt1" onClick={() => setScreen("initial")}>
              <img src="./setavoltar.png" alt="Voltar" />
            </button>

            <button className="bt1" onClick={initializeGame}>
              <img src="/resetar.png" alt="Reiniciar" />
            </button>
          </div>
        </div>
      )}

      {screen === "instructions" && (
        <div id="instructions-screen" className="instructions-screen">
          <div className="instructions-container">
            <h2 className="h2">Como Jogar</h2>
            <div className="instructions-content">
              <p>1. Use o mouse para selecionar as palavras que encontrar</p>
              <p>2. As palavras podem estar em qualquer direção:</p>
              <ul>
                <li>Horizontal (→ ←)</li>
                <li>Vertical (↑ ↓)</li>
                <li>Diagonal (↘ ↙ ↗ ↖)</li>
              </ul>
              <p>
                3. Quando encontrar uma palavra, ela será destacada em verde
              </p>
              <p>4. Encontre todas as palavras para vencer!</p>
            </div>
            <button onClick={() => setScreen("initial")}>Voltar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;

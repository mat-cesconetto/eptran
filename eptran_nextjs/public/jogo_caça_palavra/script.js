const allWords = [
    "TRÂNSITO", "CARRO", "PLACA", "RODOVIA", "PEDESTRE", "TREM",
    "SINAL", "MULTA", "VELOCIDADE", "BICICLETA", "FAIXA", "RADAR",
    "MOTO", "TRAFÉGO", "TRANSPORTE"
];


let grid = Array(13).fill().map(() => Array(13).fill(''));
let words = [];
let foundWords = new Set();
let isSelecting = false;
let startCell = null;
let currentCell = null;
let selectedCells = new Set();
let lastHighlightedCells = new Set();


function getRandomWords(wordArray, numWords) {
    let selectedWords = [];
    let usedIndices = new Set();


    while (selectedWords.length < numWords) {
        let randomIndex = Math.floor(Math.random() * wordArray.length);
        if (!usedIndices.has(randomIndex)) {
            selectedWords.push(wordArray[randomIndex]);
            usedIndices.add(randomIndex);
        }
    }


    return selectedWords;
}


function initializeGame() {
    grid = Array(13).fill().map(() => Array(13).fill(''));
    words = [];
    foundWords = new Set();
    lastHighlightedCells = new Set();
    isSelecting = false;
    startCell = null;
    currentCell = null;
   
    words = getRandomWords(allWords, 8);
    placeWords(words);
}


function getOffsets(direction) {
    const offsets = [
        [0, 1],  
        [1, 0],  
        [1, 1],  
        [-1, 1],  
        [0, -1],
        [-1, 0],  
        [-1, -1],
        [1, -1]  
    ];
    return offsets[direction];
}


function canPlaceWord(word, startRow, startCol, direction) {
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
        const currentCell = grid[row][col];
       
        if (currentCell !== '' && currentCell !== word[i]) {
            return false;
        }
    }


    return true;
}


function placeWord(word, startRow, startCol, direction) {
    const [rowOffset, colOffset] = getOffsets(direction);
   
    for (let i = 0; i < word.length; i++) {
        const row = startRow + rowOffset * i;
        const col = startCol + colOffset * i;
        grid[row][col] = word[i];
    }
}


function fillEmptySpaces() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   
    for (let i = 0; i < 13; i++) {
        for (let j = 0; j < 13; j++) {
            if (grid[i][j] === '') {
                const randomLetter = letters[Math.floor(Math.random() * letters.length)];
                grid[i][j] = randomLetter;
            }
        }
    }
}


function renderWordList() {
    const wordList = document.getElementById('word-list');
    wordList.innerHTML = '';
    words.forEach(word => {
        const listItem = document.createElement('li');
        listItem.textContent = word;
        if (foundWords.has(word)) {
            listItem.classList.add('found-word');
        }
        wordList.appendChild(listItem);
    });
}


function placeWords(words) {
    words.forEach(word => {
        let placed = false;
        while (!placed) {
            let row = Math.floor(Math.random() * 13);
            let col = Math.floor(Math.random() * 13);
            let direction = Math.floor(Math.random() * 8);


            if (canPlaceWord(word, row, col, direction)) {
                placeWord(word, row, col, direction);
                placed = true;
            }
        }
    });
    fillEmptySpaces();
    renderGrid();
    renderWordList();
}


function handleTouchStart(event) {
    event.preventDefault();
    if (event.target.tagName === 'TD') {
        isSelecting = true;
        startCell = event.target;
        clearSelection();
        highlightCell(event.target);
        currentCell = event.target;
        updateSelection();
    }
}


function handleTouchMove(event) {
    event.preventDefault();
    if (!isSelecting) return;
   
    const touch = event.touches[0];
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    const cell = elements.find(el => el.tagName === 'TD');
   
    if (cell && isSelecting) {
        currentCell = cell;
        updateSelection();
    }
}


function handleTouchEnd(event) {
    event.preventDefault();
    if (isSelecting) {
        isSelecting = false;
        checkSelection();
        if (!isWordFound()) {
            clearSelection();
        }
    }
}


function handleMouseDown(event) {
    if (event.target.tagName === 'TD') {
        isSelecting = true;
        startCell = event.target;
        clearSelection();
        highlightCell(event.target);
        updateSelection();
    }
}


function handleMouseUp(event) {
    if (isSelecting) {
        isSelecting = false;
        checkSelection();
        if (!isWordFound()) {
            clearSelection();
        }
    }
}


function handleMouseOver(event) {
    if (isSelecting && event.target.tagName === 'TD') {
        currentCell = event.target;
        updateSelection();
    }
}


function updateSelection() {
    if (!startCell || !currentCell) return;


    lastHighlightedCells.forEach(cell => {
        cell.classList.remove('selected');
    });
    lastHighlightedCells.clear();


    const startRow = parseInt(startCell.dataset.row);
    const startCol = parseInt(startCell.dataset.col);
    const endRow = parseInt(currentCell.dataset.row);
    const endCol = parseInt(currentCell.dataset.col);


    const rowDiff = endRow - startRow;
    const colDiff = endCol - startCol;


    if (Math.abs(rowDiff) === Math.abs(colDiff) || rowDiff === 0 || colDiff === 0) {
        const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
        const rowStep = steps === 0 ? 0 : rowDiff / steps;
        const colStep = steps === 0 ? 0 : colDiff / steps;


        for (let i = 0; i <= steps; i++) {
            const row = Math.round(startRow + i * rowStep);
            const col = Math.round(startCol + i * colStep);
            const cell = document.querySelector(`td[data-row="${row}"][data-col="${col}"]`);
            if (cell) {
                cell.classList.add('selected');
                lastHighlightedCells.add(cell);
            }
        }
    }
}


function getSelectedWord() {
    const cells = Array.from(lastHighlightedCells);
    cells.sort((a, b) => {
        const rowDiff = parseInt(a.dataset.row) - parseInt(b.dataset.row);
        return rowDiff !== 0 ? rowDiff : parseInt(a.dataset.col) - parseInt(b.dataset.col);
    });
    return cells.map(cell => cell.textContent).join('');
}


function checkSelection() {
    const selectedWord = getSelectedWord();
    const reversedWord = selectedWord.split('').reverse().join('');
   
    const correctWord = words.includes(selectedWord) ? selectedWord :
                       words.includes(reversedWord) ? words[words.indexOf(reversedWord)] : null;


    if (correctWord) {
        foundWords.add(correctWord);
        lastHighlightedCells.forEach(cell => {
            cell.classList.remove('selected');
            cell.classList.add('found');
        });
        updateWordList();
        updateMessage(`Você encontrou a palavra: ${correctWord}`);


        if (foundWords.size === words.length) {
            updateMessage("Parabéns! Você encontrou todas as palavras!");
        }
        return true;
    }
    return false;
}


function isWordFound() {
    const selectedWord = getSelectedWord();
    const reversedWord = selectedWord.split('').reverse().join('');
    return words.includes(selectedWord) || words.includes(reversedWord);
}


function clearSelection() {
    lastHighlightedCells.forEach(cell => {
        if (!cell.classList.contains('found')) {
            cell.classList.remove('selected');
        }
    });
    lastHighlightedCells.clear();
}


function updateWordList() {
    const wordList = document.getElementById('word-list');
    wordList.innerHTML = '';
    words.forEach(word => {
        const listItem = document.createElement('li');
        listItem.textContent = word;
        if (foundWords.has(word)) {
            listItem.classList.add('found-word');
        }
        wordList.appendChild(listItem);
    });
}


function updateMessage(message) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
}


function highlightCell(cell) {
    if (!cell.classList.contains('found')) {
        cell.classList.add('selected');
        lastHighlightedCells.add(cell);
    }
}


function showInitialScreen() {
    const initialScreen = document.getElementById('initial-screen');
    const gameScreen = document.getElementById('game-screen');
    const instructionsScreen = document.getElementById('instructions-screen');
   
    initialScreen.classList.remove('hidden');
    gameScreen.classList.add('hidden');
    instructionsScreen.classList.add('hidden');
}


function showGameScreen() {
    const initialScreen = document.getElementById('initial-screen');
    const gameScreen = document.getElementById('game-screen');
    const instructionsScreen = document.getElementById('instructions-screen');
   
    initialScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    instructionsScreen.classList.add('hidden');
    initializeGame();
}


function showInstructionsScreen() {
    const initialScreen = document.getElementById('initial-screen');
    const gameScreen = document.getElementById('game-screen');
    const instructionsScreen = document.getElementById('instructions-screen');
   
    initialScreen.classList.add('hidden');
    gameScreen.classList.add('hidden');
    instructionsScreen.classList.remove('hidden');
}


function reiniciarJogo() {
    initializeGame();
    document.getElementById('message').textContent = "Selecione as palavras na grade!";
}


function renderGrid() {
    const table = document.getElementById('crossword');
    table.innerHTML = '';


    table.removeEventListener('mousedown', handleMouseDown);
    table.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchend', handleTouchEnd);
    table.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('touchmove', handleTouchMove);


    table.addEventListener('mousedown', handleMouseDown);
    table.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleTouchEnd, { passive: false });
    table.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    table.addEventListener('selectstart', (e) => e.preventDefault());


    table.addEventListener('gesturestart', (e) => e.preventDefault());
    table.addEventListener('gesturechange', (e) => e.preventDefault());
    table.addEventListener('gestureend', (e) => e.preventDefault());


    for (let i = 0; i < 13; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 13; j++) {
            let cell = document.createElement('td');
            cell.textContent = grid[i][j];
            cell.dataset.row = i;
            cell.dataset.col = j;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const gameScreen = document.getElementById('game-screen');
    gameScreen.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });


    const startGameButton = document.getElementById('start-game');
    const instructionsButton = document.getElementById('settings-button');
    const backToMenuButton = document.getElementById('back-to-menu');
    const voltarButton = document.getElementById('voltar');


    instructionsButton.textContent = "Instruções";


    startGameButton.addEventListener('click', showGameScreen);
    instructionsButton.addEventListener('click', showInstructionsScreen);
    backToMenuButton.addEventListener('click', showInitialScreen);
    voltarButton.addEventListener('click', showInitialScreen);
});


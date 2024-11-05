// Lista de objetos e suas respectivas imagens
const images = {
    "Ônibus": "images/Ônibus.png",
    "Semáforo": "images/semaforo.png",
    "Rua": "images/Rua.png",
    "Placa Pare": "images/Placa.png",
    "Carro": "images/carro.png"
    
    
};


let score = 0;
let attempts = 3;
let currentObject = "";
let remainingImages = { ...images }; // Cópia da lista original de imagens

// Selecionar elementos do DOM
const imageElement = document.getElementById("traffic-image");
const answerInput = document.getElementById("answer");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const attemptsElement = document.getElementById("attempts");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn"); // Botão de reiniciar

// Função para atualizar a imagem
function updateImage() {
    feedbackElement.style.visibility = "hidden"; // Esconde a mensagem "Correto" ou "Errado" ao mudar a imagem

    const objectNames = Object.keys(remainingImages);

    // Verifica se ainda existem imagens restantes
    if (objectNames.length === 0) {
        feedbackElement.textContent = "Parabéns! Você acertou todas as imagens!";
        feedbackElement.style.visibility = "visible";
        submitBtn.disabled = true;
        answerInput.disabled = true;
        restartBtn.style.display = "block"; // Exibir o botão de reiniciar
        return;
    }

    // Seleciona uma imagem aleatória da lista restante
    currentObject = objectNames[Math.floor(Math.random() * objectNames.length)];
    imageElement.src = remainingImages[currentObject];
    answerInput.value = ""; // Limpa o campo de resposta
}

// Função para verificar a resposta
function checkAnswer() {
    const userAnswer = answerInput.value.trim(); // Mantém a caixa alta e acentos

    if (userAnswer === currentObject) {
        score++;
        feedbackElement.textContent = "Correto!";
        feedbackElement.classList.add("green");
        feedbackElement.style.visibility = "visible"; // Exibe a mensagem de acerto

        // Remove a imagem atual da lista de imagens restantes
        delete remainingImages[currentObject];

        setTimeout(updateImage, 1000); // Muda a imagem após 1 segundo
    } else {
        attempts--;
        feedbackElement.textContent = "Errado! Tente novamente.";
        feedbackElement.classList.remove("green");
        feedbackElement.style.visibility = "visible"; // Exibe a mensagem de erro

        // Atualizar pontuação e tentativas
        scoreElement.textContent = `Pontos: ${score}`;
        attemptsElement.textContent = `Tentativas: ${attempts}`;

        // Verificar se o jogo acabou
        if (attempts === 0) {
            feedbackElement.textContent = "Game Over! Tente novamente clicando no botão Reiniciar.";
            submitBtn.disabled = true;
            answerInput.disabled = true;
            restartBtn.style.display = "block"; // Exibir o botão de reiniciar
        }
    }
}

// Função para reiniciar o jogo
function restartGame() {
    score = 0;
    attempts = 3;
    remainingImages = { ...images }; // Restaurar a lista de imagens
    submitBtn.disabled = false;
    answerInput.disabled = false;
    feedbackElement.textContent = "";
    feedbackElement.style.visibility = "hidden"; // Esconder o feedback ao reiniciar
    restartBtn.style.display = "none"; // Esconder o botão de reiniciar
    updateImage(); // Atualizar com uma nova imagem
    scoreElement.textContent = `Pontos: ${score}`;
    attemptsElement.textContent = `Tentativas: ${attempts}`;
}

// Adiciona o evento ao botão de enviar
submitBtn.addEventListener("click", checkAnswer);

// Adiciona o evento ao botão de reiniciar
restartBtn.addEventListener("click", restartGame);

// Inicializa o jogo com a primeira imagem
updateImage();
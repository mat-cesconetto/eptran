// Lista de objetos e suas respectivas imagens
const images = {
    "ÔNIBUS": "images/Ônibus.png",   // Palavras já em caixa alta
    "SEMÁFORO": "images/semaforo.png",
    "RUA": "images/Rua.png",
    "PLACA DE PARE": "images/Placa.png",
    "CARRO": "images/carro.png"
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
    const userAnswer = answerInput.value.trim().toUpperCase(); // Converte para caixa alta

    // Verifica se a resposta do usuário corresponde à imagem atual, também em caixa alta
    if (userAnswer === currentObject.toUpperCase()) {
        score++; // Incrementa o score
        feedbackElement.textContent = "Correto!";
        feedbackElement.classList.add("green");
        feedbackElement.style.visibility = "visible"; // Exibe a mensagem de acerto

        // Remove a imagem atual da lista de imagens restantes
        delete remainingImages[currentObject];

        // Atualiza o placar
        scoreElement.textContent = `Pontos: ${score}`;

        setTimeout(updateImage, 1000); // Muda a imagem após 1 segundo
    } else {
        attempts--; // Decrementa as tentativas
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

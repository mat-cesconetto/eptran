// script.js
let dino = document.getElementById("dino");
let cactus = document.getElementById("cactus");
let isMovingRight = false;
let isMovingLeft = false;
let dinoPosition = 50; // Posição inicial do dinossauro em porcentagem (centro)

// Evento para capturar teclas pressionadas
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight") {
        isMovingRight = true;
    } else if (event.key === "ArrowLeft") {
        isMovingLeft = true;
    }
});

// Evento para detectar quando a tecla é solta
document.addEventListener("keyup", function(event) {
    if (event.key === "ArrowRight") {
        isMovingRight = false;
    } else if (event.key === "ArrowLeft") {
        isMovingLeft = false;
    }
});

// Movimento do dinossauro para os lados
function moveDino() {
    if (isMovingRight && dinoPosition < 100) {
        dinoPosition += 2; // Movimenta para a direita
    } else if (isMovingLeft && dinoPosition > 0) {
        dinoPosition -= 2; // Movimenta para a esquerda
    }
    dino.style.left = dinoPosition + "%";
}

// Movimento dos cactos de cima para baixo
function moveCactus() {
    let cactusPosition = 0; // Começa no topo
    let cactusLeftPosition = Math.floor(Math.random() * 90); // Posição aleatória no eixo X

    cactus.style.left = cactusLeftPosition + "%";

    let cactusInterval = setInterval(() => {
        if (cactusPosition >= 900) {
            cactusPosition = 0; // Reinicia o cacto
            cactusLeftPosition = Math.floor(Math.random() * 90); // Nova posição aleatória
            cactus.style.left = cactusLeftPosition + "%";
        } else {
            cactusPosition += 5;
            cactus.style.top = cactusPosition + "px";
        }

        // Detectar colisão
        let dinoLeft = dino.offsetLeft;
        let cactusLeft = cactus.offsetLeft;

        if (
            cactusPosition > 850 && // Quando o cacto atinge o fundo
            cactusLeftPosition >= dinoPosition - 2 && // Verifica se está perto do dinossauro
            cactusLeftPosition <= dinoPosition + 2
        ) {
            alert("Game Over!");
            clearInterval(cactusInterval);
        }
    }, 20);
}

// Atualizar o jogo continuamente
function gameLoop() {
    moveDino();
    requestAnimationFrame(gameLoop); // Chama a função continuamente
}

moveCactus();
gameLoop();


let obstacles = [];
let lastTime = 0;
let gameRunning = false; // Controla se o jogo foi iniciado ou terminou
let requestID;
let onTab = true;
let tabResumed = false; // Marca se a aba foi recentemente reativada

tela = new Screen("#canvas");

let valor = World.centerY / 2;

function setupNewScene() {
    World.currentScene = new Scene(
        new Car(0, 20, 10, 0, 2, 2),
        new Road(0, 0, 0, 0, 1, 1)
    );
    World.currentScene.init();
    World.currentScene.addEndGameListener(() => {
        gameRunning = false; // Marca o jogo como terminado
        cancelAnimationFrame(requestID); // Cancela a animação em andamento
        document.getElementById("gameOverScreen").style.display = "flex"; // Exibe a tela de "game over"
    });
}

// Callback que inicia o jogo
Loader.addListener(() => {
    console.log("Iniciando jogo");
    requestID = requestAnimationFrame(gameLoop);
});

let fps = 1;

function gameLoop(timestamp) {
    if (!gameRunning) return; // Se o jogo terminou, para o loop

    // Ignorar o primeiro frame ao retomar a aba
    if (tabResumed) {
        lastTime = timestamp; // Atualiza lastTime ao retomar
        tabResumed = false; // Reseta a flag
        requestID = requestAnimationFrame(gameLoop); // Reagenda o próximo frame
        return;
    }

    // Calcular o delta time (tempo entre os quadros)
    let dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    // Evitar delta time absurdo ou inválido
    if (dt <= 0 || dt > 0.1 || isNaN(dt)) {
        dt = 0.016; // Assume 60 FPS para frames inválidos
    }

    // Calcular FPS
    if (dt > 0) {
        fps = 1 / dt;
    }

    // Atualizações e renderizações só acontecem se a aba estiver ativa
    if (onTab) {
        World.currentScene.update(dt);
        World.currentScene.render();
        drawScore();
        //drawFps();
    }

    // Continuar o loop de animação
    requestID = requestAnimationFrame(gameLoop);
}

function executarAposIntervaloAleatorio(func) {
    const intervalo = Math.lerp(400, 2000, Math.random());
    setTimeout(createObstacle, intervalo);
}

function createObstacle() {
    const intervalo = Math.lerp(-500, 500, Math.random());
    World.obstacles.push(
        new Obstacle(Math.random() * intervalo, 1400, 0, 2, 2)
    );
    executarAposIntervaloAleatorio();
}

function drawScore() {
    Screen.ctx.font = "30px Arial";
    Screen.ctx.fillStyle = "white";
    Screen.ctx.textAlign = "left";
    Screen.ctx.textBaseline = "top";

    Screen.ctx.fillText(`Distância percorrida: ${Math.floor(World.currentScene.score)}m`, 10, 10);
}

function drawFps() {
    Screen.ctx.font = "30px Arial";
    Screen.ctx.fillStyle = "white";
    Screen.ctx.textAlign = "left";
    Screen.ctx.textBaseline = "top";

    Screen.ctx.fillText(`Fps:${Math.floor(fps)}`, 10, 50);
}

// Gerenciar o estado da aba
function updateTabState() {
    const wasTabInactive = !onTab;
    onTab = !document.hidden && document.hasFocus();

    if (onTab && wasTabInactive) {
        // Se a aba foi reativada, marca que deve sincronizar o lastTime
        tabResumed = true;
    }
}

function startGame(){
    cancelAnimationFrame(requestID);
    gameRunning = true;
    setupNewScene();
    document.getElementById("gameOverScreen").style.display = "none";
    document.getElementById("gameMenuScreen").style.display = "none";
}
// Eventos que alteram o estado da aba
document.addEventListener("visibilitychange", updateTabState);
window.addEventListener("blur", () => onTab = false);
window.addEventListener("focus", updateTabState);

// Evento para detectar a tecla Enter
document.addEventListener('keydown', (event) => {
    if ((event.key == 'Enter' || event.key == ' ') && !gameRunning)
        startGame();
});
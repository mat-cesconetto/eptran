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
];

let palavraEscolhida = '';
let palavraNormalizada = '';
let palavraDisplay = [];
let dicaEscolhida = '';
let tentativasErradas = 0;
const maxTentativas = 6;

// Elementos do DOM
const wordDisplay = document.getElementById('wordDisplay');
const lettersContainer = document.getElementById('letters');
const message = document.getElementById('message');
const dicaDisplay = document.createElement('p');
document.body.insertBefore(dicaDisplay, document.querySelector('.game-container'));
const roadCanvas = document.getElementById('roadCanvas');
const ctx = roadCanvas.getContext('2d');
const startButton = document.getElementById('startButton');

// Desenho do carro e poste
let carroPosicaoX = 50;
const carroPosicaoY = 120;
const carroLargura = 100;
const carroAltura = 100;
const posteX = 450;
const posteY = 30;
const posteLargura = 120;
const posteAltura = 190;

// Função para desenhar a estrada, carro e poste
function desenharCenario() {
    ctx.clearRect(0, 0, roadCanvas.width, roadCanvas.height);
    
    // Desenhar estrada
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 170, roadCanvas.width, 30);
    
    // Desenhar carro
    ctx.fillStyle = 'blue';
    ctx.fillRect(carroPosicaoX, carroPosicaoY, carroLargura, carroAltura);
    
    // Desenhar poste
    ctx.fillStyle = 'yellow';
    ctx.fillRect(posteX, posteY, posteLargura, posteAltura);
}

// Função para normalizar uma string (remover acentos)
function normalizarString(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

let ultimaPalavraEscolhida = '';

function selecionarPalavra() {
    let index;
    
    do {
        index = Math.floor(Math.random() * palavrasTransito.length);
    } while (palavrasTransito[index].palavra === ultimaPalavraEscolhida);
    
    const { palavra, dica } = palavrasTransito[index];
    palavraEscolhida = palavra.toUpperCase();
    palavraNormalizada = normalizarString(palavraEscolhida);
    dicaEscolhida = dica;
    palavraDisplay = Array(palavraEscolhida.length).fill('_');
    wordDisplay.textContent = palavraDisplay.join(' ');
    dicaDisplay.textContent = `Dica: ${dicaEscolhida}`;

    ultimaPalavraEscolhida = palavra;
}

// Função para criar os botões das letras
function criarLetras() {
    const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    lettersContainer.innerHTML = '';
    alfabeto.forEach(letra => {
        const button = document.createElement('div');
        button.classList.add('letter');
        button.textContent = letra;
        button.addEventListener('click', () => escolherLetra(letra, button));
        lettersContainer.appendChild(button);
    });
}

// Função para escolher uma letra
function escolherLetra(letra, button) {
    button.style.display = 'none'; // Torna a letra invisível

    const letraNormalizada = normalizarString(letra);
    
    if (palavraNormalizada.includes(letraNormalizada)) {
        palavraEscolhida.split('').forEach((char, index) => {
            if (normalizarString(char) === letraNormalizada) {
                palavraDisplay[index] = char;
            }
        });
        wordDisplay.textContent = palavraDisplay.join(' ');

        // Verificar se o jogador ganhou
        if (!palavraDisplay.includes('_')) {
            message.textContent = 'Parabéns, você ganhou!';
            mostrarBotaoIniciar(); // Mostra o botão de iniciar
        }
    } else {
        tentativasErradas++;
        moverCarro();

        if (tentativasErradas === maxTentativas) {
            message.textContent = 'Você perdeu! O carro bateu no poste.';
            wordDisplay.textContent = palavraEscolhida; // Mostra a palavra completa ao perder
            mostrarBotaoIniciar(); // Mostra o botão de iniciar
        }
    }
}

// Função para mover o carro após erro
function moverCarro() {
    const distancia = (posteX - carroLargura - carroPosicaoX) / (maxTentativas - tentativasErradas + 1);
    carroPosicaoX += distancia;
    desenharCenario();
}

// Função para mostrar o botão de iniciar
function mostrarBotaoIniciar() {
    startButton.style.display = 'block'; // Mostra o botão de iniciar
}

// Função para inicializar o jogo
function iniciarJogo() {
    selecionarPalavra();
    criarLetras();
    desenharCenario();
    message.textContent = '';
    carroPosicaoX = 50; // Reseta a posição do carro
    tentativasErradas = 0; // Reseta o contador de tentativas
    startButton.style.display = 'none'; // Esconde o botão de iniciar
}

// Evento para iniciar o jogo
startButton.addEventListener('click', iniciarJogo);

// Carregar as imagens do carro e do poste
const carroImagem = new Image();
carroImagem.src = 'car_texture.png.png'; // Caminho para a imagem do carro
const posteImagem = new Image();
posteImagem.src = 'poste_texture.png'; // Caminho para a imagem do poste
let imagemCarroCarregada = false;
let imagemPosteCarregada = false;

// Eventos que verificam quando as imagens foram carregadas
carroImagem.onload = () => {
    imagemCarroCarregada = true; // A imagem do carro foi carregada
    desenharCenario(); // Redesenha o cenário
};

posteImagem.onload = () => {
    imagemPosteCarregada = true; // A imagem do poste foi carregada
    desenharCenario(); // Redesenha o cenário
};

// Inicializa a interface do jogo
startButton.style.display = 'block'; // Mostrar botão de iniciar

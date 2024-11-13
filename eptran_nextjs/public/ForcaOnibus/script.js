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


const wordDisplay = document.getElementById('wordDisplay');
const lettersContainer = document.getElementById('letters');
const message = document.getElementById('message');
const dicaDisplay = document.createElement('p');
document.body.insertBefore(dicaDisplay, document.querySelector('.game-container'));
const roadCanvas = document.getElementById('roadCanvas');
const ctx = roadCanvas.getContext('2d');
const startButton = document.getElementById('startButton');

let carroPosicaoX = 50;
const carroPosicaoY = 40;
const carroLargura = 200;
const carroAltura = 200;
const posteX = 450;
const posteY = 40;
const posteLargura = 160;
const posteAltura = 180;


const carroImagem = new Image();
carroImagem.src = 'car_texture.png';
const posteImagem = new Image();
posteImagem.src = 'poste_texture.png'; 
const carroBatidoImagem = new Image();
carroBatidoImagem.src = 'carro_batido.png'; 

let imagemCarroCarregada = false;
let imagemPosteCarregada = false;
let imagemCarroBatidoCarregada = false;

function desenharCenario() {
    ctx.clearRect(0, 0, roadCanvas.width, roadCanvas.height);

    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 170, roadCanvas.width, 30);

    
    if (tentativasErradas >= maxTentativas) {
        if (imagemCarroBatidoCarregada) {
          
            const novaLargura = posteLargura * 1.2; 
            const novaAltura = posteAltura * 1.2;   
            ctx.drawImage(carroBatidoImagem, posteX, posteY, novaLargura, novaAltura);
        }
    }
    
    else {
       
        if (imagemCarroCarregada) {
            ctx.drawImage(carroImagem, carroPosicaoX, carroPosicaoY, carroLargura, carroAltura);
        } else {
            ctx.fillStyle = 'blue';
            ctx.fillRect(carroPosicaoX, carroPosicaoY, carroLargura, carroAltura);
        }
    }

    
    if (tentativasErradas < maxTentativas) {
        if (imagemPosteCarregada) {
            ctx.drawImage(posteImagem, posteX, posteY, posteLargura, posteAltura);
        } else {
            ctx.fillStyle = 'yellow';
            ctx.fillRect(posteX, posteY, posteLargura, posteAltura);
        }
    }
}

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

function escolherLetra(letra, button) {
    button.style.display = 'none'; 

    const letraNormalizada = normalizarString(letra);
    
    if (palavraNormalizada.includes(letraNormalizada)) {
        palavraEscolhida.split('').forEach((char, index) => {
            if (normalizarString(char) === letraNormalizada) {
                palavraDisplay[index] = char;
            }
        });
        wordDisplay.textContent = palavraDisplay.join(' ');

        if (!palavraDisplay.includes('_')) {
            message.textContent = 'Parabéns, você ganhou!';
            mostrarBotaoIniciar(); 
        }
    } else {
        tentativasErradas++;
        moverCarro();

        if (tentativasErradas === maxTentativas) {
            message.textContent = 'Você perdeu! O carro bateu no poste.';
            wordDisplay.textContent = palavraEscolhida; 
            mostrarBotaoIniciar(); 
        }
    }
}

function moverCarro() {
    
    const distanciaRestante = posteX - carroLargura - carroPosicaoX;

    if (distanciaRestante <= 0) {
        
        carroPosicaoX = posteX - carroLargura; 
    } else {
        
        const distancia = distanciaRestante / (maxTentativas - tentativasErradas + 1);
        carroPosicaoX += distancia;
    }

    desenharCenario(); 
}


function mostrarBotaoIniciar() {
    startButton.style.display = 'block'; 
}

function iniciarJogo() {
    selecionarPalavra();
    criarLetras();
    
    carroPosicaoX = 50;  
    tentativasErradas = 0; 
    startButton.style.display = 'none'; 
    desenharCenario(); 
    message.textContent = ''; 
}


function reiniciarJogo() {
    startButton.style.display = 'none';
    message.textContent = '';
    tentativasErradas = 0; 
    desenharCenario(); 
    iniciarJogo();
}


startButton.addEventListener('click', iniciarJogo);


document.getElementById('restartButton').addEventListener('click', reiniciarJogo);


carroImagem.onload = () => {
    imagemCarroCarregada = true; 
    desenharCenario(); 
};

posteImagem.onload = () => {
    imagemPosteCarregada = true; 
    desenharCenario(); 
};

carroBatidoImagem.onload = () => {
    imagemCarroBatidoCarregada = true; 
    desenharCenario(); 
};


startButton.style.display = 'block'; 

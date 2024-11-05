const comecarjogo = document.querySelector(".comecar-quizz");
const questaoconteiner = document.querySelector(".questao-container");
const respostacontainer = document.querySelector(".Resposta-container");
const questaotexto = document.querySelector(".questao");
const proximapergunta = document.querySelector(".proxima_pergunta");
const instrucaoQuizz = document.querySelector(".instrucao-quizz");
const conquistasQuizz = document.querySelector(".conquistas-quizz");
const tituloQuizz = document.querySelector(".titulo");

comecarjogo.addEventListener("click", Iniciarjogo);
proximapergunta.addEventListener("click", displayproximaquestao);
instrucaoQuizz.addEventListener("click", mostrarInstrucoes);

let questaoatual = 0;
let totalacertos = 0;

function Iniciarjogo() {
    esconderElementosInicio();
    questaoconteiner.classList.remove("hide");
    
    // Embaralha as questões antes de iniciar
    embaralharQuestoes(questoes);
    
    displayproximaquestao();
}

function esconderElementosInicio() {
    comecarjogo.classList.add("hide");
    instrucaoQuizz.classList.add("hide");
    conquistasQuizz.classList.add("hide");
    tituloQuizz.classList.add("hide");
}

function mostrarInstrucoes() {
    esconderElementosInicio();

    const container = document.querySelector(".container");


    const tituloInstrucoes = document.createElement("h1");
    tituloInstrucoes.textContent = "INSTRUÇÕES";
    tituloInstrucoes.classList.add("titulo-instr");

    const divInstrucoes = document.createElement("div");
    divInstrucoes.classList.add("instrucoes-container");

    const textoInstrucoes = document.createElement("p");
    textoInstrucoes.classList.add("instrucoes-texto");
    textoInstrucoes.textContent = "Este quiz contém 20 questões desafiadoras sobre regras de trânsito, com foco em sinalização e condutas. Teste seus conhecimentos e se divirta enquanto aprende! Concentre-se para obter uma boa pontuação e, se precisar, jogue novamente quantas vezes quiser para melhorar seu desempenho.";

    const botaoVoltar = document.createElement("button");
    botaoVoltar.classList.add("voltar", "button");
    botaoVoltar.textContent = "Voltar";

    botaoVoltar.addEventListener("click", () => {
        tituloInstrucoes.remove();
        divInstrucoes.remove();
        mostrarElementosInicio();
    });

    const botoesContainer = document.createElement("div");
    botoesContainer.classList.add("botoes-container");

    botoesContainer.appendChild(botaoVoltar);
    divInstrucoes.appendChild(textoInstrucoes);
    divInstrucoes.appendChild(botoesContainer);

    container.appendChild(tituloInstrucoes);
    container.appendChild(divInstrucoes);
}

function mostrarElementosInicio() {
    comecarjogo.classList.remove("hide");
    instrucaoQuizz.classList.remove("hide");
    conquistasQuizz.classList.remove("hide");
    tituloQuizz.classList.remove("hide");
}

function displayproximaquestao() {
    resetconfig();

    if (questoes.length === questaoatual) {
        return finaljogo();
    }

    questaotexto.textContent = questoes[questaoatual].questao;

    const questaoImagem = document.querySelector(".questao-imagem");
    if (questoes[questaoatual].imagem) {
        questaoImagem.src = questoes[questaoatual].imagem;
        questaoImagem.classList.remove("hide");
    } else {
        questaoImagem.classList.add("hide");
    }

    questoes[questaoatual].respostas.forEach(resposta => {
        const novaresposta = document.createElement("button");
        novaresposta.classList.add("button", "resposta");
        novaresposta.textContent = resposta.text;

        if (resposta.correct) {
            novaresposta.dataset.correct = resposta.correct;
        }
        respostacontainer.appendChild(novaresposta);

        novaresposta.addEventListener("click", selecionaresposta);
    });
}
function selecionaresposta(event) {
    const respostaclicada = event.target;

    // Adiciona a classe correta ou incorreta apenas ao botão clicado
    if (respostaclicada.dataset.correct) {
        respostaclicada.classList.add("correct");
        totalacertos++;
    } else {
        respostaclicada.classList.add("Incorrect");
    }

    // Desabilita todos os botões, mas mantém a cor apenas para o clicado
    document.querySelectorAll(".resposta").forEach(button => {
        button.disabled = true;
    });

    // Adiciona um delay de 4 segundos antes de ir para a próxima pergunta
    setTimeout(() => {
        questaoatual++;
        displayproximaquestao();
    }, 2000);  // 4000 milissegundos = 4 segundos
}

function resetconfig() {
    while (respostacontainer.firstChild) {
        respostacontainer.removeChild(respostacontainer.firstChild);
    }
    document.body.removeAttribute("class");
    proximapergunta.classList.add("hide");
}

function finaljogo() {
    const totalquestao = questoes.length;
    const performace = Math.floor(totalacertos * 100 / totalquestao);

    let messagem = "";
    switch (true) {
        case (performace > 90):
            messagem = "excelente";
            break;
        case (performace > 70):
            messagem = "Good vibes";
            break;
        case (performace > 50):
            messagem = "Melhore!!";
            break;
        case (performace > 30):
            messagem = "Você pode matar alguém no trânsito!!";
            break;
        case (performace < 30):
            messagem = "Você chegou no fundo do poço!!";
            break;
        default:
            messagem = "Negativo";
    }

    questaoconteiner.innerHTML = ` 
        <p class="Finalpp">Você acertou ${totalacertos} de ${totalquestao} perguntas!!
        <span>Resultado: ${messagem}</span>
        </p>
        <button onclick="window.location.reload()" class="button">
            Refazer teste
        </button>
    `;
}

function embaralharQuestoes(questoes) {
    for (let i = questoes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questoes[i], questoes[j]] = [questoes[j], questoes[i]];
    }
}

const questoes = [
   
    {
    questao: "Qual é a velocidade máxima permitida em uma rodovia?",
    imagem: "Imagens-EPTRAN/imagem 20.jpg",
    respostas: [
        { text: "80 km", correct: false },
        { text: "110 km", correct: true },
        { text: "60 km", correct: false },
        { text: "100 km", correct: false }
    ]
    },
    {
    questao: "Qual é a velocidade máxima permitida em uma zona de chuva?",
    imagem: "Imagens-EPTRAN/imagem 19.jpg",
    respostas: [
        { text: "90 km", correct: true },
        { text: "80 km", correct: false },
        { text: "60 km", correct: false },
        { text: "100 km", correct: false }
    ]
    },
    {
    questao: "Qual é a penalidade para dirigir sem habilitação?",
    imagem: "Imagens-EPTRAN/imagem 18.png",
    respostas: [
        { text: "Apenas multa", correct: false },
        { text: "Multa e suspensão da habilitação por 6 meses", correct: false },
        { text: "Multa e apreensão do veículo", correct: true },
        { text: "Apenas a suspensão da habilitação", correct: false }
    ]
    },
    {
    questao: "O que deve ser feito ao se aproximar de uma rotatória?",
    imagem: "Imagens-EPTRAN/imagem 17.jpg",
    respostas: [
        { text: "Acelerar e entrar sem parar", correct: false },
        { text: "Parar e ceder a passagem a quem já está na rotatória", correct: true },
        { text: "Entrar sem prestar atenção", correct: false },
        { text: "Parar e não ceder a passagem", correct: false }
    ]
    },
    {
        questao: "Qual é a distância mínima que você deve manter entre seu carro e o carro da frente?",
        imagem: "Imagens-EPTRAN/21.jfif",
        respostas: [
            { text: "1 segundo", correct: false },
            { text: "2 segundos", correct: true },
            { text: "5 metro", correct: false },
            { text: "10 segundos", correct: false }
        ]
    },
    {
        questao: "Como deve ser a sinalização ao mudar de faixa?",
        imagem: "Imagens-EPTRAN/imagem 16.jpg",
        respostas: [
            { text: "Usar a seta com antecedência", correct: true },
            { text: "Sem necessidade de sinalizar", correct: false },
            { text: "Apenas olhar no retrovisor", correct: false },
            { text: "Não sinalizar ", correct: false }
        ]
    },
    {
        questao: "O que significa uma luz vermelha intermitente?",
        imagem: "Imagens-EPTRAN/imagem 15.jfif",
        respostas: [
            { text: "Permissão para passar", correct: false },
            { text: "Pare e olhe", correct: false },
            { text: "Proibido passar", correct: true },
            { text: "Passe com velocidade", correct: false }
        ]
    },
    {
        questao: "Qual é a distância mínima para estacionar de uma esquina?",
        imagem: "Imagens-EPTRAN/imagem 13.jpg",
        respostas: [
            { text: "1 metro", correct: false },
            { text: "5 metros", correct: true },
            { text: "3 metros", correct: false },
            { text: "4 metros", correct: false }
        ]
    },
    {
        questao: "O que é um 'ponto cego'?",
        imagem: "Imagens-EPTRAN/imagem 14.jpg",
        respostas: [
            { text: "Área visível no retrovisor", correct: false },
            { text: "Área que não é visível pelos espelhos do carro", correct: true },
            { text: "Local onde não há sinalização", correct: false },
            { text: "Local onde nada é visível", correct: false }
        ]
    },
    {
        questao: "O que deve ser feito ao encontrar um veículo de emergência com sirene ligada?",
        imagem: "Imagens-EPTRAN/imagem 12.jpg",
        respostas: [
            { text: "Reduzir a velocidade e mudar de faixa, se possível", correct: true },
            { text: "Ignorar e continuar", correct: false },
            { text: "Aumentar a velocidade para sair da frente", correct: false },
            { text: "Não deixar o veículo ultrapassar", correct: false }
        ]
    } ,
    {
        questao: "O que significa a placa 'Cuidado: Crianças'?",
        imagem: "Imagens-EPTRAN/imagem 11.jfif",
        respostas: [
            { text: "Proibido entrar", correct: false },
            { text: "Área de pedestres", correct: false },
            { text: "Área com tráfego de crianças", correct: true },
            { text: "Área de saída e entrada de crianças nas escolas", correct: false }
        ]
    },
    {
        questao: "O que fazer ao se aproximar de uma faixa de pedestres?",
        imagem: "Imagens-EPTRAN/imagem 10.jpg",
        respostas: [
            { text: "Acelerar para passar antes", correct: false },
            { text: "Reduzir a velocidade e ceder a passagem", correct: true },
            { text: "Ignorar os pedestres", correct: false },
            { text: "Reduzir e não ceder a passagem", correct: false }
        ]
    },
    {
        questao: "Qual é a função do cinto de segurança?",
        imagem: "Imagens-EPTRAN/imagem 6.jpg",
        respostas: [
            { text: "Conforto do motorista", correct: false },
            { text: "Segurança em caso de colisão", correct: true },
            { text: "Proteger o banco", correct: false },
            { text: "Aumentar a eficiência do combustível", correct: false }
        ]
    },
    {
        questao: "Em caso de neblina, qual a velocidade recomendada?",
        imagem: "Imagens-EPTRAN/imagem 3.jpg",
        respostas: [
            { text: "Reduzir a velocidade e aumentar a distância do carro da frente", correct: true },
            { text: "Velocidade normal", correct: false },
            { text: "Aumentar a velocidade para passar rápido", correct: false },
            { text: "Velocidade normal aumentando a distância do carro da frente", correct: false }
        ]
    },
    {
        questao: "O que fazer ao se aproximar de um semáforo apagado?",
        imagem: "Imagens-EPTRAN/images (2).jfif",
        respostas: [
            { text: "Continuar sem parar", correct: false },
            { text: "Aumentar a velocidade", correct: false },
            { text: "Tratar como uma parada obrigatória", correct: true },
            { text: "Ignorar e passar", correct: false }
        ]
    },
    {
        questao: "Qual é a principal função do espelho retrovisor?",
        imagem: "Imagens-EPTRAN/images.jfif",
        respostas: [
            { text: "Melhorar a estética do carro", correct: false },
            { text: " Permitir a visão traseira do veículo", correct: true },
            { text: "Para se olhar", correct: false },
            { text: "Reduzir o consumo de combustível", correct: false }
        ]
    },
    {
        questao: "O que deve ser feito se seu veículo apresentar falha mecânica?",
        imagem: "Imagens-EPTRAN/imagem 4.jpg",
        respostas: [
            { text: "Parar no meio da estrada", correct: false },
            { text: "Encostar em um lugar seguro e sinalizar", correct: true },
            { text: "Tentar consertar no local", correct: false },
            { text: "Tentar empurrar o carro até um local de conserto", correct: false }
        ]
    },
    {
        questao: " O que é obrigatório ao conduzir à noite?",
        imagem: "Imagens-EPTRAN/imagem 5.jfif",
        respostas: [
            { text: "Faróis baixos e altos quando necessário", correct: true },
            { text: "Apenas os faróis baixos", correct: false },
            { text: "Luzes de emergência", correct: false },
            { text: "É necessário deixar o pisca alerta ligado", correct: false }
        ]
    },
    {
            questao: "O que significa a luz verde do semáforo?",
            imagem: "Imagens-EPTRAN/imagem 9.jpeg",
            respostas: [
                { text: "Prosseguir livremente", correct: true },
                { text: "Parar e aguardar", correct: false },
                { text: "Prosseguir com cautela", correct: false },
                { text: "Parar e olhar", correct: false }
            ]
        },
        {
                questao: "O que indica uma placa de 'Cuidado: Obras'?",
                imagem: "Imagens-EPTRAN/imagem 8.png",
                respostas: [
                    { text: "Zona de obras em andamento, com risco de detritos", correct: true },
                    { text: "Área de estacionamento", correct: false },
                    { text: "Proibição de entrar", correct: false },
                    { text: "Proibido a ultrapassagem", correct: false }
                ]
        },
        {
        questao: "O que deve ser feito em caso de derrapagem?",
        imagem: "Imagens-EPTRAN/imagem 7.jpg",
        respostas: [
            { text: "Direcionar o volante na direção da curva", correct: true },
            { text: "Acelerar para ganhar controle", correct: false },
            { text: "Frear bruscamente", correct: false },
            { text: "Puxar o freio de mão", correct: false }
        ]
        }
]

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
        questao: "Qual a diferença entre placas de regulamentação e advertência?",
        imagem: "imagens-perguntas/placas.jpg",
        respostas: [
            { text: "Regulamentação: regras; Advertência: alerta.", correct: true },
            { text: "Regulamentação: quadradas; Advertência: redondas.", correct: false },
            { text: "Regulamentação: rodovias; Advertência: cidades.", correct: false },
            { text: "Regulamentação: escuras; Advertência: claras.", correct: false }
        ]
    },
    {
        questao: "Significado da placa 'Atenção: Pista Escorregadia'?",
        imagem: "imagens-perguntas/pista.jpg",
        respostas: [
            { text: "Indica pista escorregadia por chuva, óleo, gelo.", correct: true },
            { text: "Alerta sobre buracos na estrada.", correct: false },
            { text: "Indica redução de velocidade em neblina.", correct: false },
            { text: "Pede que os motoristas verifiquem a pista.", correct: false }
        ]
    },
    {
        questao: "O que implica a placa de 'Proibido Ultrapassar'?",
        imagem: "imagens-perguntas/ultrapassagem.png",
        respostas: [
            { text: "Proíbe ultrapassagem por segurança na via.", correct: true },
            { text: "Permite ultrapassar veículos pesados.", correct: false },
            { text: "Exige distância de 10 metros entre veículos.", correct: false },
            { text: "Permite ultrapassar com sinalização.", correct: false }
        ]
    },
    {
        questao: "Como a placa 'Dê a Preferência' funciona com semáforos?",
        imagem: "imagens-perguntas/dê a preferência.png",
        respostas: [
            { text: "Não afeta cruzamentos com semáforo.", correct: true },
            { text: "Deve ser respeitada mesmo com o semáforo verde.", correct: false },
            { text: "Aplica-se sempre na via preferencial.", correct: false },
            { text: "Ignorável em estrada principal.", correct: false }
        ]
    },
    {
        questao: "Implicações legais por ignorar a placa de 'Pare'?",
        imagem: "imagens-perguntas/pare.jpg",
        respostas: [
            { text: "Multa, pontos e possível responsabilidade em acidentes.", correct: true },
            { text: "Apenas um aviso verbal.", correct: false },
            { text: "Sem implicações legais, só recomendação.", correct: false },
            { text: "Advertência sem penalidades financeiras.", correct: false }
        ]
    },
    {
        questao: "O que define 'zonas escolares'?",
        imagem: "imagens-perguntas/escolar.png",
        respostas: [
            { text: "Área com sinalização e limite de velocidade reduzido.", correct: true },
            { text: "Área para estacionamento de ônibus.", correct: false },
            { text: "Área onde veículos não entram.", correct: false },
            { text: "Área sem sinalização específica.", correct: false }
        ]
    },
    {
        questao: "O que a placa de 'Desvio' indica?",
        imagem: "imagens-perguntas/desvio.png",
        respostas: [
            { text: "Obstrução na via, siga rota alternativa.", correct: true },
            { text: "Via principal em boas condições, siga em frente.", correct: false },
            { text: "Apenas informativa, sem ações exigidas.", correct: false },
            { text: "Via em construção, parar.", correct: false }
        ]
    },
    {
        questao: "Placa 'Limite de Velocidade' em áreas urbanas vs. rodovias?",
        imagem: "imagens-perguntas/velocidades.jpg",
        respostas: [
            { text: "Protege pedestres na cidade; regula tráfego em rodovias.", correct: true },
            { text: "Limite de velocidade maior em áreas urbanas.", correct: false },
            { text: "Mais importante em rodovias.", correct: false },
            { text: "Opcional em áreas urbanas.", correct: false }
        ]
    },
    {
        questao: "Como 'Proibido Estacionar' se relaciona com o zoneamento?",
        imagem: "imagens-perguntas/estacionar.png",
        respostas: [
            { text: "Melhora circulação em áreas de tráfego denso.", correct: true },
            { text: "Somente em áreas residenciais.", correct: false },
            { text: "Aplicada em todas as áreas da cidade.", correct: false },
            { text: "Sem relação com zoneamento.", correct: false }
        ]
    },
    {
        questao: "Significado da placa de 'Rotatória'?",
        imagem: "imagens-perguntas/rotatoria.png.png",
        respostas: [
            { text: "Veículos na rotatória têm prioridade.", correct: true },
            { text: "Parar sempre antes de entrar.", correct: false },
            { text: "Rotatória é opcional.", correct: false },
            { text: "Só em áreas rurais.", correct: false }
        ]
    },
    {
        questao: "Como a placa 'Trânsito Livre' afeta o tráfego?",
        imagem: "imagens-perguntas/transito livre.png",
        respostas: [
            { text: "Permite prosseguir sem parar.", correct: true },
            { text: "Permite ignorar sinais vermelhos.", correct: false },
            { text: "Permite acelerar sem limites.", correct: false },
            { text: "Apenas informativa.", correct: false }
        ]
    },
    {
        questao: "O que implica a placa de 'Curva Perigosa'?",
        imagem: "imagens-perguntas/curva perigosa.png",
        respostas: [
            { text: "Curva suave, sem precauções.", correct: false },
            { text: "Curva acentuada, reduzir velocidade.", correct: true },
            { text: "Só em estradas de terra.", correct: false },
            { text: "Não tem relação com velocidade.", correct: false }
        ]
    },
    {
        questao: "Diferenças entre sinalização horizontal e vertical?",
        imagem: "imagens-perguntas/sinalização horizontal e vertical.jpg",
        respostas: [
            { text: "Horizontal são placas em postes.", correct: false },
            { text: "Horizontal são marcas no pavimento.", correct: true },
            { text: "Vertical é mais importante.", correct: false },
            { text: "São intercambiáveis.", correct: false }
        ]
    },
    {
        questao: "Responsabilidade ao ver placa de 'Cuidado: Animais na Pista'?",
        imagem: "imagens-perguntas/animais na pista.jpg",
        respostas: [
            { text: "Ignorar a placa.", correct: false },
            { text: "Reduzir a velocidade e preparar-se para parar.", correct: true },
            { text: "Apenas um alerta.", correct: false },
            { text: "Acelerar para evitar acidentes.", correct: false }
        ]
    },
    {
        questao: "Interpretação da placa 'Cuidado: Trânsito Intenso'?",
        imagem: "imagens-perguntas/transito intenso.png",
        respostas: [
            { text: "Trânsito fluindo bem.", correct: false },
            { text: "Possíveis congestionamentos.", correct: true },
            { text: "É irrelevante.", correct: false },
            { text: "Trânsito intenso é temporário.", correct: false }
        ]
    },
    {
        questao: "Indicação da placa de 'Vire à Direita'?",
        imagem: "imagens-perguntas/vire a direita.jpg",
        respostas: [
            { text: "Rua sem saída à direita.", correct: false },
            { text: "Virar à direita na próxima interseção.", correct: true },
            { text: "Sem impacto no fluxo.", correct: false },
            { text: "Apenas informativa.", correct: false }
        ]
    },
    {
        questao: "Critérios para instalação da placa de 'Acesso Restrito'?",
        imagem: "imagens-perguntas/acesso restrito.jpg",
        respostas: [
            { text: "Instalada em qualquer área comercial.", correct: false },
            { text: "Depende da necessidade de restrição de acesso.", correct: true },
            { text: "Somente em áreas residenciais.", correct: false },
            { text: "É opcional.", correct: false }
        ]
    },
    {
        questao: "Placas de trânsito e acessibilidade?",
        imagem: "imagens-perguntas/acessibilidade.jpg",
        respostas: [
            { text: "Não consideram acessibilidade.", correct: false },
            { text: "Incluem braille e alto-relevo.", correct: true },
            { text: "Feitas apenas em tamanhos grandes.", correct: false },
            { text: "Somente para motoristas.", correct: false }
        ]
    },
    {
        questao: "Significado da placa de 'Proibido Reverter'?",
        imagem: "imagens-perguntas/proibido reverter.png",
        respostas: [
            { text: "Reverter em vias congestionadas.", correct: false },
            { text: "Reversão proibida em áreas de alto tráfego.", correct: true },
            { text: "É irrelevante.", correct: false },
            { text: "Só se aplica a veículos comerciais.", correct: false }
        ]
    },
    {
        questao: "Legislação de trânsito sobre 'Via de Pedestre' em outros países?",
        imagem: "imagens-perguntas/pedestres.png",
        respostas: [
            { text: "É uniforme em todos os países.", correct: false },
            { text: "Varia em símbolos, cores e regras.", correct: true },
            { text: "Difere apenas em países em desenvolvimento.", correct: false },
            { text: "Não é regulada por lei.", correct: false }
        ]
    }
]
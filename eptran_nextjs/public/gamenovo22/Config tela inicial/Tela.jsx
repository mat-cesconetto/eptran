let selectedCharacter = null; // Variável para armazenar o personagem selecionado

// Evento para mostrar a seleção de personagens ao clicar em "Iniciar Game"
document.getElementById("startButton").addEventListener("click", function() {
    document.getElementById("startButton").style.display = "none";
    document.getElementById("characterSelection").style.display = "flex";
});

// Adiciona event listeners para as imagens de personagens
document.getElementById("char1").addEventListener("click", function() {
    selectCharacter("char1");
});
document.getElementById("char2").addEventListener("click", function() {
    selectCharacter("char2");
});
document.getElementById("char3").addEventListener("click", function() {
    selectCharacter("char3");
});
document.getElementById("char4").addEventListener("click", function() {
    selectCharacter("char4");
});


// Função para destacar o personagem selecionado
function selectCharacter(characterId) {
    // Se já houver um personagem selecionado, remova a borda branca
    if (selectedCharacter) {
        document.getElementById(selectedCharacter).classList.remove('selected');
    }

    // Destacar o personagem selecionado com borda branca
    selectedCharacter = characterId;
    document.getElementById(characterId).classList.add('selected');

    // Mostrar o botão de confirmar após a seleção do personagem
    document.getElementById("confirmButton").style.display = "block";
}

// Evento para confirmar a seleção e iniciar o jogo
document.getElementById("confirmButton").addEventListener("click", function() {
    if (selectedCharacter) {
        // Redireciona para o jogo com o personagem selecionado como parâmetro na URL
        window.location.href = `game.html?character=${selectedCharacter}`;
    } else {
        alert("Por favor, selecione um personagem!");
    }
});






// Opcional: se quiser adicionar mais controle ou animações
const infoIcon = document.getElementById("infoIcon");
const infoWidget = document.getElementById("infoWidget");

infoIcon.addEventListener("mouseover", () => {
    infoWidget.style.display = "block";  // Exibe o widget
});

infoIcon.addEventListener("mouseout", () => {
    infoWidget.style.display = "none";   // Esconde o widget
});

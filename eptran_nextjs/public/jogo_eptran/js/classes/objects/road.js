class Road extends Object {
    static tilling = 0.05; // Fator de repetição da textura
    static step = 1; // Distância entre as linhas
    static size = 2; // Largura da pista
    static texture_offset = 0; // Offset da textura baseado no tempo

    init() {
        this.sprite = new Sprite('img/rua-textura.png', 32, 1);
    }

    update(dt) {
        super.update(dt);
        Road.texture_offset += dt * World.velocity; // Atualiza o deslocamento da textura
    }

    render() {
        let bottom = Screen.height - this.sprite.height;
        const color1 = "rgb(85, 170, 85)";   // Verde claro
        const color2 = "rgb(60, 155, 60)";  // Verde escuro

        for (let i = World.centerY - 10; i > 0; i -= Road.step) {
            this.drawRightSide(i);
            this.drawLeftSide(i);
            
            let coeficiente = 1 - i / World.centerY;

            Screen.ctx.beginPath();
            Screen.ctx.rect(0, Screen.height - Math.floor(i), Screen.width, 1);

            // Alterna entre duas cores para simular gramado
            const fillStyle = (Math.floor((Road.texture_offset + i * Road.tilling / coeficiente / World.centerY * Screen.height) / 16) % 2 === 0)
                ? color1
                : color2;

            Screen.ctx.fillStyle = fillStyle;
            Screen.ctx.fill();

        }
    }

    drawRightSide(i) {
        let coeficiente = 1 - i / World.centerY;

        // Define as coordenadas e escalas baseadas no coeficiente e offset
        this.sprite.draw(
            World.centerX - World.positionX * coeficiente + this.sprite.width * Road.size * 0.5 * coeficiente + World.curve(i), 
            Screen.height - i, 
            0, 
            coeficiente * Road.size, 
            1, 
            0,
            Math.floor((Road.texture_offset + i * Road.tilling / coeficiente / World.centerY * Screen.height)) % 16
        );
    }

    drawLeftSide(i) {
        let coeficiente = 1 - i / World.centerY;

        // Renderiza o lado esquerdo invertendo a escala horizontal
        this.sprite.draw(
            World.centerX - World.positionX * coeficiente - this.sprite.width * Road.size * 0.5 * coeficiente + World.curve(i), 
            Screen.height - i, 
            0, 
            -coeficiente * Road.size, 
            1, 
            0,
            Math.floor((Road.texture_offset + i * Road.tilling / coeficiente / World.centerY * Screen.height)) % 16
        );
    }
}

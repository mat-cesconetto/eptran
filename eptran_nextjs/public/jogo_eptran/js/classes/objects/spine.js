let spine_sprite = new Sprite('img/lombada.png', 1, 1, 1.4);

var spine_width;
var spine_height;
sprite.onLoad(() => {
    spine_width = sprite.width;
    spine_height = sprite.height;
});

class Spine extends Obstacle{
    static maxVelocity = 80;
    init(){
        super.sprite = spine_sprite;
        this.outsideOfScreen = this.addComponent(new OutsideOfScreen());
        this.collider = this.addComponent(new Collider());
        this.fadeinlerp = 0;
        this.sprite.onLoad(() => this.start());
        this.distanceSize = Transform.coeficienteVertical(this.y, this.z) * .5;
    }
    update(dt){
        super.update(dt);

    }
    onCollision(dt){
        World.currentScene.car.offsetY = -1;
        if (World.velocity > Spine.maxVelocity)
            World.currentScene.endGame();
    }
    start(){
        this.width = this.sprite.width;
        this.height = this.sprite.height;
        this.offsetY = - this.height * .025;
        console.log(this.width);
        this.frame = [0,0];
        this.velocity_x = 0;
        this.velocity_y = 0;
        
        this.collider.width = this.width * 1.5;
        this.collider.height = this.height * .01;
        this.collider.oy = this.height * .2;
    }
    render(){
        super.render();
        if (World.velocity > Spine.maxVelocity && this.y < 200)
            this.drawBreakWarning();
    }

    drawBreakWarning(){
        Screen.ctx.font = "30px Arial"; // Define o tamanho da fonte e o tipo
        Screen.ctx.fillStyle = "white"; // Define a cor do texto (branco)
        Screen.ctx.textAlign = "center"; // Alinha o texto à esquerda
        Screen.ctx.textBaseline = "top"; // Alinha o texto ao topo (canto superior esquerdo)
        Screen.ctx.fillText("Reduza a velocidade", Screen.width * .5, Screen.height *.25 - 20); // Posição do texto (10, 10) no canto superior esquerdo
    }
}
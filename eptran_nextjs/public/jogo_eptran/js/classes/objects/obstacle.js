var sprite = new Sprite('img/cone.png', 1, 1, 1/2);

var width;
var height;
sprite.onLoad(() => {
    width = sprite.width;
    height = sprite.height;
});

class Obstacle extends Object{
    init(){
        this.sprite = sprite;
        this.collider = this.addComponent(new Collider());
        this.outsideOfScreen = this.addComponent(new OutsideOfScreen());
        this.fadeinlerp = 0;
        this.distanceSize = Transform.coeficienteVertical(this.y, this.z) * .5;
        this.sprite.onLoad(() => this.start());
    }
    start(){
        this.width = width / sprite.size;
        this.height = height / sprite.size;
        this.offsetY = - this.height / 80
        this.collider.width = width * 1.3;
        this.collider.height = height * .01;
        this.collider.oy = height * .12;
    }
    update(dt){
        super.update(dt);
        this.fadeinlerp = Math.min(1, this.fadeinlerp + dt * 5);
        this.distanceSize = Transform.coeficienteVertical(this.y, this.z) * .5;
        this.y -= World.velocity * .4 * dt;

        if (this.collider.collidesWith(World.currentScene.car.collider))
            this.onCollision(dt);
    }
    onCollision(dt){
        World.currentScene.endGame();
    }
    render(){
        this.sprite.draw(
            Transform.projectedX(this.x, this.y, this.z), 
            Transform.projectedY(this.x, this.y, this.z + this.offsetY), 
            this.r, 
            this.sx * this.distanceSize * this.fadeinlerp,
            this.sy * this.distanceSize * this.fadeinlerp,
            0,0
        );
    }
}

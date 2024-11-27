var animal_sprite = new Sprite('img/spriteSheets/animal.png', 2, 2, 1);

var width;
var height;
sprite.onLoad(() => {
    width = sprite.width;
    height = sprite.height;
});

class Animal extends Obstacle{
    init(){
        this.sprite = animal_sprite;
        this.animator = this.addComponent(new Animator(0, -100));
        this.animator.addAnimation("parado",
            new Animation(
            0.5, animal_sprite,
            [[0,0]]
        ));
        this.direction = Math.random() < 0.5 ? -1 : 1;
        this.animator.sx = this.direction;
        this.animator.addAnimation("andando",
        new Animation(
            0.2, animal_sprite,
            [
                [1,0], 
                [0,1],
                [1,1],
                [0,1]
            ]
        ));
        this.animator.playAnimation("parado");
        this.fadeinlerp = 0;
        this.collider = this.addComponent(new Collider());
        this.outsideOfScreen = this.addComponent(new OutsideOfScreen());
        this.collider.width = 100;
        this.collider.height = 1;
        this.width = width;
        this.height = height;
        this.distanceSize = Transform.coeficienteVertical(this.y, this.z) * .5;
        this.speed = 100;
        this.moving = false;
    }
    update(dt){
        super.update(dt);
        this.animator.sx = this.fadeinlerp * this.direction;
        this.animator.sy = this.fadeinlerp;
        this.distanceSize = Transform.coeficienteVertical(this.y, this.z) * .5;
        if (!this.moving){
            if (this.moving != this.y < 50){
                this.animator.playAnimation("andando");
            }
        }
        this.moving = this.y < 50;

        if (this.moving)
            this.x += this.speed * dt * 2 * this.direction;
        

        if (this.y + 5 < 0)
            this.deleteMe = true;
    }
    render(){
        this.animator.render()
    }
}

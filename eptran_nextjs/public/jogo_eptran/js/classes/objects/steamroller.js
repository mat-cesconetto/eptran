var steamroller_sprite = new Sprite('img/spriteSheets/steamroller.png', 2, 2);

class SteamRoller extends Obstacle{
    init(){
        this.sprite = steamroller_sprite;
        this.outsideOfScreen = this.addComponent(new OutsideOfScreen());
        this.collider = this.addComponent(new Collider());
        this.animator = this.addComponent(new Animator(0,-150));
        this.animator.addAnimation("parado", 
        new Animation(
            0.2, this.sprite,
            [
                [0,0],
                [1,0],
                [0,1],
                [1,1],
                [0,1],
                [1,0],
            ]
        ));
        this.animator.playAnimation("parado");
        this.position = this.y;
        this.sin_position = 0;

        this.sprite.onLoad(() => this.start());
        this.fadeinlerp = 0;
    }
    start(){
        this.width = this.sprite.width;
        this.height = this.sprite.height;
        console.log(this.width);
        this.frame = [0,0];
        this.velocity_x = 0;
        this.velocity_y = 0;
        
        this.collider.width = this.width * 1;
        this.collider.height = this.height * .020;
        this.collider.oy = this.height * .02;
    }
    update(dt){
        super.update(dt);
        this.animator.sx = this.fadeinlerp;
        this.animator.sy = this.fadeinlerp;
        this.position -= World.velocity * .4 * dt;
        this.fadeinlerp = Math.min(1, this.fadeinlerp + dt * 5);
        this.sin_position += dt;
        this.y = this.position - Math.sin(this.sin_position / 5) * 30;
    }
    render(){
        this.animator.render();
    }
}
var miscellaneous_sprite = new Sprite('img/spriteSheets/others.png', 2, 2);

class Miscellaneous extends Obstacle {

    constructor(x, y, z, r, sx, sy, cordx, cordy){
        super(x, y, z, r, sx, sy)
        this.cordx = cordx;
        this.cordy = cordy;
    }

    init(){
        this.sprite = miscellaneous_sprite;
        this.collider = this.addComponent(new Collider());
        this.outsideOfScreen = this.addComponent(new OutsideOfScreen());
        this.fadeinlerp = 0;
        this.distanceSize = Transform.coeficienteVertical(this.y, this.z) * .5;
        this.sprite.onLoad(() => this.start());
    }
    start(){
        super.start();
        this.offsetY = - 1.1 * this.sy;
    }
    render(){
        this.sprite.draw(
            Transform.projectedX(this.x, this.y, this.z), 
            Transform.projectedY(this.x, this.y, this.z + this.offsetY), 
            this.r, 
            this.sx * this.distanceSize * this.fadeinlerp,
            this.sy * this.distanceSize * this.fadeinlerp,
            this.cordx,
            this.cordy
        );
    }
}
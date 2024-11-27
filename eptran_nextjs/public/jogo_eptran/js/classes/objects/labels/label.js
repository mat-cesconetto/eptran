class Label extends Obstacle{
    init(){
        super.sprite = this.getSprite();
        this.outsideOfScreen = this.addComponent(new OutsideOfScreen());
        this.collider = this.addComponent(new Collider());
        this.fadeinlerp = 0;
        this.sprite.onLoad(() => this.start());
        this.distanceSize = Transform.coeficienteVertical(this.y, this.z) * .5;
    }
    getSprite(){
        return new Sprite();
    }
    start(){
        this.width = this.sprite.width;
        this.height = this.sprite.height;
        this.offsetY = - this.height * .025;
        console.log(this.width);
        this.frame = [0,0];
        this.velocity_x = 0;
        this.velocity_y = 0;
        
        this.collider.width = this.width;
        this.collider.height = this.height * .01;
        this.collider.oy = this.height * .05;
    }
}
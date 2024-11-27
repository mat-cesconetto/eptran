class Animator extends Component{
    constructor(offsetX = 0, offsetY = 0, scaleX = 1, scaleY = 1){
        super();

        this.animations = {};
        this.currentAnimation = null;
        this.ox = offsetX;
        this.oy = offsetY;
        this.sx = scaleX;
        this.sy = scaleY;
    }

    update(dt) {
        this.currentAnimation.update(dt);
    }

    render(){
        let p = this.parent;
        this.currentAnimation.draw(
            p.x, p.y, p.z,
            p.r, p.sx * this.sx, p.sy * this.sy,
            this.ox, this.oy
        );
    }

    playAnimation(_name) {
        this.currentAnimation?.resetTime();
        this.currentAnimation = this.animations[_name];
    }

    addAnimation(_name, animation){
        this.animations[_name] = animation;
    }
}
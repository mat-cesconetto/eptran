class Background extends Object {
    init(){
        super.sprite = new Sprite('img/background.png', 1, 1, 1/2);
        this.outsideOfScreen = this.addComponent(new OutsideOfScreen());
        this.collider = this.addComponent(new Collider());

        this.sprite.onLoad(() => {
            this.width = this.sprite.width;
            this.height = this.sprite.height;
            this.collider.width = this.width * .1;
            this.collider.height = this.height * .05;
        });
    }
    render(){
        let roundedPosition = Math.round(World.background_position);
        let size = .25;
        for (let i = -this.width * 3 / 2; i < Screen.width + this.width * 3 / 2; i += this.width * size){
            this.sprite.draw(
                i + roundedPosition,
                10 -this.height * size / 2 + World.centerY + 4,
                0, size, size,
                0, 0
            );
        }
    }
}
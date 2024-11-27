class Car extends Object{
    init(){
        this.sprite = new Sprite('img/spriteSheets/carro.png', 2, 2);
        this.collider = this.addComponent(new Collider());
        this.outsideOfScreen = this.addComponent(new OutsideOfScreen());

        this.sprite.onLoad(() => {
            this.width = this.sprite.width;
            this.height = this.sprite.height;
            this.frame = [0,0];
            this.velocity_x = 0;
            this.velocity_y = 0;
            this.speed = 150;
            this.offsetY = 0;
            
            this.collider.width = this.width * .75;
            this.collider.height = this.height * .01;
            this.collider.oy = this.height * .022;
            this.collider.ox = -this.height * World.curveLevel;
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === 'a' || event.key === 'ArrowLeft') {
                this.input_left = true;
            }
            if (event.key === 'd' || event.key === 'ArrowRight') {
                this.input_right = true;
            }
            if (event.key === 'w' || event.key === 'ArrowUp') {
                this.input_up = true;
            }
            if (event.key === 's' || event.key === 'ArrowDown') {
                this.input_down = true;
            }
            if (event.key === 'e') {
                this.look_up = true;
            }
            if (event.key === 'q') {
                this.look_down = true;
            }
        });
      
        window.addEventListener('keyup', (event) => {
            if (event.key === 'a' || event.key === 'ArrowLeft') {
                this.input_left = false;
            }
            if (event.key === 'd' || event.key === 'ArrowRight') {
                this.input_right = false;
            }
            if (event.key === 'w' || event.key === 'ArrowUp') {
                this.input_up = false;
            }
            if (event.key === 's' || event.key === 'ArrowDown') {
                this.input_down = false;
            }
            if (event.key === 'e') {
                this.look_up = false;
            }
            if (event.key === 'q') {
                this.look_down = false;
            }
        });
    }

    update(dt){
        if (this.input_left && this.input_right || !(this.input_left || this.input_right))
            this.velocity_x = Math.lerp(this.velocity_x, 0, 4 * dt);
        else if (this.input_left){
            this.velocity_x = Math.lerp(this.velocity_x, 1, 4 * dt);
        }
        else if (this.input_right){
            this.velocity_x = Math.lerp(this.velocity_x, -1, 4 * dt);
        }

        if (this.velocity_x < .5 && this.velocity_x > -.5)
            this.frame = [0,0];
        else if (this.velocity_x < -.5)
            this.frame = [1,0];
        else
            this.frame = [0,1];

        if (this.input_up && this.input_down || !(this.input_up || this.input_down)){
            this.velocity_y = Math.lerp(this.velocity_y, 0, .4 * dt);
        }
        else if (this.input_up) {
            this.velocity_y = Math.lerp(this.velocity_y, 1, .1 * dt);
        }
        else if (this.input_down) {
            this.velocity_y = Math.lerp(this.velocity_y, 0, .8 * dt);
        }
        this.offsetY = Math.lerp(this.offsetY, 0, 10 * dt)
        this.x += dt * 400 * this.velocity_x * this.velocity_y;
        this.x += dt * 12.5 * World.GetCurveFactor() * this.velocity_y;
        World.background_position = (World.background_position - dt * 10 * World.GetCurveFactor() * this.velocity_y) % this.width;
        World.positionX = -this.x;
        World.velocity = this.velocity_y * this.speed;
        this.nsx = this.sx * Transform.coeficienteVertical(this.y, this.z);
        this.nsy = this.sy * Transform.coeficienteVertical(this.y, this.z);
    }

    render(){
        this.sprite.draw(
            Transform.projectedX(this.x, this.y, this.z),
            Transform.projectedY(this.x, this.y, this.z + this.offsetY),
            0, this.nsx, this.nsy, 
            this.frame[0], this.frame[1]
        );
    }
}
class Animation {
    constructor(frameDuration, sprite, frames){
        this.frameDuration = frameDuration;
        this.animationTime = 0;
        this.sprite = sprite;
        this.frames = frames;
    }

    update(dt){
        this.animationTime += dt;
    }

    resetTime() {
        this.animationTime = 0;
    }; 

    draw(x, y, z, r = 0, sx = 1, sy = 1, offsetX = 0, offsetY = 0){
        sx = sx || 1;
        sx = sx || 1;
        let currentFrame = Math.floor(this.animationTime / this.frameDuration) % this.frames.length;
        this.distanceSize = Transform.coeficienteVertical(y, z) * .5;
        this.sprite.draw(
            Transform.projectedX(x + offsetX, y, z),
            Transform.projectedY(x + offsetX, y, z) + offsetY * Transform.coeficienteVertical(y, z),
            r, sx * this.distanceSize, sy * this.distanceSize, 
            this.frames[currentFrame][0] / this.sprite.size, this.frames[currentFrame][1] / this.sprite.size
        );
    }
}
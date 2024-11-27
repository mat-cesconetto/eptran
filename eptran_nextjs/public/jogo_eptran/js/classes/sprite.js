class Sprite {
    constructor(imageURL, rows, cols, size = 1) {
        this.img = new Image();
        this.rows = rows;
        this.cols = cols;
        this.size = size;
        this.isLoaded = false;
        this.loadCallbacks = [];
        
        this.img.onload = () => {
            this.sprite_pixel_width = this.img.width * size / cols;
            this.sprite_pixel_height = this.img.height * size / rows;
            this.width = this.sprite_pixel_width * Screen.pixelSize;
            this.height = this.sprite_pixel_height * Screen.pixelSize;
            this.isLoaded = true;
            
            // Executar callbacks registrados
            this.loadCallbacks.forEach(callback => callback(this));
            this.loadCallbacks = [];
            
            Loader.incrementProgress();
        };
        
        this.img.src = imageURL;
        Loader.addToList();
    }

    onLoad(callback) {
        if (this.isLoaded) {
            callback(this);
        } else {
            this.loadCallbacks.push(callback);
        }
    }

    draw(px, py, r, sx = 1, sy = 1, fx = 0, fy = 0) {
        if (!this.isLoaded) return;
        
        Screen.ctx.save();
        Screen.ctx.translate(px, py);
        Screen.ctx.rotate(r);
        Screen.ctx.scale(sx, sy);
    
        Screen.ctx.drawImage(
            this.img,
            fx * this.sprite_pixel_width, fy * this.sprite_pixel_height,
            this.sprite_pixel_width / this.size, this.sprite_pixel_height / this.size,
            -this.width / 2, -this.height / 2,
            this.width, this.height
        );/*
        Screen.ctx.beginPath();
        Screen.ctx.rect(
            -this.width / 2, -this.height / 2,
            this.width, this.height
        );
        Screen.ctx.stroke();*/

        Screen.ctx.restore();
    }
}
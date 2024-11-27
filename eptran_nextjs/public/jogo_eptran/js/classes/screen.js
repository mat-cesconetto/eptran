class Screen {
    static canvas = null;
    static ctx = null;
    static width;
    static height;

    constructor(string) {
        if (!Screen.canvas) {
            Screen.canvas = document.querySelector(string);
        }
        Screen.ctx = Screen.canvas.getContext("2d");
        
        Screen.canvas.width = 1024;
        Screen.canvas.height = 512;

        Screen.pixelSize = 4;

        Screen.width = Screen.canvas.width;
        Screen.height = Screen.canvas.height;

        Screen.ctx.mozImageSmoothingEnabled = false;   // Firefox
        Screen.ctx.webkitImageSmoothingEnabled = false; // Safari e outros baseados no WebKit
        Screen.ctx.msImageSmoothingEnabled = false;    // IE e Edge
        Screen.ctx.imageSmoothingEnabled = false;      // Padrão para todos os navegadores
        Screen.clear = this.clear; 
    }

    clear(){
        Screen.ctx.beginPath();
        Screen.ctx.rect(0, 0, canvas.width, canvas.height);
        Screen.ctx.fillStyle = "rgb(102, 183, 255)";
        Screen.ctx.fill();
    }
}

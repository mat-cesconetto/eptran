class Collider extends Component{
    start(){
        this.ox = 0;
        this.oy = 0;
        this.sx = 0;
        this.sz = 1;
        this.sy = 1;
        this.transform = this.parent.transform;
    }
    
    collidesWith(collider) {
        let top_1 = this.parent.y + this.oy - this.height / 2;
        let bottom_1 = this.parent.y  + this.oy + this.height / 2;
        let left_1 = this.parent.x + this.ox - this.width / 2;
        let right_1 = this.parent.x + this.ox + this.width / 2;
        
        let top_2 = collider.parent.y + collider.oy - collider.height / 2;
        let bottom_2 = collider.parent.y + collider.oy + collider.height / 2;
        let left_2 = collider.parent.x + collider.ox - collider.width / 2;
        let right_2 = collider.parent.x + collider.ox + collider.width / 2 ;
    
        // Verifica se há uma colisão no eixo X e Y
        return (right_1 > left_2 && left_1 < right_2 && bottom_1 > top_2 && top_1 < bottom_2)
    }

    drawGizmos(){
        Screen.ctx.strokeStyle = "green";
        Screen.ctx.beginPath();
        Screen.ctx.rect(
            this.parent.x + this.ox + World.centerX - this.width / 2,
            (this.parent.y + this.oy - this.height / 2) * 10,
            this.width, this.height * 10);
        Screen.ctx.stroke();
    }
}
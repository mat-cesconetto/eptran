const inclinacao = World.inclinacao;

class Transform {
    static coeficienteHorizontal(x, y) {
        return x / y;
    }

    static coeficienteVertical(y, z) {
        return z / y;
    }

    static projectedX(x, y, z){
        let altura = this.projectedY(x, y, z);
        let coeficiente = altura / World.centerY - 1;
        //return World.centerX + World.curve((1 - coeficiente) * 250);
        return World.centerX - (World.positionX + x) * coeficiente + World.curve((1 - coeficiente) * World.centerY);
    }

    static projectedY(x, y, z){
        z = z || 0;
        let altura = 1 - (z / y);
        return Screen.height - World.centerY * altura;
    }
}  
class World {
    static velocity = 0;
    static inclinacao = 700;
    static angleZ = 0;
    static positionX = 0;
    static centerX = Screen.width / 2;
    static centerY = Screen.height / 2;
    static curveLevel = 0;
    static observerPosition = 100;
    static curveStart = 250;
    static background_position = 0;

    static update(dt){

    }

    static curve(y){
        return World.curveFunction(y) - World.curveFunction(World.observerPosition);
    }

    static GetCurveFactor(){ 
        if (World.curveStart > World.observerPosition)
            return 0;
        return World.curveLevel * (Math.pow(World.curveStart - World.observerPosition, 2) * World.curveStart / World.observerPosition);
    }

    static curveFunction(y){
        y = Math.pow(World.centerY + 1, y/World.centerY) - 1;
        if (y < World.curveStart || World.curveStart <= 0)
            return 0;
        return Math.pow(y - World.curveStart, 2) * World.curveLevel 
             * Math.min(1, World.curveStart / World.observerPosition);
    }

    static resetCurve(){
        World.curveStart = World.centerY;
    }
}   
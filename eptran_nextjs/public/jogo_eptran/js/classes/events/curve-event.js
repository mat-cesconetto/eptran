class CurveEvent extends State {
    constructor(curve){
        super();
        this.curve = Math.lerp(-2, 2, curve);
        this.duration = 3000;
    }

    start() {
        console.log("Curve event Start");
        World.curveLevel = this.curve/50;
        World.resetCurve();
    }

    update(dt){
        World.curveStart = Math.max(0, World.curveStart - World.velocity * dt / 6);
        this.metersPassed += World.velocity * dt;
    }

    end() {

    }

}
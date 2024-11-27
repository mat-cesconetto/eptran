class CurveEventStateMachine extends StateMachine {
    constructor(){
        super();
        this.metersPassed = 0;
        this.state = new CurveEvent(Math.random());
    }
    update(dt){
        if (!this._state)
            return;
        this.metersPassed += World.velocity * dt;
        if (this.metersPassed > this._state.duration){
            this.state = new CurveEvent(Math.random());
            this.metersPassed = 0;
        }
        this._state.update(dt);
    }
    render(){
        this._state?.render();
    }
    get state(){
        return this._state;
    }
    set state(state){
        this._state?.end();
        this._state = state;
        this._state?.start();
    }
}
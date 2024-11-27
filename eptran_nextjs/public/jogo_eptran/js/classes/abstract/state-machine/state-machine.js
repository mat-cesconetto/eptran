class StateMachine {
    constructor(){
        this._state = null;
    }
    update(dt){
        this._state?.update(dt);
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
        this._state.start();
    }
}
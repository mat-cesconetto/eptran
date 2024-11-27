class EventStateMachine extends StateMachine {
    constructor(){
        super();
        this._state = null;
        this.metersPassed = 0;
    }
    update(dt){
        this.metersPassed += World.velocity * dt;
        if (this.metersPassed > this._state.duration){
            this.state = this.getNewRandomEvent(); //this.getNewRandomEvent();
            this.metersPassed = 0;
        }
        this.state.update(dt);
    }
    getNewRandomEvent(){
        const casoAleatorio = Math.floor(Math.random() * 3) + 1;
        switch (casoAleatorio) {
        case 1:
            console.log("Evento animal iniciado");
            return new AnimalEvent();
        case 2:
            console.log("Evento cones iniciado");
            return new ObstacleEvent();
        case 3:
            console.log("Evento Obras iniciado");
            return new MaintenanceEvent();
        default:
            console.log("Nenhum caso correspondente");
            return new ObstacleEvent();
        }
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
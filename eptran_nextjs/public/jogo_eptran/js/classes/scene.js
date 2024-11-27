class Scene {
    constructor(car, road){
        this.car = car;
        this.road = road;
        this.background = new Background(0,0,0,0,1,1);
        this.objects = [];
        this.obstacles = [];
        this.spines = [];
        this.score = 0;
        this.offRoad = false;
        this.offRoadTime = 3;
        this.objects.push(car);
        this.endGameListeners = [];
    }
    
    init(){
        this.eventStateMachine = new EventStateMachine();
        this.eventStateMachine.state = this.eventStateMachine.getNewRandomEvent();
        this.curveEventStateMachine = new CurveEventStateMachine();
        this.miscellaneousSpawner = new MiscellaneousSpawner();
    }

    update(dt){
        World.update(dt);
        this.miscellaneousSpawner.update(dt);
        this.objects.forEach(object => object.update(dt));
        this.obstacles = this.obstacles.filter((obstacle) => !obstacle.deleteMe);
        this.objects = this.objects.filter((object) => !object.deleteMe);
        this.spines = this.objects.filter((spine) => !spine.deleteMe);
        this.road.update(dt);
        this.eventStateMachine.update(dt);
        this.curveEventStateMachine.update(dt);
        this.score += World.velocity / 2000;

        if (this.car.x < -450 || this.car.x > 450){
            this.offRoad = true;
            this.offRoadTime -= dt;
        }
        else{
            this.offRoad = false;
            this.offRoadTime = Math.min(3, this.offRoadTime + dt * .2);
        }
        if (this.offRoadTime <= 0)
            this.endGame();
    }
    render(){
        Screen.clear();
        this.background.render();
        this.road.render();
        this.car.y -= 5;
        this.objects.sort((b, a) => a.y - b.y);
        this.car.y += 5;
        this.objects.forEach(object => object.render());
        if (this.offRoad)
            this.drawWarning();


        /*this.car.collider.drawGizmos();
        this.obstacles.forEach(obstacle => {
            obstacle.collider.drawGizmos();
        });
        this.spines.forEach(spine => {
            spine.collider.drawGizmos();
        });*/
    }    

    drawWarning(){
        Screen.ctx.font = "30px Arial"; // Define o tamanho da fonte e o tipo
        Screen.ctx.fillStyle = "white"; // Define a cor do texto (branco)
        if (this.offRoadTime < 1)
            Screen.ctx.fillStyle = "red";
        Screen.ctx.textAlign = "center"; // Alinha o texto à esquerda
        Screen.ctx.textBaseline = "top"; // Alinha o texto ao topo (canto superior esquerdo)
        Screen.ctx.fillText("VOLTE PARA A PISTA!", Screen.width * .5, Screen.height *.5 - 20); // Posição do texto (10, 10) no canto superior esquerdo
        Screen.ctx.fillText(Math.floor(this.offRoadTime * 100) / 100, Screen.width * .5, Screen.height*.5 + 10); // Posição do texto (10, 10) no canto superior esquerdo
    }



    addEndGameListener(callback){
        this.endGameListeners.push(callback);
    }
    
    removeEndGameListener(callback) {
        this.endGameListeners = this.endGameListeners.filter(listener => listener !== callback);
    }

    endGame(){
        console.log("Acionando fim de jogo da cena");
        this.endGameListeners.forEach(listener => listener());
    }

    createObstacle(obstacle){
        this.objects.push(obstacle);
        this.obstacles.push(obstacle);
        obstacle.start()
    }

    createSpine(){
        let spine = new Spine(0, 350, 10, 0, 3, 3);
        this.objects.push(spine);
        this.spines.push(spine);
        spine.start();
        this.createObstacle(new SpineLabel(-600, 250, 10, 0, 3, 3))
    }
}
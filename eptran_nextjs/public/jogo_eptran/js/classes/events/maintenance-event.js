class MaintenanceEvent extends State {
    start() {
        this.duration = 1000;
        this.side = Math.random() < 0.5 ? -1 : 1;
        for (let i = 0; i < 5; i++)
            World.currentScene.createObstacle(new Obstacle(this.side * (400 - i * 80), 200 + i * 10, 10, 0, 3, 3));
        World.currentScene.createObstacle(new SteamRoller(this.side * 250, 270, 10, 0, 3, 3));
        for (let i = 0; i < 5; i++)
            World.currentScene.createObstacle(new Obstacle(this.side * (100 + i * 80), 300 + i * 10, 10, 0, 3, 3));
    }

    update(dt){

    }

    end() {

    }
}
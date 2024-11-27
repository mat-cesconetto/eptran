class ObstacleEvent extends State {
    start() {
        this.distanceFromLastObstacle = 0;
        this.nextSpawn = 0;
        this.duration = 11000;
        this.metersPassed = 0;
        console.log(World.currentScene);
    }

    update(dt){
        this.distanceFromLastObstacle += World.velocity * dt;
        this.metersPassed += World.velocity * dt
        
        if (this.distanceFromLastObstacle > this.nextSpawn && this.metersPassed < this.duration - 300){
            let intervalo = Math.lerp(-600, 600, Math.random());
            World.currentScene.createObstacle(new Obstacle(intervalo, 300, 10, 0, 3, 3));
            this.nextSpawn = Math.lerp(50, 100, Math.random());
            this.distanceFromLastObstacle = 0;
        }
    }

    end() {

    }
}
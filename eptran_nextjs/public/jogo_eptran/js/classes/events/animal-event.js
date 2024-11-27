class AnimalEvent extends State {
    start() {
        this.metersPassed = 0;
        this.distanceFromLastObstacle = 0;
        this.nextSpawn = 500;
        this.duration = 1000;
        console.log(World.currentScene);
        World.currentScene.createObstacle(new AnimalLabel(-600, 250, 10, 0, 3, 3));
    }

    update(dt){
        this.distanceFromLastObstacle += World.velocity * dt;
        this.metersPassed += World.velocity * dt;
        
        if (this.distanceFromLastObstacle > this.nextSpawn && this.metersPassed < this.duration - 300){
            let intervalo = Math.lerp(-600, 600, Math.random());
            World.currentScene.createObstacle(new Animal(intervalo, 300, 10, 0, 3, 3));
            this.nextSpawn = Math.lerp(100, 200, Math.random());
            this.distanceFromLastObstacle = 0;
        }
    }

    end() {

    }
}
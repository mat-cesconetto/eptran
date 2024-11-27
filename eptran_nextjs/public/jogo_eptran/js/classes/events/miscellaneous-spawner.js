class MiscellaneousSpawner {
    constructor(){
        this.metersPassed = 0;
        this.lastTreeDistance = 0;
        this.lastHouseDistance = 0;
        this.nextSpine = 100;
    }

    update(dt){
        this.metersPassed += dt * World.velocity;
        this.lastTreeDistance += dt * World.velocity;
        this.lastHouseDistance += dt * World.velocity;
        this.nextSpine -= dt * World.velocity;
        if (this.lastTreeDistance > 50){
            this.spawnTree(1);
            this.spawnTree(-1);
            this.lastTreeDistance = 0;
        }
        if (this.lastHouseDistance > 200){
            this.spawnHouse(Math.random() < 0.5 ? -1 : 1);
            this.lastHouseDistance = 0;
        }
        if (this.nextSpine <= 0){
            World.currentScene.createSpine();
            this.nextSpine = Math.lerp(5000, 7000, Math.random());
        }
    }

    spawnTree(side){
        const casoAleatorio = Math.floor(Math.random() * 3) + 1;
        switch (casoAleatorio) {
            case 1:
                World.currentScene.createObstacle(new Miscellaneous(750 * side, 300, 10, 0, 5, 5, 0, 0));
                break;
            case 2:
                World.currentScene.createObstacle(new Miscellaneous(750 * side, 300, 10, 0, 5, 5, 0, 1.01));
                break;
            default:
                World.currentScene.createObstacle(new Miscellaneous(750 * side, 300, 10, 0, 5, 5, 1, 0));
                break;
        }
    }

    spawnHouse(side){
        World.currentScene.createObstacle(new Miscellaneous((850 + Math.random() * 2000) * side, 300, 10, 0, 8, 8, 1, 1.01));
    }
}
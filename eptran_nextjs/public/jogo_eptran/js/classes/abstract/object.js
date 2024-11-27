class Object {
    constructor(x, y, z, r, sx, sy){
        this.x = x;
        this.y = y;
        this.z = z;
        this.r = r;
        this.sx = sx;
        this.sy = sy;
        this.width = 0;
        this.height = 0;
        this.components = [];

        this.components.forEach(component => component.start());
        this.init();
    }

    init(){ }

    start(){}

    update(dt){
        this.components.forEach(component => component.update(dt));
    }

    render(){

    }
    
    addComponent(component){
        if (!component instanceof Component)
            throw new Error("addComponent só aceita componentes");
        this.components.push(component);
        component.parent = this;
        component.start();
        return component;
    }

    roundToPixelSize(k){
        return Math.round(k / Screen.pixelSize) * Screen.pixelSize;
    }

    load(callback){
        
    }
}
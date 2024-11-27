class OutsideOfScreen extends Component{
    start(){
    }
    update(dt){
        let screenPosX = Transform.projectedX(this.parent.x, this.parent.y, this.parent.z);
        let screenPosY = Transform.projectedY(this.parent.x, this.parent.y, this.parent.z);
        if (
            screenPosY - this.parent.height > Screen.height// || screenPosY < 0
            //||screenPosX > Screen.width - this.width || screenPosX < 0
        ){
            this.parent.deleteMe = true;
            console.log("Saiu da tela");
        }
    }
}

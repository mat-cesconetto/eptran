let animal_label_sprite = new Sprite('img/placa-animal.png', 1, 1);
class AnimalLabel extends Label{
    getSprite(){
        return animal_label_sprite;
    }
}
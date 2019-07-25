class Portrait extends Phaser.GameObjects.Sprite {

    background;
    Scene;
    constructor(scene,x,y) {
        super(scene, x, y, "PortraitBorder");
        this.background = new Phaser.GameObjects.Sprite(scene, x, y, "bridge");
        this.Scene = scene;
        this.Scene.add.existing(this);
        this.background.setScale(0.108);
        this.setDepth(2);
        this.background.setDepth(1);
        this.Scene.add.existing(this.background);
    }
}
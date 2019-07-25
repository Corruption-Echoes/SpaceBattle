class Bullet extends Phaser.GameObjects.Sprite{
	Parent;
	Point;
	Scene;
	Damage;
	DamageType;
	constructor(parentGun,scene,sprite){
		var nx=parentGun.x;
		var ny=parentGun.y;
		super(scene,parentGun.x,parentGun.y,sprite);
		scene.add.existing(this);
		this.Parent=parentGun;
		scene.physics.world.enableBody(this);
		this.Scene=scene;
		this.Point=scene.physics.velocityFromRotation(parentGun.rotation,parentGun.LaunchPower);
		this.Damage=parentGun.Damage;
		this.DamageType=parentGun.DamageType;
	}
	update(){
		this.body.velocity.x=this.Point.x;
		this.body.velocity.y=this.Point.y;
		if(this.y<0||this.y>window.innerHeight||this.x<0||this.x>window.innerWidth){
			this.destroy();
		}
	}
	Destroy(){
		this.destroy();
	}
}
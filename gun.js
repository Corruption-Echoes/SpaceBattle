class gun extends Phaser.GameObjects.Sprite{
	firingTimer=0;
	armed=true;
	Damage;
	FiringRate;
	MinRange;
	MaxRange;
	DamageType;
	ParentShip;
	LaunchPower;
	ShipScene;
	XOffset;
	YOffest;
	projectiles;
	constructor(damage,firingrate,minRange,maxRange,damageType,parentShip,sprite,launchPower,scene,xoffset,yoffset){
		super(scene,parentShip.x,parentShip.y,sprite);
		this.Damage=damage;
		this.FiringRate=firingrate;
		this.MinRange=minRange;
		this.MaxRange=maxRange;
		this.DamageType=damageType;
		this.ParentShip=parentShip;
		this.LaunchPower=launchPower;
		this.ShipScene=scene;
		this.XOffset=xoffset;
		this.YOffest=yoffset;
		scene.add.existing(this);
		this.projectiles=this.ShipScene.add.group();
		this.positionSelf(this.ParentShip.rotation);
		if(parentShip.Side==0){
			this.ShipScene.physics.add.overlap(this.projectiles,this.ShipScene.shiplistEnemies,this.ShipScene.Hit,null,this);
		}else{
			this.ShipScene.physics.add.overlap(this.projectiles,this.ShipScene.shiplistAllies,this.Hit,null,this);
		}
	}
	update(){
		this.positionSelf(this.ParentShip.rotation);
		this.rotateGun(this.ParentShip.Target);
		
		if(this.inRange(this.ParentShip.Target)&&this.armed){
			//console.log("FIRE!");
			this.FireGun();
		}
		for(var i=0;i<this.projectiles.getChildren().length;i++){
			var CBullet=this.projectiles.getChildren()[i];
			CBullet.update();
		}
	}
	positionSelf(rotation){
	
		//x' = ysin(a) + xcos(a)
		//y' = ycos(a) - xsin(a)
		var NewX=(this.YOffest*Math.sin(-rotation)+this.XOffset*Math.cos(-rotation));
		var NewY=(this.YOffest*Math.cos(-rotation)-this.XOffset*Math.sin(-rotation));
		this.x=NewX+this.ParentShip.x;
		this.y=NewY+this.ParentShip.y;
		let output = "NewX:" +NewX+ " NewY:" +NewY+ " Rotation:"+rotation;
		//console.log(output);
	}
	rotateGun(Target){
		this.rotation = Phaser.Math.Angle.Between(this.x,this.y, Target.x,Target.y);
	}
	inRange(Target){
		let xDist=Target.x-this.x;
		let yDist=Target.y-this.y;
		let v=Math.hypot(xDist,yDist);
		if(v<this.MaxRange&&v>this.MinRange){
			//console.log("Target in Firing range!");
			return true;
		}
		return false;
	}
	FireGun(){
		//console.log("reached FireGun!");
		let newBullet=new Bullet(this,this.ShipScene,"Rupee");
		newBullet.setScale(0.1);
		this.projectiles.add(newBullet);
		this.armed=false;
		let timedEvent = this.ShipScene.time.delayedCall(this.FiringRate,this.ReArm,[],this);
	}
	ReArm(){
		//console.log("Cannons are armed!");
		this.armed=true;
	}
	Hit(bullet,ship){
		console.log("Someone was hit!");
		console.log("Bullet Damage was");
		ship.Hit(bullet.Damage,bullet.DamageType);
		bullet.Destroy();
	}
}
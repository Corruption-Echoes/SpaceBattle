class ship extends Phaser.GameObjects.Sprite{

	Health;
	Armor;
	Shield;
	CHealth;
	CArmor;
	CShield;
	ShieldHealRate;
	Speed;
	Weapons;
	ShipScene;
	Side;
	Target;
	X;
	Y;
	TurnRate;
	startGame=true;
	rotationDecided=false;
	ChosenDirection=1;
	constructor(health,armor,shield,shieldHealrate,speed,turnrate,x,y,sprite,scene,side){
		super(scene,x,y,sprite);
		this.Health=health;
		this.Armor=armor;
		this.Shield=shield;
		this.CHealth=health;
		this.CArmor=armor;
		this.CShield=shield;
		this.ShieldHealRate=shieldHealrate;
		this.Speed=speed;
		this.ShipScene=scene;
		this.Side=side;
		this.TurnRate=turnrate;
		this.ShipScene.add.existing(this);
		scene.physics.world.enableBody(this);
		this.Weapons=new Array();
		//this.angle=0;
	}
	update(){
		
		this.pickTarget();
		
		this.X=this.x;
		this.Y=this.Y;
		if(!this.checkIfInDangerRange()){
			this.rotation=this.getTurnAngle();
			this.ShipScene.physics.velocityFromAngle(this.angle, this.Speed, this.body.velocity);
		}
		else{
			this.body.angularVelocity=this.TurnRate*this.pickRotation();
			this.ShipScene.physics.velocityFromAngle(this.angle, this.Speed*0.8, this.body.velocity);
		}
	}
	findMiddle(a,b){
		return (a+b)/2;
	}
	getTurnAngle(){
		let a=Phaser.Math.Angle.Between(this.x,this.y, this.Target.x,this.Target.y);
		return a;
	}
	getDistanceToTarget(){
		return Phaser.Math.Distance.Between(this.x,this.y,this.Target.x,this.Target.y);
	}
	pickRotation(){
		if(this.rotationDecided){
			return this.ChosenDirection;
		}
		this.ChosenDirection=Phaser.Math.Between(-1,1)
		this.rotationDecided=true;
		let timedEvent = this.ShipScene.time.delayedCall(1000,this.ReArm,[],this);
		return this.ChosenDirection;
	}
	ReArm(){
		this.rotationDecided=false;
	}
	pickTarget(){
		let Distance=99999;
		if(this.Side!=1){
			for(let z=0;z<this.scene.shiplistEnemies.getChildren().length;z++){
				let xDist=this.ShipScene.shiplistEnemies.getChildren()[z].x-this.x;
				let yDist=this.ShipScene.shiplistEnemies.getChildren()[z].y-this.y;
				let v=Math.hypot(xDist,yDist);
				if(v<Distance&&v>this.minimumRange()){
					Distance=v;
					this.Target=this.ShipScene.shiplistEnemies.getChildren()[z];
				}
			}
		}else {
			for(let z=0;z<this.ShipScene.shiplistAllies.getChildren().length;z++){
				let xDist=this.ShipScene.shiplistAllies.getChildren()[z].x-this.x;
				let yDist=this.ShipScene.shiplistAllies.getChildren()[z].y-this.y;
				let v=Math.hypot(xDist,yDist);
				if(v<Distance&&v>this.minimumRange()){
					Distance=v;
					this.Target=this.ShipScene.shiplistAllies.getChildren()[z];
				}
			}
		}
	}
	checkIfInDangerRange(){
		let xDist=this.Target.x-this.x;
		let yDist=this.Target.y-this.y;
		let v=Math.hypot(xDist,yDist);
		if(v<this.minimumRange()){
			return true;
		}
		return false;
	}
	minimumRange(){
	let minrange=0;
		for(let z=0;z<this.Weapons.length;z++){
			minrange=this.Weapons[z].MinRange;
		}
		return minrange;
	}
	fillWeaponList(weapons){
		this.Weapons=weapons;
	}
	setScale(newsize){
		//console.log("SCALING IT");
		super.setScale(newsize,newsize);
	}
	Hit(DamageDealt,DamageType){
	console.log("I've been shot!");
		if(DamageType=="Energy"){
			if(this.CShield<DamageDealt*2){
				DamageDealt-=this.CShield/2;
				this.CShield=0;
			}else{
				this.CShield-=DamageDealt*2;
				DamageDealt=0;
			}
			if(this.CArmor<DamageDealt){
				DamageDealt-=this.CArmor;
				this.CArmor=0;
			}else{
				this.CArmor-=DamageDealt;
				DamageDealt=0;
			}
			if(this.CHealth<DamageDealt){
				this.Destroy();
			}else{
				this.CHealth-=DamageDealt;
			}
		}
		if(DamageType=="Piercing"){
			if(this.CShield<DamageDealt){
				DamageDealt-=this.CShield;
				this.CShield=0;
			}else{
				this.CShield-=DamageDealt;
				DamageDealt=0;
			}
			if(this.CArmor<DamageDealt){
				DamageDealt-=this.CArmor;
				this.CArmor=0;
			}else{
				this.CArmor-=DamageDealt;
				DamageDealt=0;
			}
			if(this.CHealth<DamageDealt*2){
				this.Destroy();
			}else{
				this.CHealth-=DamageDealt*2;
			}
		}
		if(DamageType=="Explosive"){
			if(this.CShield<DamageDealt){
				DamageDealt-=this.CShield;
				this.CShield=0;
			}else{
				this.CShield-=DamageDealt;
				DamageDealt=0;
			}
			if(this.CArmor<DamageDealt*2){
				DamageDealt-=this.CArmor;
				this.CArmor=0;
			}else{
				this.CArmor-=DamageDealt*2;
				DamageDealt=0;
			}
			if(this.CHealth<DamageDealt){
				this.Destroy();
			}else{
				this.CHealth-=DamageDealt;
			}
		}
	}
	Destroy(){
		for(let a=0;a<this.Weapons.length;a++){
			this.Weapons[a].destroy();
		}
		this.destroy();
	}
}

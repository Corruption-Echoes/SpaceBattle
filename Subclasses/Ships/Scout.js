class Scout extends ship{
	TurretPositionsX=[40,0,0];
	TurretPositionsY=[0,40,-40];
	Pallet;
	constructor(Scene,x,y,side,weaponlist){
		super(100,//Health
			25,//Armor
			0,//shield
			0,//Shield Regen
			50,//speed
			50,//TurnRate
			x,//x
			y,//y
			"link-purple",//sprite for ship
			Scene,//Scene
			side);//Which side the ship fights for
		this.InitializeWeapons(weaponlist);
		this.pickRandomPallet();
		this.anims.play('link-'+this.Pallet+'-walk-down');
	}
	InitializeWeapons(weaponlist){
		for(var i=0;i<this.TurretPositionsX.length;i++){
			var gun=new LightCannon(this.ShipScene,this.TurretPositionsX[i],this.TurretPositionsY[i],this);
			this.Weapons.push(gun);
			weaponlist.add(gun);
		}
	}
	pickRandomPallet(){
		let palletNum=Phaser.Math.Between(0,3);
		let paletteNames= ['green', 'red', 'blue', 'purple'];
		this.Pallet=paletteNames[palletNum];
	}
}
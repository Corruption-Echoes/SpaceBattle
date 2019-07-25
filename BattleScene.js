class BattleScene extends Phaser.Scene{
	
	shiplistAllies;
	shiplistEnemies;
	gunlist;
	running=false;
	constructor(){
		super("Battle");
		
	}

	preload(){
		
		
	}
	create(){
		this.shiplistAllies=this.add.group();
		this.shiplistEnemies=this.add.group();
		this.gunlist=this.add.group();
		this.background=this.add.image(0,0,"background");
		this.background.setOrigin(0,0);
		this.background.setScale(3);
		//this.add.text(20,20,"Let the battle begin!",{font:"25px Arial",fill:"yellow"});
		var player=new Scout(this,0,100,0,this.gunlist);//Scene,x,y,side,weaponlist
		var player2=new Scout(this,0,250,0,this.gunlist);//Scene,x,y,side,weaponlist
		var player3=new Scout(this,0,500,0,this.gunlist);//Scene,x,y,side,weaponlist
		var enemy=new Scout(this,800,100,1,this.gunlist);//Scene,x,y,side,weaponlist
		var enemy2=new Scout(this,800,250,1,this.gunlist);//Scene,x,y,side,weaponlist
        var enemy3 = new Scout(this, 800, 500, 1, this.gunlist);//Scene,x,y,side,weaponlist
        var portrait = new Portrait(this, 100, 550);
		
		//damage,firingrate,minRange,maxRange,damageType,parentShip,sprite,launchPower,scene,xoffset,yoffset
		this.input.on('gameobjectdown',this.startBattle,this);
		this.shiplistAllies.add(player);
		this.shiplistEnemies.add(enemy);
		this.shiplistAllies.add(player2);
		this.shiplistEnemies.add(enemy2);
		this.shiplistAllies.add(player3);
		this.shiplistEnemies.add(enemy3);
	}
	update(){
	super.update();
		if(this.running){
			for(var i=0;i<this.shiplistAllies.getChildren().length;i++){
				var CShip=this.shiplistAllies.getChildren()[i];
				CShip.update();
			}
			for(var i=0;i<this.shiplistEnemies.getChildren().length;i++){
				var CShip=this.shiplistEnemies.getChildren()[i];
				CShip.update();
			}
			for(var i=0;i<this.gunlist.getChildren().length;i++){
				var CGun=this.gunlist.getChildren()[i];
				CGun.update();
			}
		}
	}
	startBattle(pointer,gameObject){
		this.running=true;
	}
	Hit(bullet,ship){
		console.log("Someone was hit!");
		ship.Hit(bullet.Damage,bullet.DamageType);
		bullet.Destroy();
	}
}
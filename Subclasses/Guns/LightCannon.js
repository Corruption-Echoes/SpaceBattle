class LightCannon extends gun{

	constructor(newScene,x,y,parentShip){
		super(1,//Damage Dealt
		200,//Firing Rate
		200,//Min Firing Range
		500,//Max Firing Range
		"Piercing",//Damage Type
		parentShip,//parentShip Don't Touch this one
		"Turret1",//Sprite to Use
		400,//Launching Power
		newScene,//Scene Don't Touch this one
		x,//XOffset Don't Touch this one
		y);//YOffset Don't Touch this one
	}
}
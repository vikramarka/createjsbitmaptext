/** @define {string} */
var BUILD = "debug";

(function(){

/**
* Main class of the app.
*/
function Main(){}

/**
* Entry point of the app.



*/

var bitmap;
var xml;
var bitmapFont;
var text;
Main.main = function()
{
	var main = new Main();
	if (!window.HTMLCanvasElement)
	{
		alert("Your browser does not support HTML5 Canvas.");
		return;
	}
	else main.initialize();
	// entry point
}

/**
* Initializes the basics of the app.
*/
Main.prototype.initialize = function()
{
	/**
	* mainCanvas
	*/
	this.mainCanvas = document.getElementById("mainCanvas");
	/**
	* mainStage
	*/
	this.mainStage = new createjs.Stage(this.mainCanvas);
	this.mainStage.snapToPixelsEnabled = false;
	/*
	* createjs
	*/
	this.count = 0;
	loader = new createjs.PreloadJS();
  
	
	
    loader.loadFile('cooper.png');
	loader.loadFile('cooper.xml');
    var thisRef = this;
	loader.onFileLoad = function(event){
	
		 if(event.type==createjs.PreloadJS.IMAGE){
			 thisRef.bitmap = event.result;
		 }
		 if(event.type==createjs.PreloadJS.XML){
			 thisRef.xml = event.result;
			
		 }
	 }
	
    loader.onComplete = function(event){
	
		bitmapFont = new BitmapFont(thisRef.bitmap,thisRef.xml,32);
		BitmapTextField.registerBitmapFont(bitmapFont,"cooper");
		
		var bitmapText = new BitmapTextField(200,100,"Bitmap text","cooper",-1,0,0,"left","top",true);
		bitmapText.showBorder();
		
		bitmapText.x = 10;
		thisRef.mainStage.addChild(bitmapText);
		
		bitmapText = new BitmapTextField(200,100,"Bitmap text","cooper",-1,0,0,"right","top",true);
		bitmapText.showBorder();
		
		bitmapText.x = 220;
		thisRef.mainStage.addChild(bitmapText);
		
		bitmapText = new BitmapTextField(200,100,"Bitmap text","cooper",-1,0,0,"center","top",true);
		bitmapText.showBorder();
		
		bitmapText.x = 430;
		thisRef.mainStage.addChild(bitmapText);
		
		bitmapText = new BitmapTextField(200,100,"Bitmap text","cooper",-1,0,0,"center","center",true);
		bitmapText.showBorder();
		
		bitmapText.x = 10;
		bitmapText.y = 110;
		thisRef.mainStage.addChild(bitmapText);
		
		bitmapText = new BitmapTextField(200,100,"Bitmap text and multiline text","cooper",-1,0,0,"center","center",true);
		bitmapText.showBorder();
		
		bitmapText.x = 220;
		bitmapText.y = 110;
		thisRef.mainStage.addChild(bitmapText);
		
		bitmapText = new BitmapTextField(200,100,"Bitmap text and multiline text","cooper",-1,0,0,"left","center",true);
		bitmapText.showBorder();
		
		bitmapText.x = 430;
		bitmapText.y = 110;
		thisRef.mainStage.addChild(bitmapText);
		
		bitmapText = new BitmapTextField(200,100,"Bitmap text and multiline text","cooper",-1,0,0,"right","center",true);
		bitmapText.showBorder();
			
		bitmapText.x = 10;
		bitmapText.y = 220;
		thisRef.mainStage.addChild(bitmapText);
		
		
		bitmapText = new BitmapTextField(200,100,"you can change the color also","cooper",-1,0,0,"center","center",true);
		bitmapText.setColor("#009900");
			
		bitmapText.x = 220;
		bitmapText.y = 220;
		thisRef.mainStage.addChild(bitmapText);
		
		thisRef.score = 0;
		
		thisRef.scoreText = new BitmapTextField(200,50,"Score: "+thisRef.score,"cooper",-1,0,0,"right","center",true);
			
		thisRef.scoreText.x = 200;
		thisRef.scoreText.y = 350;
		thisRef.mainStage.addChild(thisRef.scoreText);
		
		
	};
	
	createjs.Ticker.addListener(this);
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(60);
	
	

}



/**
* Updates the stage on Ticker tick.
* @param event The recieved tick event.
*/
Main.prototype.tick = function(event)
{
	if(this.scoreText!=null)
	{
		this.count++;
		if(this.count>5)
		{
			this.count = 0;
			this.score++;
			this.scoreText.setText("Score: "+this.score);
		}
	}
	this.mainStage.update();
}

/**
* Expose class.
*/
window.Main = Main;

})();

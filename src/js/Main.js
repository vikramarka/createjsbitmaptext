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
	loader = new createjs.LoadQueue();
  
	
	
    loader.loadFile('cooper.png');
	loader.loadFile('cooper.xml');
    var thisRef = this;
	loader.on('fileload',fileLoadHandler);
	loader.on('complete',loadCompleteHandler);
	function fileLoadHandler(event){
		if(event.item.type==createjs.AbstractLoader.IMAGE){
			 thisRef.bitmap = event.result;
		 }
		 if(event.item.type==createjs.AbstractLoader.XML){
			 thisRef.xml = event.result;
			
		 }
	}
	 
	 
    function loadCompleteHandler(event){
	
		bitmapFont = new BitmapFont(thisRef.bitmap,thisRef.xml,32);
		BitmapTextField.registerBitmapFont(bitmapFont,"cooper");
		
		var bitmapText = new BitmapTextField(200,100,"Bitmap text","cooper",-1,0,0,"left","top",true);
		bitmapText.showBorder();
		
		bitmapText.x = 10;
		bitmapText.y = 10;
		thisRef.mainStage.addChild(bitmapText);
		
		bitmapText = new BitmapTextField(200,100,"Bitmap text","cooper",-1,0,0,"right","top",true);
		bitmapText.showBorder();
		
		bitmapText.x = 220;
		bitmapText.y = 10;
		thisRef.mainStage.addChild(bitmapText);
		
		bitmapText = new BitmapTextField(200,100,"Bitmap text","cooper",-1,0,0,"center","top",true);
		bitmapText.showBorder();
		
		bitmapText.x = 430;
		bitmapText.y = 10;
		thisRef.mainStage.addChild(bitmapText);
		
		bitmapText = new BitmapTextField(200,100,"Bitmap text","cooper",-1,0,0,"center","center",true);
		bitmapText.showBorder();
		
		bitmapText.x = 10;
		bitmapText.y = 120;
		thisRef.mainStage.addChild(bitmapText);
		
		bitmapText = new BitmapTextField(200,100,"Bitmap text and multiline text","cooper",-1,0,0,"center","center",true);
		bitmapText.showBorder();
		
		bitmapText.x = 220;
		bitmapText.y = 120;
		thisRef.mainStage.addChild(bitmapText);
		
		bitmapText = new BitmapTextField(200,100,"Bitmap text and multiline text","cooper",-1,0,0,"left","center",true);
		bitmapText.showBorder();
		
		bitmapText.x = 430;
		bitmapText.y = 120;
		thisRef.mainStage.addChild(bitmapText);
		
		bitmapText = new BitmapTextField(200,100,"Bitmap text and multiline text","cooper",-1,0,0,"right","center",true);
		bitmapText.showBorder();
		
		
		bitmapText.x = 10;
		bitmapText.y = 240;
		thisRef.mainStage.addChild(bitmapText);
		
		
		bitmapText = new BitmapTextField(200,100,"you can change the color also","cooper",-1,0,0,"center","center",true);
		bitmapText.setColor("#009900");
			
		bitmapText.x = 220;
		bitmapText.y = 240;
		thisRef.mainStage.addChild(bitmapText);
		
		thisRef.score = 0;
		
		thisRef.scoreText = new BitmapTextField(200,50,"Score: "+thisRef.score,"cooper",-1,0,0,"right","center",true);
			
		thisRef.scoreText.x = 200;
		thisRef.scoreText.y = 360;
		thisRef.mainStage.addChild(thisRef.scoreText);

		
		
	};
	
	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", tick);

	
	function tick(event){
		if(thisRef.scoreText!=null)
		{
			thisRef.count++;
			if(thisRef.count>5)
			{
				thisRef.count = 0;
				thisRef.score++;
				thisRef.scoreText.setText("Score: "+thisRef.score);
			}
		}
		thisRef.mainStage.update();
	}
	
	

}

/**
* Expose class.
*/
window.Main = Main;

})();

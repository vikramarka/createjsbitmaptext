(function(window)
{
	
	/**
		 * 
		 * @param	width: width of the text field
		 * @param	height: height of the text field
		 * @param	text: text to be displayed
		 * @param	fontName: name of the font give while registering the font.
		 * @param	fontSize: size of the font, -1 to keep the font size as exported
		 * @param	horizantalLetterSpacing: Horizantal letter space
		 * @param	verticalLetterSpacing: line spacing
		 * @param	hAlign: Horizantal alignment: accepted parameters: "left","right","center", default:"center"
		 * @param	vAlign: Verticle alignment: accepter parameters: "top","center",""bottom", default:"center"
		 * @param	autoScale: true, scales the text to fit in the space, default: true
		 */
	
	BitmapTextField = function (width, height, text, fontName,fontSize,horizantalLetterSpacing,verticalLetterSpacing,hAlign,vAlign,autoScale) 
	{
		this.font = null;
		if(horizantalLetterSpacing==null)
			horizantalLetterSpacing = 1;
		if(verticalLetterSpacing == null)
			verticalLetterSpacing = 1;
		if(hAlign == null)
			hAlign = "center";
		if(vAlign == null)
			vAlign = "center";
		if(autoScale==null)
			autoScale = true;
	
		this.hAlign = hAlign;
		this.vAlign = vAlign;
		this.autoScale = autoScale;
		this.color = "";
		this.initialize(width, height, text, fontName,fontSize,horizantalLetterSpacing,verticalLetterSpacing,hAlign,vAlign,autoScale);
        this.containerWidth = width;
        this.containerHeight = height;
		this.fontSize = fontSize;
		this.horizantalLetterSpacing = horizantalLetterSpacing;
		this.verticalLetterSpacing = verticalLetterSpacing;
	}
	BitmapTextField.bitmapFonts = [];
	var instance = BitmapTextField.prototype = new createjs.Container();
    instance.BitmapTextField_initialize = instance.initialize;
    instance.initialize = function (width, height, text, fontName,fontSize,horizantalLetterSpacing,verticalLetterSpacing,hAlign,vAlign,autoScale)
	{
		var textDisplay = String(text);
		this.BitmapTextField_initialize();
        this.border = new createjs.Shape();
        this.border.graphics.setStrokeStyle(1);
        this.border.graphics.beginStroke(createjs.Graphics.getRGB(255,0,0));
        this.border.graphics.drawRect(0,0,width,height);
        this.addChild(this.border);
		this.border.visible = false;
		this.textContainer = new createjs.Container();
		this.addChild(this.textContainer);
		if(BitmapTextField.bitmapFonts[fontName])
		{
			this.font = BitmapTextField.bitmapFonts[fontName];
			var container = this.font.createSprite(width,height,textDisplay,fontSize,horizantalLetterSpacing,verticalLetterSpacing,hAlign,vAlign,autoScale,true);
			this.actualWidth = this.font.getWidth();
			this.textContainer.addChild(container);							  
		}
		else
		{
			console.log("BitmapTextField: Font is not registered "+fontName);
		}
	};
	//sets the text.
	instance.setText = function(text)
	{
		var textDisplay = String(text);
		this.textContainer.uncache();
		this.textContainer.removeAllChildren();
		var container = this.font.createSprite(this.containerWidth,this.containerHeight,textDisplay,this.fontSize,this.horizantalLetterSpacing,this.verticalLetterSpacing,this.hAlign,this.vAlign,this.autoScale,true);
		this.textContainer.addChild(container);	
		if(this.color!="")
		{
			this.setColor(this.color);
		}
		this.actualWidth = this.font.getWidth();
		
	};
	//width of the container, the width given while creating text field
	instance.getWidth = function()
	{
		return this.containerWidth;
	};
	//height of the container, the width given while creating text field
	instance.getHeight = function()
	{
		return this.containerHeight;
	};
	//actual text width.
	instance.getActualWidth = function()
	{
		return this.actualWidth;
	};
	//shows a red colored bounding box, useful for debugging.
	instance.showBorder = function(visible)
	{
		if(visible==null)
			visible = true;
		this.border.visible = visible;
	};
	instance.setColor = function(color)
	{
		
		var R = hexToR(color);
		var G = hexToG(color);
		var B = hexToB(color);
		
		if(color!=this.color)
		{
			this.colorFilter = new createjs.ColorFilter(0,0,0,1,R,G,B,0);
		}
		this.textContainer.filters = [this.colorFilter];
		this.textContainer.cache(0,0,this.containerWidth,this.containerHeight);

		this.color = color;
		
		function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
		function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
		function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
		function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
	};
	//One must register bitmapfont before creating a textfield..
	/**
		 * 
		 * @param	bitmapFont: BitmapFont instance
		 * @param	fontName: name of the font, this will be used later while creating the text field.
		 */
	BitmapTextField.registerBitmapFont = function(bitmapFont,fontName)
	{
		if(BitmapTextField.bitmapFonts[fontName] == null)
		{
			BitmapTextField.bitmapFonts[fontName] = bitmapFont;
			return fontName;
		}
		else
		{
			console.log(fontName+" : is already registered");
		}
	}
	
	
	
})(window);
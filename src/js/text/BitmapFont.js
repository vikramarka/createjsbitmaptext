  (function(window) {
	
	var mStage;
	/**
		 * 
		 * @param	texture: png image of the font
		 * @param	fontXML: xml exported from bmFonts software
		 * @param	size: size of the font we exported using bmFonts, useful for a reference.
		 */
	BitmapFont = function(texture,fontXML,size){
		
		this.mName = "unknown";
		
		this.mLineHeight = this.mSize = this.mBaseLine = size;
		this.mTexture = texture;
		this.mChars = [];
		this.mHelperImage = new createjs.Bitmap(texture);
		this.mCharLocationPool = [];
		if(fontXML)
			this.parseFontXml(fontXML);
		this.textWidth = 0;
		this.textHeight = 0;
		this.previousWidth = [];
		
	}
	BitmapFont.NATIVE_SIZE = -1;
	BitmapFont.MINI = "mini";
	
	BitmapFont.CHAR_SPACE = 32;
	BitmapFont.CHAR_TAB = 9;
	BitmapFont.CHAR_NEWLINE = 10;
	BitmapFont.CHAR_CARRIAGE_RETURN = 13;
    BitmapFont.prototype.parseFontXml = function(fontXML)
	{
	    var charecters =  fontXML.childNodes[0].getElementsByTagName('chars')[0].getElementsByTagName('char');
		var arrFrames = [];
		var animations = {};
		var id;
		var allChars = [];
		var allKernings = [];
		for(var i = 0;i<charecters.length;i++){
			 var obj = new Object();
			obj.id = charecters[i].getAttribute('id');
			id = charecters[i].getAttribute('id');
			obj.x = charecters[i].getAttribute('x');
			obj.y = charecters[i].getAttribute('y');
			obj.xAdvance = charecters[i].getAttribute('xadvance');
			obj.xOffset = charecters[i].getAttribute('xoffset');
			obj.yOffset = charecters[i].getAttribute('yoffset');
			obj.width = charecters[i].getAttribute('width');
			obj.height = charecters[i].getAttribute('height');
			var arr =  [obj.x,obj.y,obj.width,obj.height];
			arrFrames.push(arr);
			animations["frame"+i] = [i];
			allChars.push(obj);
		}
		spriteSheet = new createjs.SpriteSheet({images:[this.mTexture],frames:arrFrames,animations:animations});
		for(var k = 0;k<allChars.length;k++){
			//var texture = createjs.SpriteSheetUtils.extractFrame(spriteSheet,k);
            var texture = new createjs.BitmapAnimation(spriteSheet);
            texture.gotoAndStop(k);
            //mStage.addChild(texture);
            texture.x = Math.random()*800;
            texture.y = 100;
			var bitmapChar = new BitmapChar(allChars[k].id,texture,allChars[k].xOffset,allChars[k].yOffset,allChars[k].xAdvance);
			this.addChar(allChars[k].id,bitmapChar);
		}
		
        if(fontXML.childNodes[0].getElementsByTagName('kernings')[0]!=null)
        {
            var kernings =  fontXML.childNodes[0].getElementsByTagName('kernings')[0].getElementsByTagName('kerning');
            for(var j = 0;j<kernings.length;j++){
                var obj = new Object();

                obj.first = kernings[j].getAttribute('first');
                obj.second = kernings[j].getAttribute('second');
                obj.amount = kernings[j].getAttribute('amount');
                allKernings.push(obj);
				 if(obj.second in this.mChars){
                         this.getChar(obj.second).addKerning(obj.first,obj.amount);
                       }
            }
        }
	}

    BitmapFont.prototype.getChar = function(charId)
	{
		return this.mChars[charId];
	};
    BitmapFont.prototype.addChar = function(charId,bitmapChar)
	{
		this.mChars[charId] = bitmapChar;
	};
    BitmapFont.prototype.createSprite = function(width,height,text,fontSize,horizantalLetterSpacing,verticalLetterSpacing,hAlign,vAlign,autoScale,kerning)
	{
		if(fontSize==null) fontSize = -1;
		if(hAlign==null) hAlign = "center";
		if(vAlign==null) vAlign = "center";
		if(autoScale==null) autoScale = true;
		if(kerning==null) kerning = true;
		
		var charLocations = this.arrangeChars(width,height,text,fontSize,hAlign,vAlign,autoScale,kerning,verticalLetterSpacing);
		var numChars = charLocations.length;
		var sprite = new createjs.Container();
		
		for(var i=0;i<numChars;i++)
		{
			var charLocation = charLocations[i];
			var _char = charLocation._char.createImage();
			_char.x = charLocation.x+i*horizantalLetterSpacing;
			_char.y = charLocation.y;
			_char.scaleX = _char.scaleY = charLocation.scale;
           	sprite.addChild(_char);
			var charHeight = charLocation._char.getHeight()*charLocation.scale;

			if(charHeight>this.textHeight)
			{
				this.textHeight = charHeight;
			}
			
		}
  		return sprite;
	};
    BitmapFont.prototype.arrangeChars = function(width,height,text,fontSize,hAlign,vAlign,autoScale,kerning,verticalLetterSpacing)
	{
		if(fontSize==null) fontSize = -1;
		if(hAlign==null) hAlign = "center";
		if(vAlign==null) vAlign = "center";
		if(autoScale==null) autoScale = true;
		if(kerning==null) kerning = true;
		
		if(text==null || text.length==0)
			return [];
		if(fontSize<0)fontSize *= -this.mSize;
		var lines = [[]];
		var finished = false;
		var charLocation = {};
		var numChars = 0;
		var containerWidth = 0;
		var containerHeight = 0;
		var scale = 0;

		while(!finished)
		{
			scale = fontSize/this.mSize;
			containerWidth = width/scale;
			containerHeight = height/scale;
			lines = [];
			lines.push([]);
			
			if(this.mLineHeight <= containerHeight)
			{
				var lastWhiteSpace = -1;
				var lastCharID = -1;
				var currentX = 0;
				var currentY = 0;
				var currentLine = [];
				
				numChars = text.length;
				for(var i=0;i<numChars;++i)
				{
					var lineFull = false;
					var charID = text.charCodeAt(i);
					var _char = this.getChar(charID);
					if(charID == BitmapFont.CHAR_NEWLINE || charID == BitmapFont.CHAR_CARRIAGE_RETURN)
					{
						lineFull = true;
					}
					else if(_char == null)
					{
						console.log("[BitmapFont] Missing character: "+ charID);
					}
					else
					{
						if(charID == BitmapFont.CHAR_SPACE || charID == BitmapFont.CHAR_TAB)
							lastWhiteSpace = i;
						if(kerning)
						{
							currentX = _char.getKerning(lastCharID)/1+currentX/1;
						}
						
						charLocation = new CharLocation(_char);
						
						charLocation._char = _char;
						charLocation.x = currentX/1+_char.getXOffset()/1;
						charLocation.y = currentY/1+_char.getYOffset()/1;
						
						currentLine.push(charLocation);
						currentX += _char.getXAdvance()/1;
						lastCharID = charID;
						if(charLocation.x + Number(_char.getWidth()) > containerWidth)
						{
							var numCharsToRemove = lastWhiteSpace == -1 ? 1 : i-lastWhiteSpace;
							var removeIndex = currentLine.length - numCharsToRemove;
							currentLine.splice(removeIndex,numCharsToRemove);
							if(currentLine.length == 0)
								break;
							i -= numCharsToRemove;
							lineFull = true;
						}
						
					}
					
					if(i == numChars-1)
					{
						lines.push(currentLine);
						finished = true;
					}
					else if(lineFull)
					{
						lines.push(currentLine);
						
						if(lastWhiteSpace == i)
							currentLine.pop();
						if(currentY + 2*this.mLineHeight <= containerHeight)
						{
							currentLine = [];
							currentX = 0;
							currentY += this.mLineHeight;
							lastWhiteSpace = -1;
							lastCharID = -1;
						}
						else
						{
							break;
						}
					}
					
				}
				
			}
			
			if(autoScale && !finished)
			{
				fontSize -= 1;
				lines.length = 0;
			}
			else
			{
				finished = true;
			}
		}
		
		var finalLocations = [];
		var numLines = lines.length;
		var bottom = currentY+this.mLineHeight;
		var yOffset = 0;
		
		if(vAlign == VAlign.BOTTOM)	yOffset = containerHeight - bottom;
		else if(vAlign == VAlign.CENTER)	yOffset = (containerHeight - bottom)/2;
		this.previousWidth = [];
		for(var lineID = 0;lineID<numLines; ++lineID)
		{
			var line = lines[lineID];
			numChars = line.length;
			
			if(numChars==0) continue;
			
			var xOffset = 0;
			var lastLocation = line[line.length-1];
			var right = lastLocation.x - lastLocation._char.getXOffset()/1 + lastLocation._char.getXAdvance()/1;
			
			if(hAlign == HAlign.RIGHT) xOffset = containerWidth - right;
			else if(hAlign == HAlign.CENTER) xOffset = (containerWidth - right)/2;
			this.width = 0;
			for(var c=0;c<numChars;++c)
			{
				  charLocation = line[c];
				  this.width += charLocation._char.getXAdvance()/1+charLocation._char.getXOffset()/1+1;
				  charLocation.x = scale * (charLocation.x + xOffset);
                  charLocation.y = scale * (charLocation.y + yOffset+(lineID-1)*verticalLetterSpacing);
				  charLocation.scale = scale;
				  if (charLocation._char.getWidth() > 0 && charLocation._char.getHeight() > 0)
                        finalLocations.push(charLocation);
                    // return to pool for next call to "arrangeChars"
                    this.mCharLocationPool.push(charLocation);
			}
			
			this.previousWidth.push(this.width);
			
		}
		this.width = this.previousWidth[0];
		for(var i=1;i<this.previousWidth.length;i++)
		{
			if(this.previousWidth[i]>this.width)
				this.width = this.previousWidth[i];
		}
		return finalLocations;
 	}
    BitmapFont.prototype.getName = function()
	{
		return this.mName;
	}
    BitmapFont.prototype.getSize = function()
	{
		return this.mSize;
	}
    BitmapFont.prototype.getLineHeight = function()
	{
		return this.mLineHeight;
	}
    BitmapFont.prototype.setLineHeight = function(value)
	{
		this.mLineHeight = value;
	}
    BitmapFont.prototype.getBaseLine = function()
	{
		return this.mBaseLine;
	}
    BitmapFont.prototype.getWidth = function()
	{
		return this.width;
	}
    BitmapFont.prototype.getHeight = function()
	{
		return this.textHeight;
	}
	window.BitmapFont = BitmapFont;
	
})(window);
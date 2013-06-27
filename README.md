createjsbitmaptext
==================

bitmap font library for createjs library

Use bmFonts or GlyphDesigner to export bitmap fonts.
Inspired from starling bitmap fonts.

Important notes:
	
	Export bitmap font from bmfont software (http://www.angelcode.com/products/bmfont/) to get png and .fnt file
	Rename the .fnt file to .xml
	Create BitmapFont instance.
		
		var bitmapFont = new BitmapFont(bitmap,xml,32);
	
	Register Bitmapfont with a name.
	
		BitmapTextField.registerBitmapFont(bitmapFont,"cooper");
		
	Create BitmapTextField
	
		var bitmapText = new BitmapTextField(200,100,"Bitmap Text","cooper",-1,0,0,"left","top",true);
		mainStage.addChild(bitmapText);
		
Features:

		* Supports Multiline Text.
		* Supports horizontal and vertical alignment.
		* Support for \n for new line.
		* kerning
		* Change color using setColor method of BitmapTextField
		
Note: You need to include Filter.js and ColorFilter.js to your project, if you are using minified version of easeljs.
		
Demo:

	https://googledrive.com/host/0BzMWTsJiuGb7d2NCSVdSb19qaVk/index.html

		

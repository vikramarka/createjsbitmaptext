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
		* Supports horizontal and verticle alignment.
		* Support for \n for new line.
		* kerning
		

		

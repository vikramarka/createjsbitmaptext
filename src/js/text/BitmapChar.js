
(function(window) {
		
	BitmapChar = function(id,texture,xOffset,yOffset,xAdvance){
			this.mTexture = texture;
			this.mCharId = id;
			this.mXOffset = xOffset;
			this.mYOffset = yOffset;
			this.mXAdvance = xAdvance;
			this.mKernings = null;
	}
	BitmapChar.prototype.addKerning = function(charId,amount)
	{
		
		if(this.mKernings == null)
			this.mKernings = [];
			
		this.mKernings[charId] = amount;
	};
	BitmapChar.prototype.getKerning = function(charId)
	{		
		return (this.mKernings==null || this.mKernings[charId]==null ||this.mKernings[charId]==undefined)? 0:this.mKernings[charId];	 
	};
	BitmapChar.prototype.createImage = function()
	{
		return this.mTexture.clone();
	};
	BitmapChar.prototype.getCharId = function()
	{
		return this.mCharId;
	};
	BitmapChar.prototype.getXOffset = function()
	{
		return this.mXOffset;
	};
	BitmapChar.prototype.getYOffset = function()
	{
		return this.mYOffset;
	};
	BitmapChar.prototype.getXAdvance = function()
	{
		return this.mXAdvance;
	};
	BitmapChar.prototype.getTexture = function()
	{
		return this.mTexture;
	};
	BitmapChar.prototype.getWidth = function()
	{
		return this.mTexture.spriteSheet.getFrame(this.mTexture.currentFrame).rect.width;
	};
	BitmapChar.prototype.getHeight = function()
	{
        return this.mTexture.spriteSheet.getFrame(this.mTexture.currentFrame).rect.height;
	};
	
	window.BitmapChar = BitmapChar;
})(window);
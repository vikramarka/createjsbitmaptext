
(function(window) {
	
	CharLocation = function(_char)
	{
		this._char = _char;
		this._char = null;
		this.scale = 0;
		this.x = 0;
		this.y = 0;
	}
	window.CharLocation = CharLocation;
})(window);
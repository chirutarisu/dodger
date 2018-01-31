Game = 
{
	// The total width of the game screen.
	width: 400,

	// The total height of the game screen.
	height: 600,

	// Initialise and start our game
	start: function() 
	{
		// Start Crafty and set a background color so that we can see it's working
		Crafty.init(Game.width, Game.height);
		Crafty.background('white');

		// Simply start the "Loading" scene to get things going
		Crafty.scene('Game');
	}
}

Utility =
{
	getRndInteger: function(min, max)
	{
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}
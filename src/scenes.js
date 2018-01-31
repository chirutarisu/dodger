// *******************************************
//	Game Scene
//	Runs the core gameplay loop
// *******************************************

Crafty.scene('Game', function() 
{
	var spawnInterval = 2000;
	var minSpawnInterval = 500;
	var spawnStep = 50;

	var player = Crafty.e('PlayerCharacter')
	player.x = Game.width / 2;
	player.y = Game.height / 2;
	player.enableDrag();
	player.startDrag();

	// spawn an asteroid every 2 seconds
	var dt = 0;
	this.spawn_asteroid = this.bind('EnterFrame', function(frameData) 
	{
		dt += frameData.dt;

		if(dt >= spawnInterval)
		{
			dt -= spawnInterval;
			var size = Utility.getRndInteger(10, 40);

			var asteroid = Crafty.e('Asteroid');
			asteroid.w = size;
			asteroid.h = size;
			asteroid.x = Utility.getRndInteger(asteroid.w, Game.width - (asteroid.w * 2));
			asteroid.y = 0 - asteroid.h;

			if (spawnInterval > minSpawnInterval)
			{
				spawnInterval -= spawnStep;	// gradually speed up the spawning
			}
		}
	});

	// When the player collides with the enemy,
	// display the Game Over screen
	this.show_gameover = this.bind('PlayerDied', function() {
		Crafty.scene('GameOver');
	});
},
function() {
	this.unbind('PlayerDied', this.show_gameover);
	this.unbind('EnterFrame', this.spawn_asteroid);
});

// *******************************************
//	Game Over Scene
//	Displays when player dies
// *******************************************
Crafty.scene('GameOver', function() 
{
	// Game Over text
	Crafty.e('2D, DOM, Text')
	.text('Game Over')
	.attr({ x: 0, y: Game.height / 2 - 24, w: Game.width })
	.textAlign('center')
	.textColor('#CB3112')
	.textFont({ size: '24px' });
	
	// restart the game when the player presses a key
	this.restart_game = this.bind('KeyDown', function () {
		Crafty.scene('Game');
	});
},
function() {
	this.unbind('KeyDown', this.restart_game);
});
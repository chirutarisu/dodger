// An "Actor" is an entity that is drawn in 2D
Crafty.c('Actor', {
	init: function() {
		this.requires('2D, Canvas');
	}
});

// This is the player-controlled character
Crafty.c('PlayerCharacter', {
	init: function() {
		this.requires('Actor, Color, Mouse, Collision')
		.color('#23C8F1')
		.attr({ w: 20, h: 20 })
		.onHit('Asteroid', this.kill)
		.bind("EnterFrame", function() {
			this.x = Crafty.mousePos.x;
			this.y = Crafty.mousePos.y;
		});
		/*.bind("StopDrag", function() {
			this.startDrag();
		});*/
	},

	kill: function() {
		this.destroy();
		Crafty.trigger('PlayerDied', this);
	}
});

// Asteroid that falls from the top of the screen
Crafty.c('Asteroid', {
	init: function() {
		this.requires('Actor, Color, Gravity')
		.color('#CB3112')
		.gravityConst(Math.random() * 1000)
		.gravity();
	}
});
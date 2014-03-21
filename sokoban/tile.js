Crafty.c('Tile', {
	init: function() {
		this.addComponent('Grid');
		this.attr({w: Game.geometry.tile.w, 
				   h: Game.geometry.tile.h,
				   z: 0});
		this.pathable = 0;
	}
});

Crafty.c('Floor', {
	init: function() {
		this.addComponent('Tile', 'Color');
		this.color('#bbbbbb');
		this.pathable = 7;
	}
});

Crafty.c('Wall', {
	init: function() {
		this.addComponent('Tile', 'Color');
		this.color('#888888');
	}
});
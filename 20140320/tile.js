Crafty.c('Tile', {
	init: function() {
		this.addComponent('Grid');
		this.attr({w: Game.geometry.tile.w, 
				   h: Game.geometry.tile.h,
				   z: 0});
		this.pathable = 0;
		
		/*this.actors = [];
		
		this.addActor = function(actor) {
			for (i = 0; i < this.actors.length; i++) {
				if (actor == actors[i]) {
					return null;
				} else if (actors[i] == null) {
					actors[i] = actor;
					return null;
				}
			}
			this.actors[this.actors.length] = actor;
		}
		this.remActor = function(actor) {
			for (i = 0; i < this.actors.length; i++) {
				if (actor == actors[i]) {
					actors[i] == null;
					return null;
				}
			}
		}*/
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
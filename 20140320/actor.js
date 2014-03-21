Crafty.c('Actor', {
	init: function() {
		this.addComponent('Grid');
		this.ident = 1;
		this.pushable = 0;
		this.pathable = 0;
		this.vicReq = 0;
		this.vicAllow = 0;
		this.controllable = false;
		
		this.move = function(x, y) {
			var newx = this.at().x + x;
			var newy = this.at().y + y;
			if (!Game.tiles[newx] || !Game.tiles[newx][newy]) {
				return false;
			}
			if (this.ident & Game.tiles[newx][newy].pathable) {
				var actors = Game.actorsAt(newx, newy);
				for (i = 0; i < actors.length; i++) {
					if (!(actors[i].pathable & this.ident)) {
						if (actors[i].pushable & this.ident) {
							if (!actors[i].move(x, y)) {
								return false;								
							}
						}
						else {
							return false;
						}
					}
				}
				this.at(newx, newy);
				return true;
			}
			else {
				return false;
			}
		}
	}
});

Crafty.c('Player', {
	init: function() {
		this.addComponent('Actor', 'Color', 'Keyboard');
		this.color('red');
		this.attr({w: Game.geometry.tile.w/4, h: Game.geometry.tile.h*3/4,
		           z: 2});
		this.ident = 4;
		this.pathable = 2;
		this.controllable = true;
	}
});

Crafty.c('Crate', {
	init: function() {
		this.addComponent('Actor', 'Color');
		this.color('blue');
		this.attr({w: Game.geometry.tile.w/2, h: Game.geometry.tile.h/2,
				   z: 2});
		this.pathable = 2;
		this.pushable = 4;
		this.vicReq = 1;
	}	
});

Crafty.c('Dest', {
	init: function() {
		this.addComponent('Actor', 'Color');
		this.color('green');
		this.attr({w: Game.geometry.tile.w*3/4, h: Game.geometry.tile.h*3/4,
				   z: 1});
		this.pathable = 5;
		this.ident = 2;
		this.vicAllow = 1;
	}
});
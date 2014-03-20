Crafty.c('Actor', {
	init: function() {
		this.addComponent('Grid');
		this.ident = 1;
		this.pushable = 0;
		
		this.move = function(x, y) {
			var newx = this.at().x + x;
			var newy = this.at().y + y;
			if (this.ident & Game.tiles[newx][newy].pathable) {
				var actors = [];
				for (i = 0; i < Game.actors.length; i++) {
					var a = Game.actors[i];
					if (a.at().x == newx && a.at().y == newy) {
						actors[actors.length] = a;
					}
				}
				console.log(this.ident);
				for (i = 0; i < actors.length; i++) {
					console.log(actors[i]);
					console.log(actors[i].pathable);
					console.log(actors[i].pushable);
					if (!(actors[i].pathable & this.ident)) {
						console.log('not pathable');
						if (actors[i].pushable & this.ident) {
							if (!actors[i].move(x, y)) {
								console.log('not pathable, pusable, couldn\'t push');
								return false;								
							}
							console.log('not pathable, pusable, succeeding');
						}
						else {
							console.log('not pathable, not pusable, failing');
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
		
		this.handleKB = function(e) {
			if (e.key == Crafty.keys.LEFT_ARROW) {
				this.move(-1, 0)
			} else if (e.key == Crafty.keys.RIGHT_ARROW) {
				this.move(1, 0)
			} else if (e.key == Crafty.keys.UP_ARROW) {
				this.move(0, -1)
			} else if (e.key == Crafty.keys.DOWN_ARROW) {
				this.move(0, 1)
			}
		}
		
		this.bind('KeyDown', this.handleKB);
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
	}
});
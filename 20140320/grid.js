Crafty.c('Grid', {
	init: function () {
		this.addComponent('2D, Canvas');
	},
	at: function(x, y) {
		var bw = (Game.geometry.tile.w - this.w)/2
		var bh = (Game.geometry.tile.h - this.h)/2
		if (x === undefined || y === undefined) {
			return { x: (this.x-bw)/Game.geometry.tile.w,
			         y: (this.y-bh)/Game.geometry.tile.h };
		} else {
			this.attr({ x: x * Game.geometry.tile.w + bw,
			            y: y * Game.geometry.tile.h + bh});
			return this;
		}
	}
});
	
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

Crafty.c('Actor', {
	init: function() {
		this.addComponent('Grid');
		this.ident = 1;
		this.pushable = false;
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
		
		this.move = function(x, y) {
			var newx = this.at().x + x;
			var newy = this.at().y + y;
			if (this.ident & Game.tiles[newx][newy].pathable) {
				this.at(newx, newy);				
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
		this.pushable = true;
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
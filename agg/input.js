Crafty.c('InputManager', {
	init: function() {
		this.addComponent('Keyboard');
		this.handleKB = function(e) {
			if (e.key == Crafty.keys.LEFT_ARROW) {
				this.tryMove(-1, 0);
			} else if (e.key == Crafty.keys.RIGHT_ARROW) {
				this.tryMove(1, 0);
			} else if (e.key == Crafty.keys.UP_ARROW) {
				this.tryMove(0, 1);
			} else if (e.key == Crafty.keys.DOWN_ARROW) {
				this.tryMove(0, -1);
			}
		}
		this.tryMove = function(x, y) {
			if (Game.validMoves[x][y]) {
				Game.move(x, y);
				Game.gamemode.spawn();
				Game.updateTiles();
				Game.checkMoves();
			}
		}
		this.bind('KeyDown', this.handleKB);
	}
});
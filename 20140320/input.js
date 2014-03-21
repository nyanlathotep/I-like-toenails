Crafty.c('InputManager', {
	init: function() {
		this.addComponent('Keyboard');
		this.handleKB = function(e) {
			var mag = 1;
			if (Crafty.keydown[Crafty.keys.S]) {
				mag = 2;
			}
			if (e.key == Crafty.keys.LEFT_ARROW) {
				this.movePlayers(-mag, 0)
			} else if (e.key == Crafty.keys.RIGHT_ARROW) {
				this.movePlayers(mag, 0)
			} else if (e.key == Crafty.keys.UP_ARROW) {
				this.movePlayers(0, -mag)
			} else if (e.key == Crafty.keys.DOWN_ARROW) {
				this.movePlayers(0, mag)
			}
		}
			
		this.bind('KeyDown', this.handleKB);
		
		this.movePlayers = function(x, y) {
			var pls = Game.controlActors();
			for (i = 0; i < pls.length; i++) {
				pls[i].move(x,y);
			}
		}
	}
});
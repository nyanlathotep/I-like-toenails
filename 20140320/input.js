Crafty.c('InputManager', {
	init: function() {
		this.addComponent('Keyboard');
		this.handleKB = function(e) {
			var mag = 1;
			/*var force = false;
			if (Crafty.keydown[Crafty.keys.S]) {
				mag = 2;
			}
			if (Crafty.keydown[Crafty.keys.F]) {
				force = true;
			}*/
			if (e.key == Crafty.keys.LEFT_ARROW) {
				this.movePlayers(-mag, 0);
			} else if (e.key == Crafty.keys.RIGHT_ARROW) {
				this.movePlayers(mag, 0);
			} else if (e.key == Crafty.keys.UP_ARROW) {
				this.movePlayers(0, -mag);
			} else if (e.key == Crafty.keys.DOWN_ARROW) {
				this.movePlayers(0, mag);
			} else if (e.key == 219) { //left bracket
				Game.historyBackward();
			} else if (e.key == 221) { //left bracket
				Game.historyForward();
			}
		}
			
		this.bind('KeyDown', this.handleKB);
		
		this.movePlayers = function(x, y) {
			var pls = Game.controlActors();
			var actorsMoved = [];
			for (var i = 0; i < pls.length; i++) {
				result = pls[i].move(x, y, true);
				if (result) {
					actorsMoved = actorsMoved.concat(result);
					Game.history.pushCount += result.length - 1;
					result = pls[i].move(x, y, false);
				}
			}
			if (result.length) {
				Game.history.moveCount += 1;
				Game.historyAdd([actorsMoved, [x, y]]);
			}
		}
	}
});
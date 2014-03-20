function BaseGame() {
	this.geometry = {
		w: 16,
		h: 10,
		tile: {
			w: 40,
			h: 40
		}
	};
}

function randint(a,b) {
	return Math.floor(Math.random() * (b-a) + a);
}

BaseGame.prototype.w = function() {
	return this.geometry.w * this.geometry.tile.w;
}
BaseGame.prototype.h = function() {
	return this.geometry.h * this.geometry.tile.h;
}

BaseGame.prototype.start = function() {
	Crafty.init(this.w(), this.h(), document.getElementById('game'));
	Crafty.background('black');
	for (i = 0; i < this.geometry.w; i++) {
		for (j = 0; j < this.geometry.h; j++) {
			if ((i + j) % 2 == 0) {
				c = '#888888';
			} else {
				c = '#bbbbbb';
			}
			Crafty.e('2D, Canvas, Color')
				.attr({w: this.geometry.tile.w, h: this.geometry.tile.h,
					   x: i*this.geometry.tile.w, y: j*this.geometry.tile.h})
				.color(c);
		}
	}
}

Game = new BaseGame();
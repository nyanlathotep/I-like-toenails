Game = {
	geometry: {
		w: 18,
		h: 10,
		tile: {
			w: 48,
			h: 48
		}
	},
	tiles: [],
	w: function() {
		return (this.geometry.w + 2) * this.geometry.tile.w;
	},
	h: function() {
		return (this.geometry.h + 2) * this.geometry.tile.h;
	},
	init: function() {
		Crafty.init(this.w(), this.h(), $('#game').get(0));
		Crafty.background('black');
		
		for (var i = 0; i < this.geometry.w; i++) {
			for (var j = 0; j < this.geometry.h; j++) {
				Crafty.e('Tile')
					.at(i, j);
			}
		}
	}
};
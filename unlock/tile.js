Crafty.c('Tile', {
	init: function() {
		this.addComponent('2D, Canvas, Color');
		this.color('#005869');
		this.attr({w: Game.geometry.tile.w, 
				   h: Game.geometry.tile.h,
				   x: 0,
				   y: 0,
				   z: 0});
		this.mutable = true;
		this.glyph = Crafty.e('Glyph');
		this.glyph.attr({w: Game.geometry.tile.w, 
				   h: Game.geometry.tile.h,
				   x: 0,
				   y: 0,
				   z: 1});
		this.attach(this.glyph);
	},
	at: function(x, y) {
		if (x === undefined || y === undefined) {
			return { x: this.x/Game.geometry.tile.w - 1,
			         y: this.y/Game.geometry.tile.h - 1};
		} else {
			this.attr({ x: (x + 1) * Game.geometry.tile.w,
			            y: (y + 1) * Game.geometry.tile.h});
			return this;
		}
	}
});

Crafty.c('Glyph', {
	init: function() {
		this.addComponent('2D, Canvas, Image');
		this.image('assets/glyphs/blank.png');
	}
});
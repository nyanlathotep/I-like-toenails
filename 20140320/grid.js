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
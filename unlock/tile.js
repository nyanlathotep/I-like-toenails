Crafty.c('Tile', {
	init: function() {
		this.addComponent('2D, Canvas, Color');
		this.color('red');
		this.attr({w: Game.geometry.tile.w, 
				   h: Game.geometry.tile.h,
				   x: 0,
				   y: 0,
				   z: 0});
		this.glyph = Crafty.e('Glyph');
		this.glyph.attr({w: Game.geometry.tile.w, 
				   h: Game.geometry.tile.h,
				   x: 0,
				   y: 0,
				   z: 1});
		this.attach(this.glyph);
		
		this.mutable = true;
		this.func = ' ';
		this.group = 0;
		this.selected = false;
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
	},
	setFunc: function(func) {
		if (Game.glyphs[func]) {
			this.func = func;
			this.glyph.image(Game.glyphs[func]);
		}
	},
	setGroup: function(group) {
		if (group < Game.groups.length) {
			this.group = group;
			this.color(Game.groups[group].color);
		}
	},
	setSelected: function(sel) {
		if (this.selected != sel) {
			this.selected = sel;
			if (sel) {
				this.attr({y: this.y - Game.geometry.tile.h / 2});
			} else {
				this.attr({y: this.y + Game.geometry.tile.h / 2});
			}
		}
	}
});

Crafty.c('Glyph', {
	init: function() {
		this.addComponent('2D, Canvas, Image');
		this.image(Game.glyphs[' ']);
	}
});
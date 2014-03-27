Crafty.c('Tile', {
	init: function() {
		this.addComponent('2D, Canvas, Color, Mouse');
		this.color('red');
		this.attr({w: Game.geometry.tile.w, 
				   h: Game.geometry.tile.h,
				   x: 0,
				   y: 0,
				   z: 0});
				   
		this.glyph = Crafty.e('Glyph, Mouse');
		this.glyph.attr({w: Game.geometry.tile.w, 
				   h: Game.geometry.tile.h,
				   x: 0,
				   y: 0,
				   z: 1});
		this.attach(this.glyph);
		
		this.func = ' ';
		this.group = 0;
		
		this.offX = 0;
		this.offY = 0;
		
		this.mutable = true;
		this.selected = false;
		this.isEditor = 0;
		this.index = null;
		
		var alsoThis = this;
		this.glyph.bind('Click', function(e) {
			if (e.mouseButton == Crafty.mouseButtons.LEFT) {
				alsoThis.handleClick();
			}
		});
	},
	at: function(x, y) {
		if (x === undefined || y === undefined) {
			return { x: this.x/Game.geometry.tile.w - this.offX,
			         y: this.y/Game.geometry.tile.h - this.offY};
		} else {
			this.attr({ x: (x + this.offX) * Game.geometry.tile.w,
			            y: (y + this.offY) * Game.geometry.tile.h});
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
				this.attr({y: this.y + Game.geometry.tile.h / 4});
			} else {
				this.attr({y: this.y - Game.geometry.tile.h / 4});
			}
		}
	},
	handleClick: function() {
		if (this.isEditor == 2 && !this.selected) {
			Game.selectEdit(this.index);
		} else if (this.isEditor == 1 && !this.selected) {
			Game.setEditGroup(this.index);
		} else if (!this.isEditor && this.mutable && Game.canEdit) {
			if (Game.selGroup != null && Game.selEdit != null) {
				var model = Game.editorTiles[Game.selEdit];
				if (Game.selEdit == -1) {
					model = Game.blankTile;
				}
				this.setGroup(model.group);
				this.setFunc(model.func);
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
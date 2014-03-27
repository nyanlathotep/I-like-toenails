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
	groups: [{color: '#005869', funcs: ['#', '^', 'v', '<', '>', 'Y', 'X']},
			 {color: '#00856A', funcs: ['#', '^', 'v', '<', '>', '++', '--', '<<', '>>',
			                            '+', '-', '*', '/', '~']}, 
	         {color: '#8DB500', funcs: ['#', '^', 'v', '<', '>', '++', '--', '<<', '>>',
			                            '+', '-', '*', '/', '~']}],
	blankTile: null,
	editorTiles: [],
	selGroup: null,
	selEdit: null,
	canEdit: true,
	start: {x: null, y:null},
	w: function() {
		return (this.geometry.w + 2) * this.geometry.tile.w;
	},
	h: function() {
		return (this.geometry.h + 3) * this.geometry.tile.h;
	},
	initGlyphs: function() {
		this.glyphs = {};
		this.glyphs[' '] = 'assets/blank.png';
		
		this.glyphs['>>'] = 'assets/incr-p.png';
		this.glyphs['<<'] = 'assets/decr-p.png';
		
		this.glyphs['++'] = 'assets/incr-v.png';
		this.glyphs['--'] = 'assets/decr-v.png';
		this.glyphs['~'] = 'assets/inv.png';
		
		this.glyphs['+'] = 'assets/add.png';
		this.glyphs['-'] = 'assets/sub.png';
		this.glyphs['*'] = 'assets/mul.png';
		this.glyphs['/'] = 'assets/div.png';
		
		this.glyphs['.'] = 'assets/chk.png';
		this.glyphs['Y'] = 'assets/fork.png';
		this.glyphs['X'] = 'assets/unfork.png';
		
		this.glyphs['>'] = 'assets/turn-r.png';
		this.glyphs['<'] = 'assets/turn-l.png';
		this.glyphs['^'] = 'assets/turn-u.png';
		this.glyphs['v'] = 'assets/turn-d.png';
		this.glyphs['#'] = 'assets/jmp.png';
		
		this.glyphs['.>'] = 'assets/start-r.png';
		this.glyphs['.<'] = 'assets/start-l.png';
		this.glyphs['.^'] = 'assets/start-u.png';
		this.glyphs['.v'] = 'assets/start-d.png';
	},
	preInit: function() {
		this.initGlyphs();
		
		var assets = [];
		
		for (var k in this.glyphs) {
			assets = assets.concat(this.glyphs[k]);
			//console.log([this.glyphs[k]]);
			//Crafty.load(k);
		}
		Crafty.load(assets, function() {Game.init()});
	},	
	init: function() {
		Crafty.init(this.w(), this.h(), $('#game').get(0));
		Crafty.background('#221133');
		this.buildEditor();
		
		var level = {
			offX: 0,
			offY: 0,
			data: [
				'__________________',
				'__________________',
				'__________________',
				'__________________',
				'>_________________',
				'__________________',
				'__________________',
				'__________________',
				'__________________',
				'  ________________'
			]
		};
		this.buildLevel(level);
	},
	resetLevel: function() {
		for (var j = 0; j < this.geometry.h; j++) {
			if (!this.tiles[j]) {
				this.tiles[j] = [];
			}
			for (var i = 0; i < this.geometry.w; i++) {
				if (this.tiles[j][i]) {
					this.tiles[j][i].destroy();
				}
				this.tiles[j][i] = null;
			}
		}
		this.start.x = null;
		this.start.y = null;
	},
	buildLevel: function(level) {
		this.resetLevel();
		for (var j = 0; j < level.data.length; j++) {
			for (var i = 0; i < level.data[0].length; i++) {
				if (level.data[j][i] == " ") {
					
				} else {
					tile = Crafty.e('Tile');
					tile.offX = 1 + level.offX;
					tile.offY = 2 + level.offY;
					tile.at(i, j);
					tile.setGroup(0);
					if (level.data[j][i] == "_") {
					
					} else {
						tile.setFunc('.' + level.data[j][i]);
						tile.mutable = false;
					}
					this.tiles[j + level.offY][i + level.offX] = tile;
				}
			}
		}
		this.level = level;
	},
	buildEditor: function() {
		for (var i = 0; i < this.groups.length; i++) {
			var tile = Crafty.e('Tile');
			tile.at(i, 0);
			tile.setGroup(i);
			tile.isEditor = 1;
			tile.index = i;
			this.groups[i].tile = tile;
		}
		var tile = Crafty.e('Tile');
		tile.setGroup(0);
		tile.offX = this.groups.length + 1;
		tile.at(0, 0);
		tile.isEditor = 2;
		tile.index = -1;
		this.blankTile = tile;
		this.setEditGroup(0);
		this.selectEdit(-1);
	},
	setEditGroup: function(group) {
		if (this.selGroup != null) {
			this.groups[this.selGroup].tile.setSelected(false);
			for (var i = 0; i < this.editorTiles.length; i++) {
				this.editorTiles[i].destroy();
			}
			this.editorTiles = [];
		}
		if (this.selEdit != -1) {
			this.selEdit = null;
		}
		this.selGroup = group;
		this.groups[group].tile.setSelected(true);
		for (var i = 0; i < this.groups[group].funcs.length; i++) {
			var tile = Crafty.e('Tile');
			tile.setFunc(this.groups[group].funcs[i]);
			tile.setGroup(group);
			tile.isEditor = 2;
			tile.index = i;
			tile.offX = this.groups.length + 2;
			tile.at(i, 0);
			this.editorTiles[i] = tile;
		}
	},
	selectEdit: function(edit) {
		if (this.selEdit == -1) {
			this.blankTile.setSelected(false);
		} else if (this.selEdit != null) {
			this.editorTiles[this.selEdit].setSelected(false);
		}
		if (edit == -1) {
			this.blankTile.setSelected(true);
		} else {
			this.editorTiles[edit].setSelected(true);
		}
		this.selEdit = edit;
	}
};
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
		this.initGlyphs();
		Crafty.init(this.w(), this.h(), $('#game').get(0));
		Crafty.background('#221133');
		
		for (var i = 0; i < this.geometry.w; i++) {
			for (var j = 0; j < this.geometry.h; j++) {
				Crafty.e('Tile')
					.at(i, j);
			}
		}
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
		
		var assets = [];
		
		for (var k in this.glyphs) {
			assets = assets.concat(this.glyphs[k]);
		}
		
		Crafty.load(assets);
	}
};
Game = {
	geometry: {
		bf: 9,
		w: 4,
		h: 4,
		d: {}
	},
	board: {
		body: null,
		tiles: [],
		color: '#dddddd',
		framecolor: '#888888',
		bgcolor: '#555555'
	},
	tiles: [],
	init: function() {
		Crafty.init(null, null, $('#game').get(0));
		this.buildBoard();	
	},
	destroyTiles: function() {
		for (var j = 0; j < this.tiles.length; j++) {
			if (this.tiles[j]) {
				for (var i = 0; i < this.tiles[j].length; i++) {
					if (this.tiles[j][i]) {
						this.tiles[j][i].destroy();
					}
				}
			}
		}
		this.tiles = [];
	},
	destroyBoard: function() {
		this.destroyTiles();
		for (var j = 0; j < this.board.tiles.length; j++) {
			if (this.board.tiles[j]) {
				for (var i = 0; i < this.board.tiles[j].length; i++) {
					if (this.board.tiles[j][i]) {
						this.board.tiles[j][i].destroy();
					}
				}
			}
		}
		if (this.board.body) {
			this.board.body.destroy();
		}
		this.board.body = null;
		this.board.tiles = [];
	},
	buildBoard: function() {
		this.destroyBoard();
		for (var j = 0; j < this.geometry.h; j++) {
			this.board.tiles[j] = [];
			this.tiles[j] = [];
			for (var i = 0; i < this.geometry.w; i++) {
				var tile = Crafty.e('2D, Canvas, Color')
					.color(this.board.color)
					.attr({z: 1});
				this.board.tiles[j][i] = tile;
				this.tiles[j][i] = null;
			}
		}
		var body = Crafty.e('2D, Canvas, Color')
			.color(this.board.framecolor);
		this.board.body = body;
		Crafty.background(this.board.bgcolor);
		this.resizeBoard();
	},
	findBoardProps: function(w, h) {
		var geo = {};
		var ar = (this.geometry.w + (this.geometry.w + 1)/this.geometry.bf) /
				 (this.geometry.h + (this.geometry.h + 1)/this.geometry.bf);
		var sf = Math.min(w, h*ar);
		geo.w = sf;
		geo.h = sf/ar;
		geo.ox = (w - geo.w) / 2;
		geo.oy = (h - geo.h) / 2;
		geo.t = (this.geometry.bf * geo.w) / ((this.geometry.bf + 1) * this.geometry.w + 1);
		geo.b = geo.t / this.geometry.bf;
		return geo;
	},
	resizeBoard: function() {
		var areaW = $('#game').width();
		var areaH = $('#game').height() - $('#game-bar').height()
		var geo = this.findBoardProps(areaW, areaH);
		this.geometry.d = geo;
		this.board.body.attr({w : geo.w, h: geo.h, x : geo.ox, y: geo.oy});
		for (var j = 0; j < this.geometry.h; j++) {
			for (var i = 0; i < this.geometry.w; i++) {
				var props = this.boardPosition(i, j);
				this.board.tiles[j][i].attr(props);
				if (this.tiles[j][i]) {
					this.tiles[j][i].resize(props);
				}
			}
		}
	},
	boardPosition: function(x, y) {
		props = {
			w: this.geometry.d.t,
			h: this.geometry.d.t,
			x: this.geometry.d.t * x + this.geometry.d.b * (x + 1) + this.geometry.d.ox,
			y: this.geometry.d.t * y + this.geometry.d.b * (y + 1) + this.geometry.d.oy
		};
		return props
	}
};
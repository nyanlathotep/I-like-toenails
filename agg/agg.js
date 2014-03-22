Game = {
	geometry: {
		w: 400,
		h: 400,
		bordersX: 10,
		bordersY: 10,
		offsetX: 0,
		offsetY: 0,
		board: {
			w: 4,
			h: 4
		}
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
		this.geometry.w = 600;
		this.geometry.h = 600;
		this.geometry.bordersX = 15;
		this.geometry.bordersY = 15;
		this.resizeBoard();		
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
		for (var j = 0; j < this.geometry.board.h; j++) {
			this.board.tiles[j] = [];
			this.tiles[j] = [];
			for (var i = 0; i < this.geometry.board.w; i++) {
				var tile = Crafty.e('2D, Canvas, Color')
					.color(this.board.color)
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
	resizeBoard: function() {
		var tileW = this.geometry.w - this.geometry.bordersX * (this.geometry.board.w + 1);
		tileW /= this.geometry.board.w;
		var tileH = this.geometry.h - this.geometry.bordersY * (this.geometry.board.h + 1);
		tileH /= this.geometry.board.h;
		var tileX = tileW + this.geometry.bordersX;
		var tileY = tileH + this.geometry.bordersY;
		this.board.body.attr({x : this.geometry.offsetX, y : this.geometry.offsetY, z : 0, 
		                      w : this.geometry.w, h : this.geometry.h});
		for (var j = 0; j < this.geometry.board.h; j++) {
			for (var i = 0; i < this.geometry.board.w; i++) {
				props = {
					w : tileW,
					x : tileX * i + this.geometry.bordersX + this.geometry.offsetX, 
					h : tileH, 
					y : tileY * j + this.geometry.bordersY + this.geometry.offsetY,
					z : 1
				};
				this.board.tiles[j][i].attr(props);
			}
		}
	}
};
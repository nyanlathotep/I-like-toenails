Game = {
	geometry: {
		bf: 9,
		tf: 2,
		w: 4,
		h: 4,
		d: {}
	},
	board: {
		body: null,
		tiles: [],
		color: '#dddddd',
		framecolor: '#888888',
		bgcolor: '#555555',
		font: 'Tahoma'
	},
	tiles: [],
	validMoves: [],
	init: function() {
		Crafty.init(null, null, $('#game').get(0));
		this.buildBoard();	
		this.gamemode = Gamemodes.test;
		this.gamemode.parent = this;
		this.validMoves[-1] = [];
		this.validMoves[0] = [];
		this.validMoves[1] = [];
		this.inputMan = Crafty.e('InputManager');
		
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				var tile = Crafty.e('Tile');
				tile.val = 2;
				tile.setText(2);
				this.placeTile(tile, i, j);
			}
		}
		this.updateTiles();
		this.checkMoves();
	},
	placeTile: function(tile, x, y) {
		tile.tileX = x;
		tile.tileY = y;
		this.tiles[y][x] = tile;
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
			}
		}
		this.updateTiles();
	},
	updateTiles: function() {
		for (var j = 0; j < this.geometry.h; j++) {
			for (var i = 0; i < this.geometry.w; i++) {
				if (this.tiles[j][i]) {
					var props = this.boardPosition(i, j);
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
	},
	moveLine: function(line, test) {
		var spot1 = 0;
		var spot2 = 0;
		var haveMerged = false;
		while (spot2 != line.length) {
			if (spot1 == spot2) {
				spot2 += 1;
			} else if (line[spot1]) {
				if (line[spot2]) {
					if (this.gamemode.canMerge(line[spot1], line[spot2])
						&& !(this.gamemode.mergeOne && haveMerged)) {
						if (test) {
							console.log('can merge');
							return true;
						}
						var tile = this.gamemode.doMerge(line[spot1], line[spot2]);
						line[spot1].destroy();
						line[spot2].destroy();
						line[spot1] = tile;
						line[spot2] = null;
						haveMerged = true;
					}
					spot1 += 1;
				} else {
					spot2 += 1;
				}
			} else {
				if (line[spot2]) {
					if (line[spot2].immobile) {
						spot1 = spot2;
						spot2 += 1;
						continue;
					}
					if (test) {
						console.log('can move', spot1, spot2);
						return true;
					}
					line[spot1] = line[spot2];
					line[spot2] = null;
				}
				else {
					spot2 += 1;
				}
			}
			if ((spot2 - spot1) > 1 && this.gamemode.moveOne) {
				spot1 = spot2 - 1;
			}
		}
		if (test) {
			return false;
		}
		return line;
	},
	move: function(x, y, test) {
		if (x == -1) {
			for (var j = 0; j < this.geometry.h; j++) {
				if (!test) {
					this.moveLine(this.tiles[j]);
				}else if (this.moveLine(this.tiles[j], true)) {
					console.log(j);
					return true;
				}
			}
		} else if (x == 1) {
			for (var j = 0; j < this.geometry.h; j++) {
				var line = [];
				for (var i = 0; i < this.geometry.w; i++) {
					line[i] = this.tiles[j][this.geometry.w-1-i]
				}
				if (!test) {
					var line = this.moveLine(line);
					this.tiles[j] = line.reverse();
				} else if (this.moveLine(line, true)) {
					return true;
				}
			}
		} else {
			for (var i = 0; i < this.geometry.w; i++) {
					var line = [];
				for (var j = 0; j < this.geometry.h; j++) {
					line[j] = this.tiles[j][i];
				}
				if (y == -1) {
					line.reverse();
				}
				if (!test) {
					line = this.moveLine(line);
					if (y == -1) {
						line.reverse();
					}
					for (var j = 0; j < this.geometry.h; j++) {
						this.tiles[j][i] = line[j];
					}
				}
				else if (this.moveLine(line, true)) {
					return true;
				}
			}
		}
		if (test) {
			return false;
		}
		Game.gamemode.postMove();
		Game.updateTiles();
	},
	randFreeSpot: function() {
		var spots = [];
		for (var i = 0; i < this.geometry.w; i++) {
			for (var j = 0; j < this.geometry.h; j++) {
				if (!this.tiles[j][i]) {
					spots[spots.length] = {x: i, y: j};
				}
			}
		}
		return spots[randint(0, spots.length - 1)];
	},
	checkMoves: function() {
		this.validMoves[1][0] = this.move(1, 0, true);
		this.validMoves[-1][0] = this.move(-1, 0, true);
		this.validMoves[0][1] = this.move(0, 1, true);
		this.validMoves[0][-1] = this.move(0, -1, true);
	}
};
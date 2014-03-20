function BaseGame() {
	this.geometry = {
		w: 20,
		h: 16,
		tile: {
			w: 40,
			h: 40
		}
	};
}

function randint(a,b) {
	return Math.floor(Math.random() * (b-a) + a);
}

BaseGame.prototype.w = function() {
	return this.geometry.w * this.geometry.tile.w;
}
BaseGame.prototype.h = function() {
	return this.geometry.h * this.geometry.tile.h;
}

BaseGame.prototype.init = function() {
	Crafty.init(this.w(), this.h(), document.getElementById('game'));
	Crafty.background('black');
	this.tiles = [];
	this.actors = [];
	this.clearLevel();
	this.loadLevel([
			"    #####          ",
			"    #___#          ",
			"    #$__#          ",
			"  ###__$##         ",
			"  #__$_$_#         ",
			"###_#_##_#   ######",
			"#___#_##_#####__..#",
			"#_$__$__________..#",
			"#####_###_#@##__..#",
			"    #_____#########",
			"    #######        "
		]);
}

BaseGame.prototype.setTile = function(x, y, tile) {
	if (this.tiles[x][y] != null) {
		this.tiles[x][y].destroy()
		this.tiles[x][y] = null
	}
	this.tiles[x][y] = tile;
	this.tiles[x][y].at(x,y);
}

BaseGame.prototype.clearLevel = function() {
	for (i = 0; i < this.geometry.w; i++) {
		if (!this.tiles[i]) {
			this.tiles[i] = [];
		}
		for (j = 0; j < this.geometry.h; j++) {
			if (this.tiles[i][j]) {
				this.tiles[i][j].destroy();
			}
			this.tiles[i][j] = null;
		}
	}
	for (i = 0; i < this.actors.length; i++) {
		this.actors[i].destroy();
	}
	this.actors = [];
}

BaseGame.prototype.createActor = function(x, y, type) {
	this.actors[this.actors.length] = Crafty.e(type);
	this.actors[this.actors.length-1].at(x, y);
}

BaseGame.prototype.loadLevel = function(level) {
	this.clearLevel();
	var lw = level[0].length;
	var lh = level.length;
	var bw = Math.floor((this.geometry.w - lw)/2);
	var bh = Math.floor((this.geometry.h - lh)/2);
	for (j = 0; j < lh; j++) {
		for (i = 0; i < lw; i++) {
			var c = level[j][i];
			var x = i + bw;
			var y = j + bh;
			if (c == " ") {
			
			} else if (c == "#") {
				this.setTile(x, y, Crafty.e('Wall'));
			}
			else {
				this.setTile(x, y, Crafty.e('Floor'));
				if (c == "@" || c == "+") {
					this.createActor(x, y, 'Player');
				}
				if (c == "*" || c == "$") {
					this.createActor(x, y, 'Crate');
				}
				if (c == "+" || c == "*" || c == ".") {
					this.createActor(x, y, 'Dest');
				}
			}
		}
	}
}

Game = new BaseGame();
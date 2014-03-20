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
	this.player = null;
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
	/*for (i = 0; i < this.geometry.w; i++) {
		for (j = 0; j < this.geometry.h; j++) {
			if ((i + j) % 2 == 0) {
				c = '#888888';
			} else {
				c = '#bbbbbb';
			}
			a = Crafty.e('Tile, Color')
				.color(c);
			a.at(i, j);
		}
	}*/
}

BaseGame.prototype.setTile = function(x, y, tile) {
	//console.log(x,y);
	if (this.tiles[x][y] != null) {
		this.tiles[x][y].destroy()
		this.tiles[x][y] = null
	}
	this.tiles[x][y] = tile;
	this.tiles[x][y].at(x,y);
}

BaseGame.prototype.clearLevel = function() {
	for (i = 0; i < this.geometry.w; i++) {
		this.tiles[i] = [];
		for (j = 0; j < this.geometry.h; j++) {
			this.tiles[i][j] = null;
		}
	}
}

BaseGame.prototype.createActor = function(x, y, type) {
	if (type == 'Player') {
		this.player = Crafty.e('Player');
		this.player.at(x, y);
	} else {
		this.actors[this.actors.length] = Crafty.e(type);
		this.actors[this.actors.length-1].at(x, y);
	}
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
function BaseGame() {
	this.geometry = {
		w: 20,
		h: 16,
		tile: {
			w: 40,
			h: 40
		}
	};
	this.history = {
		moveCount: 0,
		pushCount: 0,
		moves: [],
		curTime: 0
	};
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
		
	this.inputMan = Crafty.e('InputManager');
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
	for (var i = 0; i < this.geometry.w; i++) {
		if (!this.tiles[i]) {
			this.tiles[i] = [];
		}
		for (var j = 0; j < this.geometry.h; j++) {
			if (this.tiles[i][j]) {
				this.tiles[i][j].destroy();
			}
			this.tiles[i][j] = null;
		}
	}
	for (var i = 0; i < this.actors.length; i++) {
		this.actors[i].destroy();
	}
	this.actors = [];
}

BaseGame.prototype.createActor = function(x, y, type) {
	this.actors[this.actors.length] = Crafty.e(type);
	this.actors[this.actors.length-1].at(x, y);
}

BaseGame.prototype.loadLevel = function(level) {
	var lw = level[0].length;
	var lh = level.length;
	if (lw > this.geometry.w || lh > this.geometry.h) {
		alert('level too big');
		return;
	}
	var bw = Math.floor((this.geometry.w - lw)/2);
	var bh = Math.floor((this.geometry.h - lh)/2);
	this.clearLevel();
	for (var j = 0; j < lh; j++) {
		for (var i = 0; i < lw; i++) {
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

BaseGame.prototype.actorsAt = function(x, y) {
	var actors = [];
	for (var i = 0; i < Game.actors.length; i++) {
		var a = Game.actors[i];
		if (a.at().x == x && a.at().y == y) {
			actors[actors.length] = a;
		}
	}
	return actors;
}

BaseGame.prototype.controlActors = function() {
	var actors = [];
	for (var i = 0; i < Game.actors.length; i++) {
		var a = Game.actors[i];
		if (a.controllable) {
			actors[actors.length] = a;
		}
	}
	return actors;
}

BaseGame.prototype.vicActors = function() {
	var actors = [];
	for (var i = 0; i < Game.actors.length; i++) {
		var a = Game.actors[i];
		if (a.vicReq) {
			actors[actors.length] = a;
		}
	}
	return actors;
}

BaseGame.prototype.historyAdd = function(diff) {
	this.history.moves = this.history.moves.slice(0, this.history.curTime);
	this.history.moves = this.history.moves.concat([diff]);
	this.history.curTime += 1;
}

BaseGame.prototype.historyForward = function() {
	if (this.history.curTime == this.history.moves.length) {
		return;
	}
	var diff = this.history.moves[this.history.curTime];
	for (i = 0; i < diff[0].length; i++) {
		diff[0][i].move(diff[1][0], diff[1][1], false, true);
	}
	this.history.curTime += 1;
}

BaseGame.prototype.historyBackward = function() {
	if (this.history.curTime == 0) {
		return;
	}
	this.history.curTime -= 1;
	var diff = this.history.moves[this.history.curTime];	
	for (i = 0; i < diff[0].length; i++) {
		diff[0][i].move(-diff[1][0], -diff[1][1], false, true);
	}
}

Game = new BaseGame();
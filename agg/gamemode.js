Gamemodes = {
	test: {
		init: function() {
			this.spawn()
			this.spawn()
		},
		canMerge: function(tile1, tile2) {
			return tile1.val == tile2.val && !tile1.hasMerged && !tile2.hasMerged;
		},
		doMerge: function (tile1, tile2) {
			var tile = Crafty.e('Tile');
			tile.val = tile1.val + tile2.val;
			tile.setText(tile.val);
			tile.hasMerged = true;
			return tile;
		},
		postMove: function () {
			for (var i = 0; i < Game.geometry.w; i++) {
				for (var j = 0; j < Game.geometry.h; j++) {
					if (Game.tiles[j][i]) {
						Game.tiles[j][i].hasMerged = false;
					}
				}
			}
		},
		spawn: function() {
			var spot = Game.randFreeSpot();
			var tile = Crafty.e('Tile');
			tile.val = 2 + 2 * (randint(1,20)==20);
			tile.setText(tile.val);
			Game.placeTile(tile, spot.x, spot.y);
		},
		moveOne: false,
		mergeOne: false
	}
};
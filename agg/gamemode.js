Gamemodes = {
	test: {
		merge: function(tile1, tile2, test) {
			if (this.canMerge(tile1, tile2)) {
				if (test) {
					return true;
				}
				var tile = this.doMerge(tile1, tile2);
				return tile;
			}
			return false;
		},
		canMerge: function(tile1, tile2) {
			return tile1.val == tile2.val;
		},
		doMerge: function (tile1, tile2) {
			var tile = Crafty.e('Tile');
			tile.val = tile1.val + tile2.val;
			tile.setText(tile.val);
			return tile;
		}
	}
};
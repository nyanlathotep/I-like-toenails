Crafty.c('Tile', {
	init: function() {
		this.addComponent('2D, Canvas, Color')
			.color('white');
		this.value = 0;
		this.text = null;
		this.attr({z: 2});
		this.attr(Game.boardPosition(0,0));
	},
	setText: function(text) {
		if (!this.text) {
			this.text = Crafty.e('2D, Canvas, Text')
				.attr({z:3})
				.textFont({family: Game.board.font});
			this.attach(this.text);
		}
		if (text) {
			this.text.text(text);
		}
		var size = this.w/Game.geometry.tf;
		this.text.textFont({size: size+'px'});
		if (this.text.w > this.w) {
			size *= 0.9 * (this.w / this.text.w);
			this.text.textFont({size: size+'px'});
		}
		this.text.attr({x: this.x + (this.w - this.text.w) / 2,
		                y: this.y + (this.h - this.text.h) / 2});
	},
	resize: function(props) {
		this.attr(props);
		this.setText();
	}
});
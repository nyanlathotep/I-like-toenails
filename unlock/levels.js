Levels = [
	{
		name: 'Level 1',
		offX: 0,
		offY: 0,
		data: [
			'__________________',
			'__________________',
			'__________________',
			'__________________',
			'>_________________',
			'__________________',
			'__________________',
			'__________________',
			'__________________',
			'  ________________'
		],
		input: function() {
			return [0, 0, 0, 0];
		},
		verify: function(init, fin) {
			return fin[0] == 1 && fin[1] == 1 && fin[2] == 1 && fin[3] == 1;
		}
	},
	{
		name: 'Level 2',
		offX: 4,
		offY: 3,
		data: [
			'__________',
			'>_________',
			'__________',
			'__________',
			'__________'
		],
		input: function() {
			return [0, 0, 0, 0];
		},
		verify: function(init, fin) {
			return fin[0] == 1 && fin[1] == 2 && fin[2] == 3 && fin[3] == 4;
		}
	},
	{
		name: 'Level 3',
		offX: 4,
		offY: 3,
		data: [
			' ____ ____',
			'>____ ____',
			' ____ ____'
		],
		input: function() {
			return [0, 0, 0, 0];
		},
		verify: function(init, fin) {
			return fin[0] == 2 && fin[1] == 2 && fin[2] == 2 && fin[3] == 2;
		}
	},
	{
		name: 'Level 4',
		offX: 2,
		offY: 2,
		data: [
			'______________',
			'______________',
			'>_____________',
			'______________',
			'______________',
			'______________'
		],
		input: function() {
			return [randint(1, 9), randint(1, 9), randint(1, 9), randint(1, 9)];
		},
		verify: function(init, fin) {
			return fin[0] == init[0] + init[1] * (init[2] - init[3]);
		}
	},
	{
		name: 'Level 5',
		offX: 2,
		offY: 2,
		data: [
			'______________',
			'______________',
			'>_____________',
			'______________',
			'______________',
			'______________'
		],
		input: function() {
			var a = randint(1, 99);
			var b = 0;
			while (b != a) {
				b = randint(1, 99);
			}
			return [a, b, 0, 0];
		},
		verify: function(init, fin) {
			return fin[0] == init[1] && fin[1] == init[0];
		}
	},
	{
		name: 'Level 6',
		offX: 2,
		offY: 2,
		data: [
			'______________',
			'______________',
			'>_____________',
			'______________',
			'______________',
			'______________'
		],
		input: function() {
			return [randint(1, 99), randint(1, 99), randint(1, 99), randint(1, 99)];
		},
		verify: function(init, fin) {
			return fin[0] == 1 && fin[1] == 2 && fin[2] == 3 && fin[3] == 4;
		}
	},
	{
		name: 'Level 7',
		offX: 2,
		offY: 2,
		data: [
			'______________',
			'______________',
			'>_____________',
			'______________',
			'______________',
			'______________'
		],
		input: function() {
			return [0, randint(30, 199), randint(3, 19), 0];
		},
		verify: function(init, fin) {
			return fin[0] == fin[1] % fin[2];
		}
	},
	{
		name: 'Level 8',
		offX: 2,
		offY: 2,
		data: [
			'______________',
			'______________',
			'>_____________',
			'______________',
			'______________',
			'______________'
		],
		input: function() {
			return [randint(1, 99), randint(1, 99), randint(1, 99), randint(1, 99)];
		},
		verify: function(init, fin) {
			return fin[0] == init[0] && fin[1] == init[0] && 
			       fin[2] == init[0] && fin[3] == init[0];
		}
	},
	{
		name: 'Level 9',
		offX: 0,
		offY: 3,
		data: [
			'>_________________',
			'__________________',
			'__________________',
			'__________________'
		],
		input: function() {
			var a = randint(1, 99);
			if (randint(0, 1)) {
				return [a, a, a, a];
			} else {
				var b = 0;
				while (b != a) {
					b = randint(1, 99);
				}
				var stuff = [a, a, a, a];
				stuff[randint(0, 3)] = b;
				return stuff;
			}
		},
		verify: function(init, fin) {
			return fin[0] == fin[1] && fin[1] == fin[2] && fin[2] == fin[3];
		}
	},
	{
		name: 'Level 10',
		offX: 0,
		offY: 0,
		data: [
			'__________________',
			'__________________',
			'__________________',
			'__________________',
			'>_________________',
			'__________________',
			'__________________',
			'__________________',
			'__________________',
			'__________________'
		],
		input: function() {
			return [randint(1, 99), randint(1, 99), randint(1, 99), randint(1, 99)];
		},
		verify: function(init, fin) {
			return fin[0] = Math.min(Math.max(init[0], init[1]), Math.max(init[2], init[3]));
		}
	},
	{
		name: 'Level 11',
		offX: 0,
		offY: 0,
		data: [
			'__________________',
			'__________________',
			'__________________',
			'__________________',
			'>_________________',
			'__________________',
			'__________________',
			'__________________',
			'__________________',
			'__________________'
		],
		input: function() {
			return [randint(1, 99), randint(1, 99), randint(1, 99), randint(1, 99)];
		},
		verify: function(init, fin) {
			return fin[0] == init[3] && fin[1] == init[2] &&
			       fin[2] == init[1] && fin[3] == init[0];
		}
	},
	{
		name: 'Level 12',
		offX: 0,
		offY: 0,
		data: [
			'__________________',
			'__________________',
			'__________________',
			'__________________',
			'>_________________',
			'__________________',
			'__________________',
			'__________________',
			'__________________',
			'__________________'
		],
		input: function() {
			return [0, 0, 0, 0];
		},
		verify: function(init, fin) {
			return fin[0] == 1 && fin[1] == 10 && fin[2] == 100 && fin[3] == 1000;
		}
	},
	{
		name: 'Level 13',
		offX: 0,
		offY: 4,
		data: [
			'>_________________'
		],
		input: function() {
			return [randint(1, 99), randint(1, 99), 0, 0];
		},
		verify: function(init, fin) {
			return fin[0] == init[1] && fin[1] == init[0];
		},
		allowedOps: [
			['#', '^', 'v', '<', '>', 'Y', 'X'],
			['#', '^', 'v', '<', '>', '++', '--', '<<', '>>', null, null, null, null, '~']
		]
	},
	{
		name: 'Level 14',
		offX: 0,
		offY: 0,
		data: [
			'__________________',
			'__________________',
			'__________________',
			'__________________',
			'>_________________',
			'__________________',
			'__________________',
			'__________________',
			'__________________',
			'__________________'
		],
		input: function() {
			return [randint(0, 1), randint(0, 1), randint(0, 1), randint(0, 1)];
		},
		verify: function(init, fin) {
			return init[1] || (!(init[2] || init[3]));
		}
	},
	{
		name: 'Level 15',
		offX: 0,
		offY: 0,
		data: [
			'__________________',
			'__________________',
			'__________________',
			'__________________',
			'>_________________',
			'__________________',
			'__________________',
			'__________________',
			'__________________',
			'__________________'
		],
		input: function() {
			return [0, 0, 0, 0];
		},
		verify: function(init, fin) {
			return fin[0] == 31 && fin[1] == 63 && fin[2] == 127 && fin[3] == 255;
		}
	},
	{
		name: 'Level 16',
		offX: 7,
		offY: 3,
		data: [
			' ___',
			' _  ',
			'>_  ',
			' ___'
		],
		input: function() {
			return [0, randint(85, 99), 0, 0];
		},
		verify: function(init, fin) {
			return fin[0] == init[1] && fin[1] == init[1];
		},
		allowedOps: [
			['#', '^', 'v', '<', '>', 'Y', 'X'],
			['#', '^', 'v', '<', '>', '++', '--', '<<', '>>', null, null, null, null, '~']
		]
	},
	{
		name: 'Level 17',
		offX: 0,
		offY: 0,
		data: [
			'__________________',
			'__________________',
			'__________________',
			'__________________',
			'>_________________',
			'__________________',
			'__________________',
			'__________________',
			'__________________',
			'__________________'
		],
		input: function() {
			return [0, 0, 0, 0];
		},
		verify: function(init, fin) {
			return fin[0] == 10 && fin[1] == 20 && fin[2] == 30 && fin[3] == 40;
		},
		allowedOps: [
			['#', '^', 'v', '<', '>', 'Y', 'X'],
			['#', '^', 'v', '<', '>', '++', '--', '<<', '>>', null, null, null, null, '~']
		]
	},
	{
		name: 'Level 19',
		offX: 7,
		offY: 3,
		data: [
			'  ___',
			'  _ _',
			'__ __',
			'_ _',
			'_>_'
		],
		input: function() {
			return [0, 0, 0, 0];
		},
		goal: function() {
			return [randint(75, 99), 0, 0, 0];
		}
		verify: function(init, fin, goal) {
			return fin[0] == goal[0];
		}
		allowedOps: [
			['#', '^', 'v', '<', '>', 'Y', 'X'],
			['#', '^', 'v', '<', '>', '++', '--', '<<', '>>', null, null, null, null, '~']
		]
	},
	{
		name: 'Level 18',
		offX: 0,
		offY: 0,
		data: [
			'__________________',
			'__________________',
			'__________________',
			'__________________',
			'>_________________',
			'__________________',
			'__________________',
			'__________________',
			'__________________',
			'__________________'
		],
		input: function() {
			var a = randint(1, 99);
			var b = 0;
			while (b != a) {
				b = randint(1, 99);
			}
			return [a, b, 0, 0];
		},
		verify: function(init, fin) {
			return fin[0] == init[1] && fin[1] == init[0];
		}
		allowedOps: [
			['#', '^', 'v', '<', '>', 'Y', 'X'],
			['#', '^', 'v', '<', '>', '++', '--', '<<', '>>', null, null, null, null, '~']
		]
	}
];
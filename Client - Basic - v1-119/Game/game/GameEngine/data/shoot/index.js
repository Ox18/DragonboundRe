var Types = require('../../../gametypes');
let shoot = {};
shoot[Types.MOBILE.ARMOR] = {
	's1': [{
		additional: {
			ang: 0,
			power: 0
		},
		info: {
			img: 0,
			exp: 0,
		}
	}],
	's2': [{
		additional: {
			ang: 0,
			power: 0
		},
		info: {
			img: 1,
			exp: 0,
		}
	}, {
		additional: {
			ang: 0,
			power: 0
		},
		info: {
			img: 1,
			exp: 0,
		}
	}],
	'ss': [{
		additional: {
			ang: 0,
			power: 0
		},
		info: {
			img: 2,
			exp: 0,
		}
	}]
};
shoot[Types.MOBILE.TRICO] = {
	's1': [{
		additional: {
			ang: 0,
			power: 0
		},
		info: {
			img: 0,
			exp: 0,
			hole: {
				w: 34,
				h: 25
			}
		}
	}],
	's2': [{
		additional: {
			ang: 0,
			power: 0
		},
		info: {
			img: 39,
			exp: 29,
			orbit: [90,
				150,
				0.5,
				45
			],
			hole: {
				w: 34,
				h: 25
			},
		}
	}, {
		additional: {
			ang: 0,
			power: 0
		},
		info: {
			img: 39,
			exp: 29,
			hole: {
				w: 34,
				h: 25
			}
		}
	}, {
		additional: {
			ang: 0,
			power: 0
		},
		info: {
			img: 39,
			exp: 29,
			orbit: [270,
				150,
				0.5,
				45
			],
			hole: {
				w: 34,
				h: 25
			}
		}
	}],
	'ss': [{
		additional: {
			ang: 0,
			power: 0
		},
		info: {
			img: 2,
			exp: 0,
		}
	}]
};
shoot[Types.MOBILE.LIGHTNING] = {
	's1': [{
		additional: {
			ang: 0,
			power: 0
		},
		info: {
			img: 11,
			exp: null,
			explodeGhost: true,
			before: {
	            lightning: true,
	            thor: false,
	            lightning2: false
        	}
		}
	}],
	's2': [{
		additional: {
			ang: 0,
			power: 0
		},
		info: {
			img: 11,
			exp: null,
			explodeGhost: true,
			before: {
	            lightning: false,
	            thor: false,
	            lightning2: true
        	}
		}
	}],
	'ss': [{
		additional: {
			ang: 0,
			power: 0
		},
		info: {
			img: 2,
			exp: 0,
		}
	}]
};
module.exports = shoot;

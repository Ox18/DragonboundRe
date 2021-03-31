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
			]
		}
	}, {
		additional: {
			ang: 0,
			power: 0
		},
		info: {
			img: 39,
			exp: 29,
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
			]
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

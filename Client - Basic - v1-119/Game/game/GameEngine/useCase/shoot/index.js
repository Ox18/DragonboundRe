const shootData = require('../../data/shoot');
class Shoot {
	constructor(){
		this.type = ['s1','s2','ss']
	}
	getShoot(numberOfMobile, typeOfShoot){
		return shootData[numberOfMobile] ? shootData[numberOfMobile] : shootData[0];

	}
}
const shoot = new Shoot();

module.exports = shoot;
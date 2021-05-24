const helper = require("../../Utilities/Helper");
const Types = require("../../gametypes");
const { ADUKA, NAK } = Types.MOBILES;

class Projectile{
  GuessMetaData(point, body, look, ang, power, wind, mobile, mobile_data){
    const lookLeft = look === 0;
    const isReverseMobile = mobile === ADUKA || mobile === NAK;
    let data = {
      ligth: this.GuessLigth(wind, mobile_data),
      angle: this.GuessAngle(ang, lookLeft, body),
      power: this.GuessPower(power),
      distance: this.GuessDistance(isReverseMobile, lookLeft),
    };
    data.point = this.GuessPoint(point, data.distance, isReverseMobile);
    data.final = helper.RotatePoint(data.point, point, data.angle);
    return data;
  }
  GuessPoint(point, distance, isReverseMobile){
    return {
      x: point.x + distance,
      y: point.y - isReverseMobile ? 31 : 28
    };
  }
  GuessDistance(isReverseMobile, lookLeft){
    return lookLeft ? (isReverseMobile ? 26 : -11) : (isReverseMobile ? -26 : 11);
  }
  GuessPower(power){
    return parseInt(power * 234 / 100);
  }
  GuessAngle(angle, lookLeft, body){
    return (lookLeft ? angle : 180 - angle) - body;
  }
  GuessLigth(wind, mobile_data){
    const { bx, by } = mobile_data;
    const Weight = this.GuessWeight(wind, bx, by);
    const noWind = wind.power === 0;
    return {
      ax: noWind ? 0 : Math.round(0 - Weight.b0),
      ay: noWind ? by : Math.round(by - Weight.b1)
    }
  }
  GuessWeight(wind, bx, by){
    return {
      b0: Math.round(parseInt(Math.cos(helper.AngleToRad(wind.angle)) * wind.power * by)) / 100,
      b1: Math.round(parseInt(Math.cos(helper.AngleToRad(wind.angle)) * wind.power * by - bx)) / 100
    }
  }
  
};

module.exports = new Projectile();

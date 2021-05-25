const helper = require("../Utilities/Helper");
const Types = require('../gametypes');
const { ADUKA, NAK } = Types.MOBILES;
class Look {
  constructor(look) {
    this.data = look;
    this.isLeft = look === 0;
    this.isRight = look === 1;
  }
}
class Item {
  constructor(item) {
    this.number = item;
    this.isDual = this.isEqualsTo(0);
    this.isTeleport = this.isEqualsTo(1);
    this.isDualPlus = this.isEqualsTo(2);
  }
  isEqualsTo(a) {
    return a === this.number;
  }
}
class GameShoot {
  constructor(x, y, body, look, angle, power, time, type, account) {
    this.point = helper.Point(x, y);
    this.center = this.point;
    this.body = body;
    this.look = new Look(look)
    this.angle = this.GuessAngle(angle, body);
    this.power = power;
    this.time = time;
    this.type = type;
    this.account = account;
    this.flip = this.GuessFlipMobile(account.player.mobile);
    this.distance = this.GuessDistance();
    this.ligth = null;
    this.final = null;
    this.isItem = this.GuessIsItem();
    this.Item = new Item(account.player.itemInUse);
    this.ItemMethod = this.GuessItemMethod();
    this.ProjectileName = this.GuessProjectileName();
    this.Init();
  }
  Init() {
    this.point = this.GuessPoint();
    this.final = this.GuessFinal();
  }
  GuessIsItem() {
    const { itemInUse } = this.account.player;
    const items = [0, 1, 2];
    return items.includes(itemInUse);
  }
  GuessFinal() {
    return helper.RotatePoint(this.point, this.center, this.angle);
  }
  GuessPoint() {
    return {
      x: this.point.x + this.distance,
      y: this.point.y - this.flip ? 31 : 28
    };
  }
  UpdateLigth(wind, mobile_data) {
    const { bx, by } = mobile_data;
    const Weight = this.GuessWeight(wind, bx, by);
    const noWind = wind.power === 0;
    this.ligth = {
      ax: noWind ? 0 : Math.round(0 - Weight.b0),
      ay: noWind ? by : Math.round(by - Weight.b1)
    }
  }
  GuessWeight(wind, bx, by) {
    return {
      b0: Math.round(parseInt(Math.cos(helper.AngleToRad(wind.angle)) * wind.power * by)) / 100,
      b1: Math.round(parseInt(Math.cos(helper.AngleToRad(wind.angle)) * wind.power * by - bx)) / 100
    }
  }
  GuessDistance() {
    return this.look.isLeft ? (this.flip ? 26 : -1) : (this.flip ? -26 : 11);
  }
  GuessFlipMobile(mobile) {
    return mobile === NAK || mobile === ADUKA;
  }
  GuessPower(power) {
    return parseInt(power * 234 / 100);
  }
  GuessAngle(angle, body) {
    return (this.look.isLeft ? angle : 180 - angle) - body;
  }
  GuessItemMethod() {
    let number = this.Item.isDual ? (this.type === 0 ? 0 : 1) : (this.type === 0 ? 1 : 0);
    return this.Item.isTeleport ? null : this.GetMethodProjectile(number);
  }
  GetMethodProjectile(number) {
    let data = ['getS1', 'getS2', 'getSS'];
    return data[number];
  }
  GuessProjectileName() {
    return {
      first: this.GetMethodProjectile(this.type),
      second: this.ItemMethod
    }
  }
}

module.exports = GameShoot;
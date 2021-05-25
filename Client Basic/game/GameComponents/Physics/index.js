/* 
 * Copyright (C) 2021, Alex. <xander.scorpio@gmail.com>
 * This file is part of SocialBound.
 * SocialBound is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation, either version 3 of the License, or(at your option) any later version.
 * 
 * SocialBound is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty
 * of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along with SocialBound. If not, see http://www.gnu.org/licenses/.
 */

const Helper = require('../../Utilities/Helper');

class ZotataPhysics {
  constructor(x0, y0, ang, power, ax, ay) {
    this.x0 = x0;
    this.y0 = y0;
    this.v  = Helper.Vector(ang, power);
    this.ax = ax;
    this.ay = ay;
  }
  GetPosAtTime(a) {
    a /= 485;
    return {
      x: Math.ceil(this.x0 + this.v.x * a + this.ax * a * a / 2),
      y: Math.ceil(this.y0 + this.v.y * a + this.ay * a * a / 2)
    };
  }
  GetPosAtTimeJumping(a, b) {
    for (var d = -1, c = 0; c < b.length; c++) a >= b[c][0] && (d = c);
    var e, f, h, k, m;
    k = this.ax;
    m = this.ay; - 1 == d ? (c = this.x0, e = this.y0, f = this.v.x, h = this.v.y, d = a / 485) : (c = b[d][1], e = b[d][2], f = b[d][3], h = b[d][4], d = (a - b[d][0]) / 485);
    return {
      x: Math.ceil(c + f * d + k * d * d / 2),
      y: Math.ceil(e + h * d + m * d * d / 2)
    }
  }
  GetPosAtTimeOrbit(a, b, c, d, e) {
    a /= 485;
    return Helper.CalcOrbitPoint(this.x0 + this.v.x * a + this.ax * a * a / 2, this.y0 + this.v.y * a + this.ay * a * a / 2, a >= d ? e : e * a / d, b + c * a)
  }
  GetPosAtTimeWave(a, b) {
    var c = a / 485,
      d = Math.ceil(this.x0 + this.v.x * c + this.ax * c * c / 2),
      c = Math.ceil(this.y0 + this.v.y * c + this.ay * c * c / 2),
      e = this.GetAngleAtTime(a),
      f;
    1 == b || 2 == b ? (f = 15 * Math.sin(a / 60), e = -e + (1 == b ? 90 : -90)) : 3 == b || 4 == b ? (e = -e + (3 == b ? 90 : -90), f = 400 > a ? a / 400 * 25 : 2200 > a ? 25 * Math.cos((a - 400) / 95) : 2600 > a ? 25 - (a - 1800 - 400) / 400 * 22 : 3) : e = f = 0;
    return Helper.CalcOrbitPoint(d, c, f, e)
  }
  GetAngleAtTime(a) {
    var b = this.GetPosAtTime(a - 5);
    a = this.GetPosAtTime(a + 5);
    return Helper.RadToAngle(Math.atan2(a.y - b.y, a.x - b.x))
  }
  GetAngleAtTimeWave(a, b) {
    var c = this.GetPosAtTimeWave(a - 5, b),
      d = this.GetPosAtTimeWave(a + 5, b);
    return RadToAngle(Math.atan2(d.y - c.y, d.x - c.x))
  }
};

module.exports = ZotataPhysics;
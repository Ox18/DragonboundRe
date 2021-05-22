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
    this.v = Helper.Vector(ang, power);
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
  GetAngleAtTime(a) {
    var b = this.GetPosAtTime(a - 5);
    a = this.GetPosAtTime(a + 5);
    return Helper.RadToAngle(Math.atan2(a.y - b.y, a.x - b.x))
  }
};

module.exports = ZotataPhysics;
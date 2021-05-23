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

const Mobile = require("../../Entity/Mobile");
const helper = require("../../Utilities/Helper");
const adukaProjectile = require("../Projectile/AdukaProjectile");

class Aduka extends Mobile {
  constructor() {
    super();
    this.name       = 'Aduka';
    this.file       = 'aduka';
    this.hp         = 1000;
    this.shield     = 0;
    this.player     = helper.Point(17, -28);
    this.ang        = helper.Angle(10, 55);
    this.a          = helper.Point(73.5, 0.74);
    this.b          = helper.Point(200, 398);
    this.aim        = helper.aim(helper.aim_data(52, 33), helper.aim_data(52, 33), helper.aim_data(52, 33));
    this.projectile = adukaProjectile;
  }
}

module.exports = new Aduka();
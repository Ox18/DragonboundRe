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

const Types = require("../../gametypes");
const { BULLETS, EXPLODE } = Types;
class TeleportProjectile {
  Get() {
    return [{
      data: {
        img: BULLETS.TELEPORT,
        exp: EXPLODE.TELEPORT,
        isTeleport: true,
        hole: [0, 0]
      },
      type: {
        isEndColliding: true,
        isNotDamage: true
      },
      subBullet: [],
      currentData: {}
    }];
  }
}

const teleportProjectile = new TeleportProjectile();
module.exports = teleportProjectile;
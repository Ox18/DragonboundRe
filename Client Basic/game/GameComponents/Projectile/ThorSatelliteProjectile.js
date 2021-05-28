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
const Helper = require("../../Utilities/Helper");
const { EXPLODE } = Types;

class ThorSatelliteProjectile {
    Get(thor, explode, stime = 0) {
        return [{
            data: {
                img: undefined,
                exp: EXPLODE.ADUKA1_THOR,
                hole: [27, 15],
                stime: stime,
                power: 500,
                x0: thor.x,
                y0: thor.y,
                ang: Helper.AngleBetween(explode, thor),
                ax: 0,
                ay: 0,
                thor: 1
            },
            type: {
                isEndColliding: true,
                isExplode: true,
                isDamage: true,
                isTimeFinalZero: true
            },
            subBullet: [],
            currentData: {}
        }];
    }
}
module.exports = new ThorSatelliteProjectile();
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

const helper = require("../../Utilities/Helper");
const Types = require("../../gametypes");
const { BULLETS, EXPLODE } = Types;

class BigfootProjectile {
    getS1(stime = 0) {
        return [{
                data: {
                    img: BULLETS.BIGFOOT1,
                    exp: EXPLODE.BIGFOOT1SS,
                    stime: stime,
                    hole: helper.Pivot(33, 21)
                },
                type: {
                    isEndColliding: true,
                    isExplode: true,
                    isDamage: true
                },
                subBullet: [],
                currentData: {}
            },
            {
                data: {
                    img: BULLETS.BIGFOOT1,
                    exp: EXPLODE.BIGFOOT1SS,
                    stime: stime + 200,
                    hole: helper.Pivot(33, 21)
                },
                type: {
                    isEndColliding: true,
                    isExplode: true,
                    isDamage: true
                },
                subBullet: [],
                currentData: {
                    power: 10,
                    ang: 4
                }
            },
            {
                data: {
                    img: BULLETS.BIGFOOT1,
                    exp: EXPLODE.BIGFOOT1SS,
                    stime: stime + 400,
                    hole: helper.Pivot(33, 21)
                },
                type: {
                    isEndColliding: true,
                    isExplode: true,
                    isDamage: true
                },
                subBullet: [],
                currentData: {
                    power: -10,
                    ang: -2
                }
            },
            {
                data: {
                    img: BULLETS.BIGFOOT1,
                    exp: EXPLODE.BIGFOOT1SS,
                    stime: stime + 600,
                    hole: helper.Pivot(33, 21)
                },
                type: {
                    isEndColliding: true,
                    isExplode: true,
                    isDamage: true
                },
                subBullet: [],
                currentData: {
                    power: 20,
                    ang: 6
                }
            }
        ];
    }
    getS2(stime = 0) {
        return [{
                data: {
                    img: BULLETS.BIGFOOT2,
                    exp: EXPLODE.BIGFOOT2,
                    stime: stime,
                    hole: helper.Pivot(28, 19)
                },
                type: {
                    isEndColliding: true,
                    isExplode: true,
                    isDamage: true
                },
                subBullet: [],
                currentData: {
                    ang: 0,
                    power: 0
                }
            },
            {
                data: {
                    img: BULLETS.BIGFOOT2,
                    exp: EXPLODE.BIGFOOT2,
                    stime: stime,
                    hole: helper.Pivot(28, 19)
                },
                type: {
                    isEndColliding: true,
                    isExplode: true,
                    isDamage: true
                },
                subBullet: [],
                currentData: {
                    ang: -5,
                    power: -15
                }
            },
            {
                data: {
                    img: BULLETS.BIGFOOT2,
                    exp: EXPLODE.BIGFOOT2,
                    stime: stime,
                    hole: helper.Pivot(28, 19)
                },
                type: {
                    isEndColliding: true,
                    isExplode: true,
                    isDamage: true
                },
                subBullet: [],
                currentData: {
                    ang: -10,
                    power: -30
                }
            }, {
                data: {
                    img: BULLETS.BIGFOOT2,
                    exp: EXPLODE.BIGFOOT2,
                    stime: stime + 200,
                    hole: helper.Pivot(28, 19)
                },
                type: {
                    isEndColliding: true,
                    isExplode: true,
                    isDamage: true
                },
                subBullet: [],
                currentData: {
                    ang: 0,
                    power: 0
                }
            },
            {
                data: {
                    img: BULLETS.BIGFOOT2,
                    exp: EXPLODE.BIGFOOT2,
                    stime: stime + 200,
                    hole: helper.Pivot(28, 19)
                },
                type: {
                    isEndColliding: true,
                    isExplode: true,
                    isDamage: true
                },
                subBullet: [],
                currentData: {
                    ang: -5,
                    power: -15
                }
            },
            {
                data: {
                    img: BULLETS.BIGFOOT2,
                    exp: EXPLODE.BIGFOOT2,
                    stime: stime + 200,
                    hole: helper.Pivot(28, 19)
                },
                type: {
                    isEndColliding: true,
                    isExplode: true,
                    isDamage: true
                },
                subBullet: [],
                currentData: {
                    ang: -10,
                    power: -30
                }
            }
        ];
    }
    getSS(stime = 0) {
        return [{
                data: {
                    img: BULLETS.BIGFOOTSS,
                    exp: EXPLODE.BIGFOOT1SS,
                    stime: stime,
                    hole: helper.Pivot(33, 22)
                },
                type: {
                    isEndColliding: true,
                    isExplode: true,
                    isDamage: true
                },
                subBullet: [],
                currentData: {
                    ang: 0,
                    power: 0
                }
            },
            {
                data: {
                    img: BULLETS.BIGFOOTSS,
                    exp: EXPLODE.BIGFOOT1SS,
                    stime: stime + 100,
                    hole: helper.Pivot(33, 22)
                },
                type: {
                    isEndColliding: true,
                    isExplode: true,
                    isDamage: true
                },
                subBullet: [],
                currentData: {
                    ang: 4,
                    power: 10
                }
            },
            {
                data: {
                    img: BULLETS.BIGFOOTSS,
                    exp: EXPLODE.BIGFOOT1SS,
                    stime: stime + 200,
                    hole: helper.Pivot(33, 22)
                },
                type: {
                    isEndColliding: true,
                    isExplode: true,
                    isDamage: true
                },
                subBullet: [],
                currentData: {
                    ang: -2,
                    power: -10
                }
            },
            {
                data: {
                    img: BULLETS.BIGFOOTSS,
                    exp: EXPLODE.BIGFOOT1SS,
                    stime: stime + 300,
                    hole: helper.Pivot(33, 22)
                },
                type: {
                    isEndColliding: true,
                    isExplode: true,
                    isDamage: true
                },
                subBullet: [],
                currentData: {
                    ang: 6,
                    power: 20
                }
            },
            {
                data: {
                    img: BULLETS.BIGFOOTSS,
                    exp: EXPLODE.BIGFOOT1SS,
                    stime: stime + 400,
                    hole: helper.Pivot(33, 22)
                },
                type: {
                    isEndColliding: true,
                    isExplode: true,
                    isDamage: true
                },
                subBullet: [],
                currentData: {
                    ang: 1,
                    power: 0
                }
            },
            {
                data: {
                    img: BULLETS.BIGFOOTSS,
                    exp: EXPLODE.BIGFOOT1SS,
                    stime: stime + 500,
                    hole: helper.Pivot(33, 22)
                },
                type: {
                    isEndColliding: true,
                    isExplode: true,
                    isDamage: true
                },
                subBullet: [],
                currentData: {
                    ang: 3,
                    power: 10
                }
            },
            {
                data: {
                    img: BULLETS.BIGFOOTSS,
                    exp: EXPLODE.BIGFOOT1SS,
                    stime: stime + 600,
                    hole: helper.Pivot(33, 22)
                },
                type: {
                    isEndColliding: true,
                    isExplode: true,
                    isDamage: true
                },
                subBullet: [],
                currentData: {
                    ang: -1,
                    power: -10
                }
            },
            {
                data: {
                    img: BULLETS.BIGFOOTSS,
                    exp: EXPLODE.BIGFOOT1SS,
                    stime: stime + 700,
                    hole: helper.Pivot(33, 22)
                },
                type: {
                    isEndColliding: true,
                    isExplode: true,
                    isDamage: true
                },
                subBullet: [],
                currentData: {
                    ang: 5,
                    power: 20
                }
            }
        ]
    }
}

const bigfootProjectile = new BigfootProjectile();
module.exports = bigfootProjectile;
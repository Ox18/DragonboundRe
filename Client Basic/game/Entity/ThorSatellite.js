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

const Helper = require("../Utilities/Helper");

module.exports = class ThorSatellite {
    constructor() {
        this.x = this.GetRandomX();
        this.y = this.GetRandomY();
        this.angle = this.GetRandomAngle();
        this.damage = 0;
        this.stepLimit = 10;
    }
    Fetch() {
        this.x += this.GuessMove();
        this.y += this.GuessMove();
        this.angle += this.GuessMove();
    }
    GuessMove() {
        return this.GetRandomMove() ? this.GuessStep() : -this.GuessStep();
    }
    GuessStep() {
        return Helper.random(0, this.stepLimit);
    }
    GetRandomMove() {
        return Helper.random(0, 1);
    }
    GetRandomAngle() {
        return Helper.random(0, 360);
    }
    GetRandomX() {
        return Helper.random(100, 1200);
    }
    GetRandomY() {
        return Helper.random(-700, 100);
    }

}
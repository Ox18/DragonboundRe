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

class Weather{
    constructor(){
        this.Empty = -1;
        this.Thor  = 0;
        this.Wind  = 1;
    }
    
    WeatherList(){
        return [this.Empty, this.Thor, this.Wind];
    }
    GetRandomWeather(){
        let count  = this.WeatherList().length - 1;
        let number = Helper.random(0, count)
        return this.WeatherList()[number];
    }
}

const weather = new Weather();
module.exports = weather;
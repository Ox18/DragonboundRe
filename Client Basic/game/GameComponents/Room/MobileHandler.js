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

class MobileHandler{
    GuessMobile(inRoom, mobile_number, haveFox, isGM){
        const isIn = Mobile.CheckMobile(mobile_number);
        const isFox = mobile_number === Mobile.FOX;
        const isSpecial = Mobile.IsSpecial(mobile_number);
        let validated = false;
        if(inRoom && isIn){
            if(isFox){
                if(haveFox) validated = true;
            }
            else if(isSpecial){
                if(isGM) validated = true;
            }
            else validated = true;
        }
        return validated;
    }
}
const mobileHandler = new MobileHandler();
module.exports = mobileHandler;
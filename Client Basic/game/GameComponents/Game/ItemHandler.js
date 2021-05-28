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

class ItemHandler{
    GuessItems(items, is_dual_plus_disabled, is_tele_disabled){
        let item_selected = items;
        let number_item   = 0;
        let count_item    = 6;
        for(number_item; number_item < count_item; number_item++){
            let item = item_selected[number_item];
            let is_disabled = false;
            if(item === Types.ITEM.DUAL_PLUS && is_dual_plus_disabled){
                is_disabled = true;
            }
            if(item === Types.ITEM.TELEPORT && is_tele_disabled){
                is_disabled = true;
            }
            if(is_disabled){
                item_selected[number_item] = -1;
            }
        }
        return item_selected;
    }
}
const itemHandler = new ItemHandler();
module.exports = itemHandler;
const Types = require("../../gametypes");

class ItemHandler{
    GuessItems(items, is_dual_plus_disabled, is_tele_disabled){
        let item_selected = items;
        let number_item = 0;
        let count_item = 6;
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
const Mobile = require("../../Entity/Mobile");

class MobileHandler{
    GuessMobile(inRoom, mobile_number, haveFox, isGM){
        const isIn = Mobile.CheckMobile(mobile_number);
        const isFox = mobile_number === Mobile.FOX;
        const isSpecial = Mobile.isSpecial(mobile_number);
        let validated = false;
        if(inRoom && isIn){
            if(isFox || isSpecial){
                if(haveFox || isGM) isValid = true;
            }
            else isValid = true;
        }
        return validated;
    }
}
const mobileHandler = new MobileHandler();
module.exports = mobileHandler;
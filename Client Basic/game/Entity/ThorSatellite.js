const Helper = require("../Utilities/Helper");

module.exports = class Thor{
    constructor(){
        this.x = this.GetRandomX();
        this.y = this.GetRandomY();
        this.angle = this.GetRandomAngle();
        this.damage = 0;
    }
    GetRandomAngle(){
        return Helper.random(0, 360);
    }
    GetRandomX(){
        return Helper.random(0, 1200);
    }
    GetRandomY(){
        return Helper.random(-700, 0);
    }
}
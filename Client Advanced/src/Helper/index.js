class Helper{
    static random(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    static getMax(array){
        return Math.max.apply(null, array);
    }
    static getMin(array){
        return Math.min.apply(null, array);
    }
    static RadToAngle(rad) {
        return 180 * rad / Math.PI;
    }
    static AngleToRad(angle) {
        return angle * Math.PI / 180;
    }
    static Vector2(ang, size){
        return {
            ang,
            size,
            x: Math.cos(ang * Math.PI / 180) * size,
            y: -Math.sin(ang * Math.PI / 180) * size
        }
    }   
    static textParams(text, params){
         let lastText = text;
         params.map(param => lastText = lastText.replace("$?", param) );
         return lastText;
    }
}

module.exports = Helper;

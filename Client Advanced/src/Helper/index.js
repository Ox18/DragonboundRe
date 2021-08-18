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
    static Vector2(ang, size){
        return {
            ang,
            size,
            x: Math.cos(Helper.AngleToRad(ang)) * size,
            y: -Math.sin(Helper.AngleToRad(ang)) * size
        }
    }
    static AngleToRad(angle) {
        return angle * Math.PI / 180;
    }
    
    // An example
    // const text = "Hi, my name is $?, and I'm a member of the $? staff.";
    // const params = ["Alex", "SocialBound"];
    // Helper.textParams(text, params);
    // result is: "Hi, my name is Alex, and I'm a member of the SocialBound staff."
    // Can be used to parse important messages, such as messages displayed in the lobby.
    static textParams(text, params){
         return params.map(param => text = text.replace("$?", param))[params.length - 1];
    }
}

module.exports = Helper;

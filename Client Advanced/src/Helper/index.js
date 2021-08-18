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
    
    // An example
    // const text = "Hi, my name is $?, and I'm a member of the $? staff.";
    // const params = ["Alex", "SocialBound"];
    // Helper.textParams(text, params);
    // result is: "Hi, my name is Alex, and I'm a member of the SocialBound staff."
    static textParams(text, params){
         return params.map(param => text = text.replace("$?", param))[params.length - 1];
    }
}

module.exports = Helper;

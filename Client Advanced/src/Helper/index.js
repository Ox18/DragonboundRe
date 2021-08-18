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
    static rotatePoint(point, center, beforeAngle) {
        const angle = Helper.AngleToRad(beforeAngle);        
        return {
            x: Math.floor(Math.cos(angle) * (point.x - center.x) - Math.sin(angle) * (point.y - center.y) + center.x),
            y: Math.floor(Math.sin(angle) * (point.x - center.x) + Math.cos(angle) * (point.y - center.y) + center.y),
        }
    }
    static vector(ang, size){
        const { x, y } = Helper.Vector2(ang, size);
        return { x, y };
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
    // Puedes usar un parametro personalizado para el parseo de string
    // const text = "Hola, mi nombre es @, y soy miembro del staff de @"
    // const params = ["Alex", "SocialBound"];
    // Helper.textParams(text, params, "@");
    static textParams(text, params, replacer = "$?"){
         return params.map(param => text = text.replace(replacer, param))[params.length - 1];
    }
    
}

module.exports = Helper;

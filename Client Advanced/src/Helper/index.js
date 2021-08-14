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
}

module.exports = Helper;
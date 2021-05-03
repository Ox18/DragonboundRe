const Helper = require("../Utilities/Helper");

class Weather{
    constructor(){
        this.Empty = -1;
        this.Thor = 0;
        this.Wind = 1;
    }
    
    WeatherList(){
        return [this.Empty, this.Thor, this.Wind];
    }
    GetRandomWeather(){
        let count = this.WeatherList().length - 1;
        let number = Helper.random(0, count)
        return this.WeatherList()[number];
    }
}

const weather = new Weather();
module.exports = weather;
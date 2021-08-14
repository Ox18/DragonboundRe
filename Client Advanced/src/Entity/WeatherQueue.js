const WeatherTypes = require("../types/WeatherTypes");

class WeatherQueue{
    constructor(queue){
        this.queue = queue;
        this.nextWeather = WeatherTypes.NOCHANGE;
    }

    // getters
    GetQueue(){
        return this.queue;
    }
    GetNextWeather(){
        return this.nextWeather;
    }

    // setters
    SetQueue(queue){
        this.queue = queue;
    }
    SetNextWeather(nextWeather){
        this.nextWeather = nextWeather;
    }
}

module.exports = WeatherQueue;
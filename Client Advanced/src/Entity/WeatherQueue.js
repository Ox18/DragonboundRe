const WeatherTypes = require("../types/WeatherTypes");

// Las propiedades de esta clase deben de ser instancias de colas tipo FIFO
class WeatherQueue{
    constructor(queue){
        this.queue = queue;
        this.nextWeather = WeatherTypes.NOCHANGE;
    }
    
    GetQueue(){
        return this.queue;
    }
    
    GetNextWeather(){
        return this.nextWeather;
    }

    SetQueue(queue){
        this.queue = queue;
    }
    
    SetNextWeather(nextWeather){
        this.nextWeather = nextWeather;
    }
}

module.exports = WeatherQueue;

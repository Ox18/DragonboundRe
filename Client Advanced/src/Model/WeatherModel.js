const WeatherType = require("../types/WeatherTypes");
const WeatherQueue = require("../Entity/WeatherQueue");
const Helper = require('../Helper');

class WeatherModel{
    static update(weatherEntity){
        const next_weather = WeatherModel.getIdRandomWeather();
        weatherEntity.weatherQueue.SetNextWeather(next_weather);
        if(next_weather !== WeatherType.NOCHANGE){
            let next_queue = (weatherEntity.weatherQueue.getQueue()).shift();
            next_queue.push(next_weather);
            weatherEntity.weatherQueue.SetQueue(next_queue);
        }
        return weatherEntity;
    }
    
    static buildWeatherEntity(){
        const weatherQueue = WeatherModel.buildInitialQueue();
        return weatherQueue;
    }

    static buildInitialQueue(){
        let queue = Array.from({length: 5}, () => WeatherModel.getIdRandomWeather())        
        return new WeatherQueue(queue);
    }

    static getIdRandomWeather(){    
        const min = WeatherModel.getMinWeatherId();
        const max = WeatherModel.getMaxWeatherId();
        return Helper.random(min, max);
    }
    
    static getMinWeatherId(){
        return Helper.getMin(WeatherModel.WeatherListToNumberList());
    }
    
    static getMaxWeatherId(){
        return Helper.getMax(WeatherModel.WeatherListToNumberList());
    }

    static WeatherListToNumberList(){
        return Object.values(WeatherType);
    }
}

module.exports = WeatherModel;

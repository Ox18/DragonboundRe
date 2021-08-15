const WeatherType = require("../types/WeatherTypes");
const WeatherQueue = require("../Entity/WeatherQueue");
const Helper = require('../Helper');

class WeatherModel{

    static buildInitialQueue(){
        let queue = [];
        let limitQueue = 5;
        let pointerQueue = 0;
        for(pointerQueue; pointerQueue < limitQueue; pointerQueue++){
            queue.push(WeatherModel.getIdRandomWeather());
        }
        // queue = Array.from({length: limitQueue}, (x) => WeatherModel.getIdRandomWeather())
        
        return new WeatherQueue(queue);
    }

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

    static getIdRandomWeather(){
        const min = Helper.getMin(WeatherModel.WeatherListToNumberList());
        const max = Helper.getMax(WeatherModel.WeatherListToNumberList());
        return Helper.random(min, max);
    }

    static WeatherListToNumberList(){
        return Object.values(WeatherType);
    }
    
    
    // static getMinWeatherId(){
        // const min = Helper.getMin(WeatherModel.WeatherListToNumberList());
    //}
    
    // static getMaxWeatherId(){
        // const min = Helper.getMax(WeatherModel.WeatherListToNumberList());
    //}
    
    
    static buildWeatherEntity(){
        const weatherQueue = WeatherModel.buildInitialQueue();
        return weatherQueue;
    }
}

module.exports = WeatherModel;

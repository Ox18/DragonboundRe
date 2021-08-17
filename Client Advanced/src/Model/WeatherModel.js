const WeatherType = require("../types/WeatherTypes");
const WeatherQueue = require("../Entity/WeatherQueue");
const Helper = require('../Helper');

class WeatherModel{
    static update(weatherEntity){
        const next_weather = WeatherModel.getIdRandomWeather();
        weatherEntity.weatherQueue.SetNextWeather(next_weather);
        if(next_weather !== WeatherType.NOCHANGE){
            weatherEntity.weatherQueue.SetQueue([...(weatherEntity.weatherQueue.getQueue()).shift(), next_weather]);
        }
        return weatherEntity;
    }
    
    static buildWeatherEntity(){
        return WeatherModel.buildInitialQueue();
    }

    static buildInitialQueue(){
        return Array.from({length: 5}, () => WeatherModel.getIdRandomWeather())        
    }

    static getIdRandomWeather(){    
        return Helper.random(WeatherModel.getMinWeatherId(), WeatherModel.getMaxWeatherId());
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
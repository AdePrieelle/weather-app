import React from 'react';
import { useSelector } from 'react-redux';
import { 
  formatLocalTime,
  formatLocalDateTimestampWeekday,
  convertTemperatureUnits,
  convertWindSpeedToBeaufort,
} from '../../../common/helpers';
import '../../../styles/WeatherNewsCategory.scss';
import './TwoDaysForecastContentHourDayPartWrapper.scss';
import { WindArrowBeaufort } from '../../../common/WindArrowBeaufort';

export const TwoDaysForecastContentHourDayPartWrapper = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherTemperatureUnits = useSelector(state => state.weather.temperatureUnits);

  const nightTime = "03:00";
  const morningTime = "09:00";
  const noonTime = "15:00";
  const eveningTime = "21:00";
  const weatherDataHourlyFilteredDayParts = weatherData.hourly.filter(hour => (
       formatLocalTime(hour.dt, weatherData.timezone_offset) === nightTime
    || formatLocalTime(hour.dt, weatherData.timezone_offset) === morningTime
    || formatLocalTime(hour.dt, weatherData.timezone_offset) === noonTime
    || formatLocalTime(hour.dt, weatherData.timezone_offset) === eveningTime
  ));
  const weatherDataHourlyFiltered4DayParts = weatherDataHourlyFilteredDayParts.slice(0, 4);
  const weatherDataHourly = weatherDataHourlyFiltered4DayParts;

  return (
    <div className="two-days-forecast-content-hour-day-part-wrapper" style={{gridTemplateColumns: `auto repeat(${weatherDataHourly.length}, minmax(120px, 1fr))`}}>
      <div className="clouds-title" style={{gridColumn: '1 / 2', gridRow:'7 / 8'}}>Cloudiness</div>
      <div className="humidity-title" style={{gridColumn: '1 / 2', gridRow:'8 / 9'}}>Humidity</div>
      <div className="rain-title" style={{gridColumn: '1 / 2', gridRow:'9 / 10'}}>Rain chance</div>
      {
        weatherDataHourly.map((hour, id) => (
          <React.Fragment key={id}>
            <div className={`time-day-part time-day-part-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'1 / 2'}}>
              {
                  formatLocalTime(hour.dt, weatherData.timezone_offset) === nightTime 
                ? 'Night'
                : formatLocalTime(hour.dt, weatherData.timezone_offset) === morningTime 
                ? 'Morning'
                : formatLocalTime(hour.dt, weatherData.timezone_offset) === noonTime 
                ? 'Noon'
                : formatLocalTime(hour.dt, weatherData.timezone_offset) === eveningTime 
                ? 'Evening'
                : null
              }
            </div>
            <div className={`weekday weekday-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'2 / 3'}}>{formatLocalDateTimestampWeekday(hour.dt, weatherData.timezone_offset).slice(0, 3)}</div>
            <div className={`weather-icon weather-icon-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'3 / 4'}}>
              <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="weather-icon"></img>
            </div>
            <div className={`weather-description weather-description-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'4 / 5'}}>{hour.weather[0].description}</div>
            <div className={`temp temp-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'5 / 6'}}>{convertTemperatureUnits(weatherTemperatureUnits, hour.temp)}</div>
            <div className={`wind wind-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'6 / 7'}}>
              <WindArrowBeaufort
                windDegrees={hour.wind_deg}
                windSpeedBeaufort={convertWindSpeedToBeaufort(hour.wind_speed)}
              />
            </div>
            <div className={`clouds clouds-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'7 / 8'}}>{hour.clouds}%</div>
            <div className={`humidity humidity-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'8 / 9'}}>{hour.humidity}%</div>
            <div className={`rain rain-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'9 / 10'}}>{Math.round((hour.pop*100))}%</div>
          </React.Fragment>
        ))
      }
    </div>
  )
}

import React from 'react';
import { useSelector } from 'react-redux';
import { 
  formatLocalTime,
  convertTemperatureUnits,
  convertWindSpeedToBeaufort,
} from '../../../common/helpers';
import { Link } from 'react-router-dom';
import './/PreviewTwoDaysForecast.scss';
import { WindArrowBeaufort } from '../../../common/WindArrowBeaufort';


export const PreviewTwoDaysForecast = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);
  const weatherTemperatureUnits = useSelector(state => state.weather.temperatureUnits);

  let content;

  if (weatherStatus === 'loading') {
    content = <div className="loading">Loading...</div>
    // content = <div className="loader"></div>
  } else if (weatherStatus === 'succeeded' || weatherData !== null) {
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
    const weatherDayaHourlyFiltered4DayParts = weatherDataHourlyFilteredDayParts.slice(0, 4);
    content = 
    <div className="preview-two-days-forecast-weather-content">
      {
        weatherDayaHourlyFiltered4DayParts.map((hour, id) => (
          <React.Fragment key={id}>
            <div className={`time-day-part time-day-part-${id}`}>
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
            <div className={`weather-icon weather-icon-${id}`}>
              <img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="weather-icon"></img>
            </div>
            <div className={`weather-description weather-description-${id}`}>{hour.weather[0].description}</div>
            <div className={`temp temp-${id}`}>{convertTemperatureUnits(weatherTemperatureUnits, hour.temp)}</div>
            <div className={`clouds clouds-${id}`}>{hour.clouds}%</div>
            <div className={`humidity humidity-${id}`}>{hour.humidity}%</div>
            <div className={`rain rain-${id}`}>{hour.pop*100}%</div>
            <div className={`wind wind-${id}`}>
              <WindArrowBeaufort
                windDegrees={weatherData.current.wind_deg}
                windSpeedBeaufort={convertWindSpeedToBeaufort(weatherData.current.wind_speed)}
              />
            </div>
          </React.Fragment>
        ))
      }
      <div className="clouds-title">Cloudiness</div>
      <div className="humidity-title">Humidity</div>
      <div className="rain-title">Rain chance</div>
      <div className="display-more">
        <Link to="/two-days-forecast-weather">
            Show details<i className="fas fa-arrow-right show-details-arrow"></i>
        </Link>
      </div>
    </div>
  } else if (weatherStatus === 'failed') {
    content = <div>{weatherError}</div>
  }

  return (
    <section className="preview-two-days-forecast-weather">
      {content}
    </section>
  )
}

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { 
  convertTemperatureUnits, 
  formatLocalDateNow, 
  formatLocalTime,
  secondsToGmtHoursAndMinutes,
  convertWindSpeedToBeaufort, 
  rotateWindArrowBeaufort
} from '../../../common/helpers';
import { Link } from 'react-router-dom';
import { WrongLocationTooltip } from './WrongLocationTooltip';
import './PreviewCurrentWeather.scss';

export const PreviewCurrentWeather = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);
  const weatherCity = useSelector(state => state.weather.city);
  const weatherCountry = useSelector(state => state.weather.country);
  const weatherTemperatureUnits = useSelector(state => state.weather.temperatureUnits);

  const [showWrongLocationTooltip, setShowWrongLocationTooltip] = useState(false);

  const ToggleWrongLocationTooltip = () => {
    setShowWrongLocationTooltip(!showWrongLocationTooltip);
  }

  let content;

  if (weatherStatus === 'loading') {
    content = <div className="loading">Loading...</div>
    // content = <div className="loader"></div>
  } else if (weatherStatus === 'succeeded' || weatherData !== null) {
    content = 
    <div className="preview-current-weather-content">
      <WrongLocationTooltip 
        showWrongLocationTooltip={showWrongLocationTooltip}
        ToggleWrongLocationTooltip={ToggleWrongLocationTooltip}
      />

      <div className="weather-icon">
        <img src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`} alt="weather-icon"></img>
      </div>
      <div className="weather-description">{weatherData.current.weather[0].description}</div>
      <div className="temp-temp-feels-like-wrapper">
        <div className="temp">{convertTemperatureUnits(weatherTemperatureUnits, weatherData.current.temp)}</div>
        <div className="temp-feels-like">Feels like: {convertTemperatureUnits(weatherTemperatureUnits, weatherData.current.feels_like)}</div>
      </div>
      <div className="location-date-time-wrapper">
        <div className="location">
          <div className="location-text">{weatherCity}, {weatherCountry}
            <div className="wrong-location-text" onClick={() => {
              ToggleWrongLocationTooltip();
            }}>
              <i className="fas fa-info-circle info-icon"></i>
            </div>
          </div>
        </div>  
        <div className="date">{formatLocalDateNow(weatherData.current.dt, weatherData.timezone_offset)}</div>
        <div className="time-gmt">{formatLocalTime(weatherData.current.dt, weatherData.timezone_offset)} ({secondsToGmtHoursAndMinutes(weatherData.timezone_offset)})</div>
      </div>
      <div className="wind-cloudiness-humidity-wrapper">
        <div className="wind-direction-beaufort-title">Wind</div>
        <div className="cloudiness-title">Cloudiness</div>
        <div className="humidity-title">Humidity</div>
        <div className="wind-direction-beaufort-value">
          {rotateWindArrowBeaufort(weatherData.current.wind_deg, convertWindSpeedToBeaufort(weatherData.current.wind_speed))}
        </div>
        <div className="cloudiness-value">{weatherData.current.clouds} %</div>
        <div className="humidity-value">{weatherData.current.humidity} %</div>
      </div>
      <div className="display-more">
        <Link to="/current-weather">
          Show details -->
        </Link>
      </div>
    </div>
  } else if (weatherStatus === 'failed') {
    content = <div>{weatherError}</div>
  }

  return (
    <section className="preview-current-weather">
      {content}
    </section>
  )
}

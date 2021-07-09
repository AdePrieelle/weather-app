import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { 
  convertTemperatureUnits, 
  formatLocalDateNow, 
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
      <div className="location">
        <div className="location-text">{weatherCity}, {weatherCountry}</div>
        <div className="wrong-location-text" onClick={() => {
          ToggleWrongLocationTooltip();
        }}>
          <i className="fas fa-info-circle info-icon"></i>
        </div>
      </div>  
      <div className="time-gmt-difference-wrapper">
        <div className="time">{formatLocalDateNow(weatherData.current.dt, weatherData.timezone_offset)}</div>
        <div className="gmt-difference">({secondsToGmtHoursAndMinutes(weatherData.timezone_offset)})</div>
      </div>
      <div className="temp">{convertTemperatureUnits(weatherTemperatureUnits, weatherData.current.temp)}</div>
      <div className="weather-icon">
        <img src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`} alt="weather-icon"></img>
      </div>
      <div className="weather-description">{weatherData.current.weather[0].description}</div>
      <div className="temp-feels-like">Feels like: {convertTemperatureUnits(weatherTemperatureUnits, weatherData.current.feels_like)}</div>
      <div className="humidity">Humidity: {weatherData.current.humidity}%</div>
      <div className="cloudiness">Cloudiness: {weatherData.current.clouds}%</div>
      <div className="wind-direction-beaufort">{rotateWindArrowBeaufort(weatherData.current.wind_deg, convertWindSpeedToBeaufort(weatherData.current.wind_speed))}</div>
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

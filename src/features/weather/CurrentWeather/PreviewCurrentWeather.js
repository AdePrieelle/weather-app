import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { 
  convertTemperatureUnits, 
  formatLocalDateNow, 
  formatLocalTime,
  secondsToGmtHoursAndMinutes,
  convertWindSpeedToBeaufort, 
} from '../../../common/helpers';
import { WindArrowBeaufort } from '../../../common/WindArrowBeaufort';
import { Link } from 'react-router-dom';
import { WrongLocationTooltip } from './WrongLocationTooltip';
import './PreviewCurrentWeather.scss';
import { CssPreLoader } from '../../../common/CssPreLoader';

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
    // content = <div className="loading">Loading...</div>
    // content = <div className="css-pre-loader"><div></div></div>
    content = <CssPreLoader />
  } else if (weatherStatus === 'succeeded' || weatherData !== null) {
    content = 
    <div className="preview-current-weather-content">
        <WrongLocationTooltip 
          showWrongLocationTooltip={showWrongLocationTooltip}
          ToggleWrongLocationTooltip={ToggleWrongLocationTooltip}
        />
        <div className="preview-current-weather-weather-temp-location-wrapper">
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
        </div>
        <div className="wind-cloudiness-humidity-wrapper">
          <div className="title title-wind">Wind</div>
          <div className="value value-wind">
            <WindArrowBeaufort
              windDegrees={weatherData.current.wind_deg}
              windSpeedBeaufort={convertWindSpeedToBeaufort(weatherData.current.wind_speed)}
            />
          </div>
          <div className="title title-cloudiness">Cloudiness</div>
          <div className="value value-cloudiness">{weatherData.current.clouds}%</div>
          <div className="title title-humidity">Humidity</div>
          <div className="value value-humidity">{weatherData.current.humidity}%</div>
          {/* <div className="card-effect card-effect-1"></div> */}
          {/* <div className="card-effect card-effect-2"></div> */}
        </div>
      <div className="display-more">
        <Link to="/current-weather">
          Show details <i className="fas fa-arrow-right show-details-arrow"></i>
        </Link>
      </div>
    </div>
  } else if (weatherStatus === 'failed') {
    content = <div>{weatherError}</div>
  }

  return (
    <section className="preview-current-weather">
      <h1 className="preview-current-weather-title">Current weather</h1>
      {content}
    </section>
  )
}

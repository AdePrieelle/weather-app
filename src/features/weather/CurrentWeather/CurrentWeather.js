import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { 
  convertTemperatureUnits, 
  formatLocalDateNow, 
  formatLocalTime, 
  secondsToGmtHoursAndMinutes,
  convertWindSpeedToBeaufort, 
  convertWindDegrees, 
  rotateWindArrow,
  rotateWindArrowBeaufort
} from '../../../common/helpers';
import { Link } from 'react-router-dom';
import './CurrentWeather.scss';

export const CurrentWeather = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);
  const weatherCity = useSelector(state => state.weather.city);
  const weatherCountry = useSelector(state => state.weather.country);
  const weatherTemperatureUnits = useSelector(state => state.weather.temperatureUnits);
  const weatherLatitude = useSelector(state => state.weather.latitude);
  const weatherLongitude = useSelector(state => state.weather.longitude);

  const [showWrongLocationTooltip, setShowWrongLocationTooltip] = useState(false);

  const displayWrongLocationTooltip = () => {
    setShowWrongLocationTooltip(true);
  }

  const hideWrongLocationTooltip = () => {
    setShowWrongLocationTooltip(false);
  }

  let content

  if (weatherStatus === 'loading') {
    content = <div className="loading">Loading...</div>
    // content = <div className="loader"></div>
  } else if (weatherStatus === 'succeeded' || weatherData !== null) {
    content = 
    <div className="current-weather-content">
      <div className={
          showWrongLocationTooltip 
        ? "wrong-location-tooltip wrong-location-tooltip-active"
        : "wrong-location-tooltip"
      }>
        <div className="wrong-location-tooltip-content">
          <div>Hint: if you can't find your city try to add the countrycode (and statecode) in the ISO3166 format.</div> 
          <div>Format: <code>city, countrycode</code> or <code>city, statecode, countrycode</code></div>
          <div>Example: <code>London,uk</code> or <code>London,GB-LND,uk</code></div>
          <div className="close-button-wrapper">
            <button className="wrong-location-tooltip-close" onClick={() => {hideWrongLocationTooltip()}}>Got it!</button>
          </div>
        </div>
      </div>
      {/* {showWrongLocationTooltip === true
      ? <div className="wrong-location-tooltip">
          <div>Hint: if you can't find your city try to add the countrycode (and statecode) in the ISO3166 format.</div> 
          <div>Format: <code>city, countrycode</code> or <code>city, statecode, countrycode</code></div>
          <div>Example: <code>London,uk</code> or <code>London,GB-LND,uk</code></div>
          <button className="wrong-location-tooltip-close" onClick={() => {hideWrongLocationTooltip()}}>X</button>
        </div>
      : null
      } */}
      <div className="go-back">
        <Link to="/">
          {`<< Go back`}
        </Link>
      </div>
      <div>Temperature: {convertTemperatureUnits(weatherTemperatureUnits, weatherData.current.temp)}</div>
      <div>City and country: {weatherCity}, {weatherCountry} <span className="wrong-location-text" onClick={() => {
        displayWrongLocationTooltip();
      }}>Wrong location?</span></div>  
      <div>Time: {formatLocalDateNow(weatherData.current.dt, weatherData.timezone_offset)}</div>
      <div>GMT difference: ({secondsToGmtHoursAndMinutes(weatherData.timezone_offset)})</div>
      <div>
        weather icon: 
        <img src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`} alt="weather-icon"></img>
      </div>
      <div>Weather description: {weatherData.current.weather[0].description}</div>
      <div>Feels like: {convertTemperatureUnits(weatherTemperatureUnits, weatherData.current.feels_like)}</div>
      <div>Latitude: {weatherLatitude}</div>
      <div>Longitude: {weatherLongitude}</div>
      <div>Pressure: {weatherData.current.pressure} hPa</div>
      <div>Humidity: {weatherData.current.humidity}%</div>
      <div>Dew point: {convertTemperatureUnits(weatherTemperatureUnits, weatherData.current.dew_point)}</div>
      <div>Cloudiness: {weatherData.current.clouds}%</div>
      <div>Uv index: {weatherData.current.uvi}</div>
      <div>Visibility: {weatherData.current.visibility} metres</div>
      <div>Windspeed: {weatherData.current.wind_speed} metre/sec</div>
      <div>Windspeed Beaufort: {convertWindSpeedToBeaufort(weatherData.current.wind_speed)}</div>
      <div>Wind degrees: {weatherData.current.wind_deg}</div>
      <div>Wind degrees direction origin: {convertWindDegrees(weatherData.current.wind_deg)}</div>
      <div>Wind degrees arrow pointer: {rotateWindArrow(weatherData.current.wind_deg)}</div>
      <div>Wind degrees arrow pointer Beaufort: {rotateWindArrowBeaufort(weatherData.current.wind_deg, convertWindSpeedToBeaufort(weatherData.current.wind_speed))}</div>
      <div>Sunrise: {formatLocalTime(weatherData.current.sunrise, weatherData.timezone_offset)}</div>
      <div>Sunset: {formatLocalTime(weatherData.current.sunset, weatherData.timezone_offset)}</div>
    </div>
  } else if (weatherStatus === 'failed') {
    content = <div>{weatherError}</div>
  }

  return (
    <section className="current-weather">
      {content}
    </section>
  )
}

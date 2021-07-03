import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { 
  convertTemperatureUnits, 
  formatLocalDateNow, 
  secondsToGmtHoursAndMinutes,
  convertWindSpeedToBeaufort, 
  rotateWindArrowBeaufort
} from '../../common/helpers'
import { Link } from 'react-router-dom';
import '../../styles/PreviewCurrentWeather.scss';

export const PreviewCurrentWeather = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);
  const weatherCity = useSelector(state => state.weather.city);
  const weatherCountry = useSelector(state => state.weather.country);
  const weatherTemperatureUnits = useSelector(state => state.weather.temperatureUnits);

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
    <div className="preview-current-weather-content">
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
      <div>Humidity: {weatherData.current.humidity}%</div>
      <div>Cloudiness: {weatherData.current.clouds}%</div>
      <div>Wind degrees arrow pointer Beaufort: {rotateWindArrowBeaufort(weatherData.current.wind_deg, convertWindSpeedToBeaufort(weatherData.current.wind_speed))}</div>
      <div className="display-more">
        <Link to="/current-weather">
          Show details
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

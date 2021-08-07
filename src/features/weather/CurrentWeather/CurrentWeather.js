import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import { 
  convertTemperatureUnits, 
  formatLocalDateNow, 
  formatLocalTime, 
  secondsToGmtHoursAndMinutes,
} from '../../../common/helpers';
import { WrongLocationTooltip } from './WrongLocationTooltip';
import './CurrentWeather.scss';
import { CssPreLoader } from '../../../common/CssPreLoader';
import { CurrentWeatherPropertiesDetailed } from './CurrentWeatherPropertiesDetailed';
import { CurrentWeatherProperties } from './CurrentWeatherProperties';

export const CurrentWeather = () => {
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
    content = <CssPreLoader />
  } else if (weatherStatus === 'succeeded' || weatherData !== null) {
    content = 
    <div className="current-weather-content">
      <WrongLocationTooltip 
        showWrongLocationTooltip={showWrongLocationTooltip}
        ToggleWrongLocationTooltip={ToggleWrongLocationTooltip}
      />
      <div className="current-weather-info">
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
      <Switch>
        <Route exact path="/">
          <CurrentWeatherProperties />
        </Route>
        <Route exact path="/current-weather">
          <CurrentWeatherPropertiesDetailed />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/">
          <div className="display-more">
            <Link to="/current-weather">
              Show details <i className="fas fa-arrow-right show-details-arrow"></i>
            </Link>
          </div>
        </Route>
        <Route exact path="/current-weather">
          <div className="go-back">
            <Link to="/">
              <i className="fas fa-arrow-left go-back-arrow"></i> Go back
            </Link>
          </div>
        </Route>
      </Switch>
    </div>
  } else if (weatherStatus === 'failed') {
    content = <div>{weatherError}</div>
  }

  return (
    <section className="current-weather">
      <h1 className="current-weather-title">Current weather</h1>
      {content}
    </section>
  )
}


      // <div>Temperature: {convertTemperatureUnits(weatherTemperatureUnits, weatherData.current.temp)}</div>
      // <div>City and country: {weatherCity}, {weatherCountry} <span className="wrong-location-text" onClick={() => {
      //   displayWrongLocationTooltip();
      // }}>Wrong location?</span></div>  
      // <div>Time: {formatLocalDateNow(weatherData.current.dt, weatherData.timezone_offset)}</div>
      // <div>GMT difference: ({secondsToGmtHoursAndMinutes(weatherData.timezone_offset)})</div>
      // <div>
      //   weather icon: 
      //   <img src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`} alt="weather-icon"></img>
      // </div>
      // <div>Weather description: {weatherData.current.weather[0].description}</div>
      // <div>Feels like: {convertTemperatureUnits(weatherTemperatureUnits, weatherData.current.feels_like)}</div>
      // <div>Latitude: {weatherLatitude}</div>
      // <div>Longitude: {weatherLongitude}</div>
      // <div>Pressure: {weatherData.current.pressure} hPa</div>
      // <div>Humidity: {weatherData.current.humidity}%</div>
      // <div>Dew point: {convertTemperatureUnits(weatherTemperatureUnits, weatherData.current.dew_point)}</div>
      // <div>Cloudiness: {weatherData.current.clouds}%</div>
      // <div>Uv index: {weatherData.current.uvi}</div>
      // <div>Visibility: {weatherData.current.visibility} metres</div>
      // <div>Windspeed: {weatherData.current.wind_speed} metre/sec</div>
      // <div>Windspeed Beaufort: {convertWindSpeedToBeaufort(weatherData.current.wind_speed)}</div>
      // <div>Wind degrees: {weatherData.current.wind_deg}</div>
      // <div>Wind degrees direction origin: {convertWindDegrees(weatherData.current.wind_deg)}</div>
      // <div>Wind degrees arrow pointer: {rotateWindArrow(weatherData.current.wind_deg)}</div>
      // <div>Wind degrees arrow pointer Beaufort: {rotateWindArrowBeaufort(weatherData.current.wind_deg, convertWindSpeedToBeaufort(weatherData.current.wind_speed))}</div>
      // <div>Sunrise: {formatLocalTime(weatherData.current.sunrise, weatherData.timezone_offset)}</div>
      // <div>Sunset: {formatLocalTime(weatherData.current.sunset, weatherData.timezone_offset)}</div>
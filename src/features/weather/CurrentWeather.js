import React from 'react'
import { useSelector } from 'react-redux'
import { 
  convertTemperatureUnits, 
  formatLocalDate, 
  formatLocalTime, 
  secondsToGmtHoursAndMinutes,
  convertWindSpeed, 
  convertWindDegrees, 
  rotateWindArrow 
} from '../../common/helpers'

const CurrentWeather = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);
  const weatherCity = useSelector(state => state.weather.city);
  const weatherCountry = useSelector(state => state.weather.country);
  const weatherTemperatureUnits = useSelector(state => state.weather.temperatureUnits);

  let content

  if (weatherStatus === 'loading') {
    content = <div className="loading">Loading...</div>
    // content = <div className="loader"></div>
  } else if (weatherStatus === 'succeeded' || (weatherStatus === "failed" && weatherData !== null)) {
    content = 
    <div className="current-weather-content">
      {/* <div>Temperature in {weatherCity} in celcius: <ConvertTemperature kelvin={weatherData.current.temp} /></div> */}
      <div>Temperature in {weatherCity}, {weatherCountry} in celcius: {convertTemperatureUnits(weatherTemperatureUnits, weatherData.current.temp)}</div>

      <div>current time: {formatLocalDate(weatherData.timezone_offset)}</div>
      <div>GMT difference: ({secondsToGmtHoursAndMinutes(weatherData.timezone_offset)})</div>
      <div>
        weather icon: 
        <img src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`} alt="weather-icon"></img>
      </div>
      <div>Weather description: {weatherData.current.weather[0].description}</div>
      <div>Feels like: {convertTemperatureUnits(weatherTemperatureUnits, weatherData.current.feels_like)}</div>
      <div>Pressure: {weatherData.current.pressure} hPa</div>
      <div>Humidity: {weatherData.current.humidity}%</div>
      <div>Dew point: {convertTemperatureUnits(weatherTemperatureUnits, weatherData.current.dew_point)}</div>
      <div>Clouds: {weatherData.current.clouds}%</div>
      <div>Uv index: {weatherData.current.uvi}</div>
      <div>Visibility: {weatherData.current.visibility} metres</div>
      <div>Windspeed: {weatherData.current.wind_speed} metre/sec</div>
      <div>Windspeed Beaufort: {convertWindSpeed(weatherData.current.wind_speed)}</div>
      <div>Wind degrees: {weatherData.current.wind_deg}</div>
      <div>Wind degrees direction origin: {convertWindDegrees(weatherData.current.wind_deg)}</div>
      <div>Wind degrees arrow pointer: {rotateWindArrow(weatherData.current.wind_deg)}</div>
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

export default CurrentWeather;

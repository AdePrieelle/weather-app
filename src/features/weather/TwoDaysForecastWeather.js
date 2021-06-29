import { useSelector } from 'react-redux'
import { 
  formatLocalTime,
  convertTemperatureUnits,
  convertWindSpeedToBeaufort,
  rotateWindArrow
} from '../../common/helpers'
import '../../styles/TwoDaysForecastWeather.scss';

export const TwoDaysForecastWeather = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);
  const weatherTemperatureUnits = useSelector(state => state.weather.temperatureUnits);

  let content

  if (weatherStatus === 'loading') {
    content = <div className="loading">Loading...</div>
    // content = <div className="loader"></div>
  } else if (weatherStatus === 'succeeded' || weatherData !== null) {
    content = 
    <div className="two-days-forecast-weather-content">
      {
        weatherData.hourly.map((hour, id) => (
          <div key={id} className="two-days-forecast-weather-content-hour">
            <div className="time">{formatLocalTime(hour.dt, weatherData.timezone_offset)}</div>
            <div className="temp">{convertTemperatureUnits(weatherTemperatureUnits, hour.temp)}</div>
            <div className="clouds">Cloudiness: {hour.clouds}%</div>
            <div className="humidity">humidity: {hour.humidity}%</div>
            <div className="probability-precipitation">Probability of precipitation: {hour.pop}</div>
            <div className="wind-speed-beaufort">Windspeed Beaufort: {convertWindSpeedToBeaufort(hour.wind_speed)}</div>
            <div className="wind-degrees-pointer">Wind degrees arrow pointer: {rotateWindArrow(hour.wind_deg)}</div>
            <div className="weather-description">Weather description: {hour.weather[0].description}</div>
            <div className="weather-icon">
              Weather icon: 
              <img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="weather-icon"></img>
            </div>
          </div>
        ))
      }
    </div>
  } else if (weatherStatus === 'failed') {
    content = <div>{weatherError}</div>
  }

  return (
    <section className="two-days-forecast-weather">
      {content}
    </section>
  )
}

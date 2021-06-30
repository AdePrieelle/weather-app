import { useSelector } from 'react-redux';
import { 
  convertTemperatureUnits,
  convertWindSpeedToBeaufort,
  rotateWindArrow,
  formatLocalDateDay
} from '../../common/helpers';
import '../../styles/WeekForecastWeather.scss';

export const WeekForecastWeather = () => {
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
    <div className="week-forecast-weather-content">
      {
        weatherData.daily.map((day, id) => (
          <div key={id} className="week-forecast-weather-content-day">
            <div className="time-weekday">Weekday: {formatLocalDateDay(day.dt, weatherData.timezone_offset).weekday}</div>
            <div className="time-day-month">Date: {formatLocalDateDay(day.dt, weatherData.timezone_offset).day} {formatLocalDateDay(day.dt, weatherData.timezone_offset).month}</div>
            <div className="tempMin">Temp min: {convertTemperatureUnits(weatherTemperatureUnits, day.temp.min)}</div>
            <div className="tempMax">Temp max: {convertTemperatureUnits(weatherTemperatureUnits, day.temp.max)}</div>
            <div className="clouds">Cloudiness: {day.clouds}%</div>
            <div className="humidity">Humidity: {day.humidity}%</div>
            <div className="probability-precipitation">Probability of precipitation: {day.pop}</div>
            <div className="wind-speed-beaufort">Windspeed Beaufort: {convertWindSpeedToBeaufort(day.wind_speed)}</div>
            <div className="wind-degrees-pointer">Wind degrees arrow pointer: {rotateWindArrow(day.wind_deg)}</div>
            <div className="weather-description">Weather description: {day.weather[0].description}</div>
            <div className="weather-icon">
              Weather icon: 
              <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="weather-icon"></img>
            </div>
          </div>
        ))
      }
    </div>
  } else if (weatherStatus === 'failed') {
    content = <div>{weatherError}</div>
  }

  return (
    <section className="week-forecast-weather">
      {content}
    </section>
  )
}

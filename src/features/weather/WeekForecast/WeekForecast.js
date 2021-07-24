import { useSelector } from 'react-redux';
import { 
  convertTemperatureUnits,
  convertWindSpeedToBeaufort,
  rotateWindArrowBeaufort,
  formatLocalDateDay
} from '../../../common/helpers';
import { Link } from 'react-router-dom';
import './WeekForecast.scss';

export const WeekForecast = () => {
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
    <div className="week-forecast-content">
      <div className="go-back">
        <Link to="/">
          {`<< Go back`}
        </Link>
      </div>
      {
        weatherData.daily.map((day, id) => (
          <div key={id} className="week-forecast-content-day">
            <div className="time-weekday">Weekday: {formatLocalDateDay(day.dt, weatherData.timezone_offset).weekday}</div>
            <div className="time-day-month">Date: {formatLocalDateDay(day.dt, weatherData.timezone_offset).day} {formatLocalDateDay(day.dt, weatherData.timezone_offset).month}</div>
            <div className="temp-min">Temp min: {convertTemperatureUnits(weatherTemperatureUnits, day.temp.min)}</div>
            <div className="temp-max">Temp max: {convertTemperatureUnits(weatherTemperatureUnits, day.temp.max)}</div>
            <div className="temp-night">Temp night: {convertTemperatureUnits(weatherTemperatureUnits, day.temp.night)}</div>
            <div className="temp-night-feels-like">Temp night feels like: {convertTemperatureUnits(weatherTemperatureUnits, day.feels_like.night)}</div>
            <div className="temp-morning">Temp morning: {convertTemperatureUnits(weatherTemperatureUnits, day.temp.morn)}</div>
            <div className="temp-morning-feels-like">Temp morning feels like: {convertTemperatureUnits(weatherTemperatureUnits, day.feels_like.morn)}</div>
            <div className="temp-noon">Temp noon: {convertTemperatureUnits(weatherTemperatureUnits, day.temp.day)}</div>
            <div className="temp-noon-feels-like">Temp noon feels like: {convertTemperatureUnits(weatherTemperatureUnits, day.feels_like.day)}</div>
            <div className="temp-evening">Temp evening: {convertTemperatureUnits(weatherTemperatureUnits, day.temp.eve)}</div>
            <div className="temp-evening-feels-like">Temp evening feels like: {convertTemperatureUnits(weatherTemperatureUnits, day.feels_like.eve)}</div>
            <div className="clouds">Cloudiness: {day.clouds}%</div>
            <div className="humidity">Humidity: {day.humidity}%</div>
            <div className="probability-precipitation">Probability of precipitation: {day.pop}</div>
            <div className="precipitation-amount">Precipitation amount: {day.rain} mm</div>
            <div className="wind-degrees-pointer-beaufort">Wind degrees arrow pointer Beaufort: {rotateWindArrowBeaufort(day.wind_deg, convertWindSpeedToBeaufort(day.wind_speed))}</div>
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
    <section className="week-forecast">
      {content}
    </section>
  )
}

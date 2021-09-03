import { useSelector } from 'react-redux';
import { 
  convertTemperatureUnits, 
  formatLocalDateNow, 
  formatLocalTime, 
  secondsToGmtHoursAndMinutes,
} from '../../../common/helpers';
import './CurrentWeatherInfo.scss';

export const CurrentWeatherInfo = ({ ToggleWrongLocationTooltip }) => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherCity = useSelector(state => state.weather.city);
  const weatherCountry = useSelector(state => state.weather.country);
  const weatherTemperatureUnits = useSelector(state => state.weather.temperatureUnits);

  return (
    <div className="current-weather-info">
      <div className="weather-icon">
        <img src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`} alt="weather-icon"></img>
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
  )
}

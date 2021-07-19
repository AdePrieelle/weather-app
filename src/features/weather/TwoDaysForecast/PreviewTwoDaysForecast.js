import { useSelector } from 'react-redux';
import { 
  formatLocalTime,
  convertTemperatureUnits,
  convertWindSpeedToBeaufort,
} from '../../../common/helpers';
import { Link } from 'react-router-dom';
import './/PreviewTwoDaysForecast.scss';
import { WindArrowBeaufort } from '../../../common/WindArrowBeaufort';


export const PreviewTwoDaysForecast = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);
  const weatherTemperatureUnits = useSelector(state => state.weather.temperatureUnits);

  let content;

  if (weatherStatus === 'loading') {
    content = <div className="loading">Loading...</div>
    // content = <div className="loader"></div>
  } else if (weatherStatus === 'succeeded' || weatherData !== null) {
    const nightTime = "03:00";
    const morningTime = "09:00";
    const noonTime = "15:00";
    const eveningTime = "21:00";
    const weatherDataHourlyFilteredDayParts = weatherData.hourly.filter(hour => (
         formatLocalTime(hour.dt, weatherData.timezone_offset) === nightTime
      || formatLocalTime(hour.dt, weatherData.timezone_offset) === morningTime
      || formatLocalTime(hour.dt, weatherData.timezone_offset) === noonTime
      || formatLocalTime(hour.dt, weatherData.timezone_offset) === eveningTime
    ));
    const weatherDayaHourlyFiltered4DayParts = weatherDataHourlyFilteredDayParts.slice(0, 4);
    content = 
    <div className="preview-two-days-forecast-weather-content">
      {
        weatherDayaHourlyFiltered4DayParts.map((hour, id) => (
          <div key={id} className="preview-two-days-forecast-weather-content-hour">
            <div className="time">
              {
                  formatLocalTime(hour.dt, weatherData.timezone_offset) === nightTime 
                ? 'Night'
                : formatLocalTime(hour.dt, weatherData.timezone_offset) === morningTime 
                ? 'Morning'
                : formatLocalTime(hour.dt, weatherData.timezone_offset) === noonTime 
                ? 'Noon'
                : formatLocalTime(hour.dt, weatherData.timezone_offset) === eveningTime 
                ? 'Evening'
                : null
              }
            </div>
            <div className="weather-icon">
              <img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="weather-icon"></img>
            </div>
            {/* <div className="weather-description">{hour.weather[0].description}</div> */}
            <div className="temp">{convertTemperatureUnits(weatherTemperatureUnits, hour.temp)}</div>
            {/* <div className="clouds">Cloudiness: {hour.clouds}%</div> */}
            {/* <div className="humidity">Humidity: {hour.humidity}%</div> */}
            {/* <div className="probability-precipitation">Probability of precipitation: {hour.pop}</div> */}
            <div className="wind-degrees-pointer-beaufort-preview-two-days-forecast">
              <WindArrowBeaufort
                windDegrees={weatherData.current.wind_deg}
                windSpeedBeaufort={convertWindSpeedToBeaufort(weatherData.current.wind_speed)}
              />
            </div>
          </div>
        ))
      }
      <div className="display-more">
        <Link to="/two-days-forecast-weather">
          <div className="display-more-text">
            Show details
          </div>
          <i className="fas fa-arrow-right show-details-arrow"></i>
        </Link>
      </div>
    </div>
  } else if (weatherStatus === 'failed') {
    content = <div>{weatherError}</div>
  }

  return (
    <section className="preview-two-days-forecast-weather">
      {content}
    </section>
  )
}

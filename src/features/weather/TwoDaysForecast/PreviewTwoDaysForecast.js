import React from 'react';
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
    const weatherDataHourlyFiltered4DayParts = weatherDataHourlyFilteredDayParts.slice(0, 4);
    const weatherDataHourly = weatherDataHourlyFiltered4DayParts;
    content = 
    <div className="preview-two-days-forecast-weather-content">
      <div className="preview-two-days-forecast-weather-content-hour-wrapper" style={{gridTemplateColumns: `auto repeat(${weatherDataHourly.length}, minmax(100px, 1fr))`}}>
        {
          weatherDataHourly.map((hour, id) => (
            <React.Fragment key={id}>
            {/* // <div key={id} className="preview-two-days-forecast-weather-content-hour"> */}
              <div className="clouds-title" style={{gridColumn: '1 / 2', gridRow:'6 / 7'}}>Cloudiness</div>
              <div className="humidity-title" style={{gridColumn: '1 / 2', gridRow:'7 / 8'}}>Humidity</div>
              <div className="rain-title" style={{gridColumn: '1 / 2', gridRow:'8 / 9'}}>Rain chance</div>
              <div className={`time-day-part time-day-part-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'1 / 2'}}>
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
              <div className={`weather-icon weather-icon-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'2 / 3'}}>
                <img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="weather-icon"></img>
              </div>
              <div className={`weather-description weather-description-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'3 / 4'}}>{hour.weather[0].description}</div>
              <div className={`temp temp-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'4 / 5'}}>{convertTemperatureUnits(weatherTemperatureUnits, hour.temp)}</div>
              <div className={`clouds clouds-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'6 / 7'}}>{hour.clouds}%</div>
              <div className={`humidity humidity-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'7 / 8'}}>{hour.humidity}%</div>
              <div className={`rain rain-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'8 / 9'}}>{Math.round((hour.pop*100))}%</div>
              <div className={`wind wind-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'5 / 6'}}>
                <WindArrowBeaufort
                  windDegrees={weatherData.current.wind_deg}
                  windSpeedBeaufort={convertWindSpeedToBeaufort(weatherData.current.wind_speed)}
                />
              </div>
            {/* </div> */}
            </React.Fragment>
          ))
        }
      </div>
      <div className="display-more">
        <Link to="/two-days-forecast-weather">
            Show details<i className="fas fa-arrow-right show-details-arrow"></i>
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

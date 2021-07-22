import React from 'react';
import { useSelector } from 'react-redux';
import { 
  formatLocalTime,
  formatLocalDateTimestampWeekday,
  convertTemperatureUnits,
  convertWindSpeedToBeaufort,
} from '../../../common/helpers';
import { Link } from 'react-router-dom';
import './TwoDaysForecast.scss';
import { WindArrowBeaufort } from '../../../common/WindArrowBeaufort';


export const TwoDaysForecast = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);
  const weatherTemperatureUnits = useSelector(state => state.weather.temperatureUnits);

  let content;

  if (weatherStatus === 'loading') {
    content = <div className="loading">Loading...</div>
    // content = <div className="loader"></div>
  } else if (weatherStatus === 'succeeded' || weatherData !== null) {
    const weatherDataHourly = weatherData.hourly;
    content = 
    <div className="two-days-forecast-weather-content">
      <div className="two-days-forecast-weather-content-hour-wrapper" style={{gridTemplateColumns: `auto repeat(${weatherDataHourly.length}, minmax(100px, 1fr))`}}>
        <div className="clouds-title" style={{gridColumn: '1 / 2', gridRow:'7 / 8'}}>Cloudiness</div>
        <div className="humidity-title" style={{gridColumn: '1 / 2', gridRow:'8 / 9'}}>Humidity</div>
        <div className="rain-title" style={{gridColumn: '1 / 2', gridRow:'9 / 10'}}>Rain chance</div>
        {
          weatherDataHourly.map((hour, id) => (
            <React.Fragment key={id}>
            {/* // <div key={id} className="preview-two-days-forecast-weather-content-hour"> */}
              <div className={`time-day-part time-day-part-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'1 / 2'}}>
                {formatLocalTime(hour.dt, weatherData.timezone_offset)}
              </div>
              <div className={`weekday weekday-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'2 / 3'}}>{formatLocalDateTimestampWeekday(hour.dt, weatherData.timezone_offset).slice(0, 3)}</div>
              <div className={`weather-icon weather-icon-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'3 / 4'}}>
                <img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="weather-icon"></img>
              </div>
              <div className={`weather-description weather-description-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'4 / 5'}}>{hour.weather[0].description}</div>
              <div className={`temp temp-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'5 / 6'}}>{convertTemperatureUnits(weatherTemperatureUnits, hour.temp)}</div>
              <div className={`wind wind-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'6 / 7'}}>
                <WindArrowBeaufort
                  windDegrees={weatherData.current.wind_deg}
                  windSpeedBeaufort={convertWindSpeedToBeaufort(weatherData.current.wind_speed)}
                />
              </div>
              <div className={`clouds clouds-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'7 / 8'}}>{hour.clouds}%</div>
              <div className={`humidity humidity-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'8 / 9'}}>{hour.humidity}%</div>
              <div className={`rain rain-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'9 / 10'}}>{Math.round((hour.pop*100))}%</div>
            {/* </div> */}
            </React.Fragment>
          ))
        }
      </div>
      <div className="display-more">
        <Link to="/">
            <i className="fas fa-arrow-left show-details-arrow"></i>Go back
        </Link>
      </div>
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

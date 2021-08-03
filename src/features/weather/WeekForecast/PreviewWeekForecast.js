import React from 'react';
import { useSelector } from 'react-redux';
import { 
  convertTemperatureUnits,
  convertWindSpeedToBeaufort,
  formatLocalDateDay
} from '../../../common/helpers';
import { Link } from 'react-router-dom';
import './PreviewWeekForecast.scss';
import { WindArrowBeaufort } from '../../../common/WindArrowBeaufort';
import { CssPreLoader } from '../../../common/CssPreLoader';

export const PreviewWeekForecast = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);
  const weatherTemperatureUnits = useSelector(state => state.weather.temperatureUnits);

  let content

  if (weatherStatus === 'loading') {
    // content = <div className="loading">Loading...</div>
    // content = <div className="loader"></div>
    content = <CssPreLoader />
  } else if (weatherStatus === 'succeeded' || weatherData !== null) {
    content = 
    <div className="preview-week-forecast-content">
      <div className="preview-week-forecast-days-wrapper" style={{gridTemplateColumns: `auto repeat(${weatherData.daily.length}, minmax(120px, 1fr))`}}>
        <div className="clouds-title" style={{gridColumn: '1 / 2', gridRow:'7 / 8'}}>Cloudiness</div>
        <div className="humidity-title" style={{gridColumn: '1 / 2', gridRow:'8 / 9'}}>Humidity</div>
        <div className="rain-title" style={{gridColumn: '1 / 2', gridRow:'9 / 10'}}>Rain chance</div>
        <div className="rain-amount-title" style={{gridColumn: '1 / 2', gridRow:'10 / 11'}}>Rain amount</div>
        {
          weatherData.daily.map((day, id) => (
            <React.Fragment key={id}>
              <div className={`time-weekday time-weekday-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'1 / 2'}}>{formatLocalDateDay(day.dt, weatherData.timezone_offset).weekday}</div>
              <div className={`time-day-month time-day-month-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'2 / 3'}}>{formatLocalDateDay(day.dt, weatherData.timezone_offset).day} {formatLocalDateDay(day.dt, weatherData.timezone_offset).month}</div>
              <div className={`weather-icon weather-icon-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'3 / 4'}}>
                <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="weather-icon"></img>
              </div>
              <div className={`weather-description weather-description-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'4 / 5'}}>{day.weather[0].description}</div>
              <div className={`temp temp-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'5 / 6'}}>
                <span className="temp-min">{convertTemperatureUnits(weatherTemperatureUnits, day.temp.min)}{" / "}</span>
                <span className="temp-max">{convertTemperatureUnits(weatherTemperatureUnits, day.temp.max)}</span>
              </div>
              <div className={`wind wind-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'6 / 7'}}>
                <WindArrowBeaufort
                  windDegrees={weatherData.current.wind_deg}
                  windSpeedBeaufort={convertWindSpeedToBeaufort(weatherData.current.wind_speed)}
                />
              </div>
              <div className={`clouds clouds-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'7 / 8'}}>{day.clouds}%</div>
              <div className={`humidity humidity-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'8 / 9'}}>{day.humidity}%</div>
              <div className={`rain rain-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'9 / 10'}}>{Math.round((day.pop*100))}%</div>
              <div className={`rain-amount rain-amount-${id}`} style={{gridColumn: `${id+2} / ${id+3}`, gridRow:'10 / 11'}}>{day.rain ? `${day.rain.toFixed(1)} mm` : 'unkown'}</div>
            </React.Fragment>
          ))
        }
      </div>
      <div className="display-more">
        <Link to="/week-forecast">
          Show details <i className="fas fa-arrow-right show-details-arrow"></i>
        </Link>
      </div>
    </div>
  } else if (weatherStatus === 'failed') {
    content = <div>{weatherError}</div>
  }

  return (
    <section className="preview-week-forecast">
      <h1 className="preview-week-forecast-title">7-days forecast</h1>
      {content}
    </section>
  )
}

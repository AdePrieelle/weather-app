import React from 'react'
import { useSelector } from 'react-redux'
import { formatLocalTime } from '../../common/helpers';
import '../../styles/MinuteForecastWeather.scss';

const MinuteForecastWeather = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);

  let content

  if (weatherStatus === 'loading') {
    content = <div className="loading">Loading...</div>
    // content = <div className="loader"></div>
  } else if (weatherStatus === 'succeeded' || weatherData !== null) {
    content = 
    <div className="minute-forecast-content">
      <div className="minute-forecast-title">minute forecast</div>
      <div className="minute-forecast-data">
        {weatherData.minutely.map((minute, id) => (
          <div key={id} className="minute-forecast-data-item">
            <div className="minute-forecast-time">{formatLocalTime(minute.dt, weatherData.timezone_offset)}</div>
            <div className="minute-forecast-precipitation">{minute.precipitation}</div>
          </div>
        ))}
      </div>
    </div>
  } else if (weatherStatus === 'failed') {
    content = <div>{weatherError}</div>
  }

  return (
    <section className="minute-forecast-weather">
      {content}
    </section>
  )
}

export default MinuteForecastWeather;

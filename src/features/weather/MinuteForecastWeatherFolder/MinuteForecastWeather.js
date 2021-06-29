import React from 'react'
import { useSelector } from 'react-redux';
import '../../../styles/MinuteForecastWeather.scss';
import { WeatherRainGraphScaleLog } from './WeatherRainGraphScaleLogFolder/WeatherRainGraphScaleLog';

export const MinuteForecastWeather = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);

  let content

  if (weatherStatus === 'loading') {
    content = <div className="loading">Loading...</div>
    // content = <div className="loader"></div>
  } else if (weatherStatus === 'succeeded' || weatherData !== null) {
    content = 
    <div className="minute-forecast-weather-content">
      <div className="minute-forecast-weather-graph">
        <WeatherRainGraphScaleLog />
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

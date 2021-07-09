import React from 'react';
import { useSelector } from 'react-redux';
import './PreviewMinuteForecastWeather.scss';
import { WeatherRainGraphScaleLog } from './WeatherRainGraphScaleLogFolder/WeatherRainGraphScaleLog';
import { Link } from 'react-router-dom';

export const PreviewMinuteForecastWeather = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);

  let content;

  if (weatherStatus === 'loading') {
    content = <div className="loading">Loading...</div>;
    // content = <div className="loader"></div>
  } else if (weatherStatus === 'succeeded' || weatherData !== null) {
    content = 
      <div className="preview-minute-forecast-weather-content">
        <div className="preview-minute-forecast-weather-graph">
          <WeatherRainGraphScaleLog />
          <div className="display-more">
            <Link to="/minute-forecast-weather">
              Show details
            </Link>
          </div>
        </div>
      </div>;
  } else if (weatherStatus === 'failed') {
    content = <div>{weatherError}</div>;
  }

  return (
    <section className="preview-minute-forecast-weather">
      {content}
    </section>
  )
}

import React from 'react';
import { useSelector } from 'react-redux';
import './PreviewRainForecast.scss';
import { RainGraph } from './RainGraph/RainGraph';
import { Link } from 'react-router-dom';
import { CssPreLoader } from '../../../common/CssPreLoader';

export const PreviewRainForecast = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);

  let content;

  if (weatherStatus === 'loading') {
    // content = <div className="loading">Loading...</div>;
    content = <CssPreLoader />
  } else if (weatherStatus === 'succeeded' || weatherData !== null) {
    content = 
      <div className="preview-rain-forecast-content">
        <div className="preview-rain-forecast-rain-graph">
          <RainGraph />
          <div className="display-more">
            <Link to="/rain-forecast">
              Show details <i className="fas fa-arrow-right show-details-arrow"></i>
            </Link>
          </div>
        </div>
      </div>;
  } else if (weatherStatus === 'failed') {
    content = <div>{weatherError}</div>;
  }

  return (
    <section className="preview-rain-forecast">
      <h1 className="preview-rain-forecast-title">Rain forecast</h1>
      {content}
    </section>
  )
}

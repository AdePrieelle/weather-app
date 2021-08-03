import React from 'react';
import { useSelector } from 'react-redux';
import './RainForecast.scss';
import { RainGraph } from './RainGraph/RainGraph';
import { Link } from 'react-router-dom';
import { CssPreLoader } from '../../../common/CssPreLoader';

export const RainForecast = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);

  let content;

  if (weatherStatus === 'loading') {
    // content = <div className="loading">Loading...</div>;
    // content = <div className="loader"></div>
    content = <CssPreLoader />
  } else if (weatherStatus === 'succeeded' || weatherData !== null) {
    content = 
      <div className="rain-forecast-content">
        <div className="rain-forecast-rain-graph">
          <RainGraph />
          <div className="display-more">
            <Link to="/">
              <i className="fas fa-arrow-left show-details-arrow"></i>Go back
            </Link>
          </div>
        </div>
      </div>;
  } else if (weatherStatus === 'failed') {
    content = <div>{weatherError}</div>;
  }

  return (
    <section className="rain-forecast">
      <h1 className="rain-forecast-title">Rain forecast</h1>
      {content}
    </section>
  )
}

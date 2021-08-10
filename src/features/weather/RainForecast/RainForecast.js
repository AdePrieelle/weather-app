import React from 'react';
import { useSelector } from 'react-redux';
import '../../../styles/WeatherNewsCategory.scss';
import './RainForecast.scss';
import { RainGraph } from './RainGraph/RainGraph';
import { CssPreLoader } from '../../../common/CssPreLoader';
import { LinkComponentNavigation } from '../../../common/LinkComponentNavigation';
import { WeatherComponentTitle } from '../../../common/WeatherComponentTitle';

export const RainForecast = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);

  let content;

  if (weatherStatus === 'loading') {
    content = <CssPreLoader />
  } else if (weatherStatus === 'succeeded' || weatherData !== null) {
    content = 
      <div id="rain-forecast-content" className="weather-news-category-content">
        <div className="rain-forecast-rain-graph">
          <RainGraph />
        </div>
        <LinkComponentNavigation
          linkPath={"/rain-forecast"}
        />
      </div>;
  } else if (weatherStatus === 'failed') {
    content = <div>{weatherError}</div>;
  }

  return (
    <section id="rain-forecast" className="weather-news-category">
      <WeatherComponentTitle>
        Rain forecast
      </WeatherComponentTitle>
      {content}
    </section>
  )
}

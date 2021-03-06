import React from 'react';
import { useSelector } from 'react-redux';
import '../../../styles/WeatherNewsCategory.scss';
import './RainForecast.scss';
import { RainGraph } from './RainGraph/RainGraph';
import { CssPreLoader } from '../../../common/CssPreLoader';
import { LinkComponentNavigation } from '../../../common/LinkComponentNavigation';
import { WeatherComponentTitle } from '../../../common/WeatherComponentTitle';

export const RainForecast = () => {
  const weatherCity = useSelector(state => state.weather.city);
  const weatherCountry = useSelector(state => state.weather.country);
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);

  let content;

  if (weatherStatus === 'loading') {
    content = <CssPreLoader />
  } else if ((weatherStatus === 'succeeded' || weatherData !== null) && weatherData.minutely) {
    content = 
      <div id="rain-forecast-content" className="weather-news-category-content">
        <div className="rain-forecast-rain-graph">
          <RainGraph />
        </div>
        <LinkComponentNavigation
          linkPath={"/rain-forecast"}
        />
      </div>;
  } else if ((weatherStatus === 'succeeded' || weatherData !== null) && !weatherData.minutely) {
    content = 
      <div className="weather-news-category-content">
        <div>No rain forecast data available for {`${weatherCity}, ${weatherCountry}.`}</div>
      </div>;
  }
  
  else if (weatherStatus === 'failed') {
    content =
      <div className="weather-news-category-content">
        <div>{weatherError}</div>
      </div>;
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

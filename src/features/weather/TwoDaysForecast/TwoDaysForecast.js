import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import '../../../styles/WeatherNewsCategory.scss';
import './TwoDaysForecast.scss';
import { CssPreLoader } from '../../../common/CssPreLoader';
import { LinkComponentNavigation } from '../../../common/LinkComponentNavigation';
import { WeatherComponentTitle } from '../../../common/WeatherComponentTitle';
import { TwoDaysForecastContentHourWrapper } from './TwoDaysForecastContentHourWrapper';
import { TwoDaysForecastContentHourDayPartWrapper } from './TwoDaysForecastContentHourDayPartWrapper';

export const TwoDaysForecast = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);

  let content;

  if (weatherStatus === 'loading') {
    content = <CssPreLoader />
  } else if (weatherStatus === 'succeeded' || weatherData !== null) {
    content = 
      <div id="two-days-forecast-content" className="weather-news-category-content">
        <Switch>
          <Route exact path="/">
            <TwoDaysForecastContentHourDayPartWrapper />
          </Route>
          <Route exact path="/two-days-forecast">
            <TwoDaysForecastContentHourWrapper />
          </Route>
        </Switch>
        <LinkComponentNavigation
          linkPath={"/two-days-forecast"}
        />
      </div>
  } else if (weatherStatus === 'failed') {
    content = <div>{weatherError}</div>
  }

  return (
    <section id="two-days-forecast" className="weather-news-category">
      <WeatherComponentTitle>
        48-hours forecast
      </WeatherComponentTitle>
      {content}
    </section>
  )
}

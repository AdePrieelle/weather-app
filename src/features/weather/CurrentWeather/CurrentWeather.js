import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { WrongLocationTooltip } from './WrongLocationTooltip';
import '../../../styles/WeatherNewsCategory.scss';
import './CurrentWeather.scss';
import { CssPreLoader } from '../../../common/CssPreLoader';
import { CurrentWeatherInfo } from './CurrentWeatherInfo';
import { CurrentWeatherPropertiesDetailed } from './CurrentWeatherPropertiesDetailed';
import { CurrentWeatherProperties } from './CurrentWeatherProperties';
import { LinkComponentNavigation } from '../../../common/LinkComponentNavigation';
import { WeatherComponentTitle } from '../../../common/WeatherComponentTitle';

export const CurrentWeather = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);

  const [showWrongLocationTooltip, setShowWrongLocationTooltip] = useState(false);

  const ToggleWrongLocationTooltip = () => {
    setShowWrongLocationTooltip(!showWrongLocationTooltip);
  }

  let content;

  if (weatherStatus === 'loading') {
    content = <CssPreLoader />
  } else if (weatherStatus === 'succeeded' || weatherData !== null) {
    content = 
      <div id="current-weather-content" className="weather-news-category-content">
        {/* Tooltip with info to search for same named locations in different states or countries more effectively */}
        <WrongLocationTooltip 
          showWrongLocationTooltip={showWrongLocationTooltip}
          ToggleWrongLocationTooltip={ToggleWrongLocationTooltip}
        />
        <CurrentWeatherInfo 
          ToggleWrongLocationTooltip={ToggleWrongLocationTooltip}
        />
        <Switch>
          <Route exact path="/">
            <CurrentWeatherProperties />
          </Route>
          <Route exact path="/current-weather">
            <CurrentWeatherPropertiesDetailed />
          </Route>
        </Switch>
        <LinkComponentNavigation
          linkPath={"/current-weather"}
        />
      </div>;
  } else if (weatherStatus === 'failed') {
    content = <div>{weatherError}</div>
  }

  return (
    <section id="current-weather" className="weather-news-category">
      <WeatherComponentTitle>
        Current weather
      </WeatherComponentTitle>
      {content}
    </section>
  )
}

import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import '../../../styles/WeatherNewsCategory.scss';
import './Alerts.scss';
import { LinkComponentNavigation } from '../../../common/LinkComponentNavigation';
import { WeatherComponentTitle } from '../../../common/WeatherComponentTitle';
import { AlertMessageShort } from './AlertMessageShort';
import { AlertMessageDetailed } from './AlertMessageDetailed';

export const Alerts = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);

  let content;

  if (weatherStatus === 'loading') {
    content = null;
  } else if (weatherStatus === 'succeeded' || weatherData !== null) {
    content = 
      weatherData.alerts 
    ? <section id="alerts" className="weather-news-category">
        <WeatherComponentTitle>
          Alerts
        </WeatherComponentTitle>
        <div id="alerts-content" className="weather-news-category-content">
          <Switch>
            <Route exact path="/">
              <AlertMessageShort />
            </Route>
            <Route exact path="/alerts">
              <AlertMessageDetailed />
            </Route>
          </Switch>
        </div>
        <LinkComponentNavigation
          linkPath={"/alerts"}
        />
      </section>
    : null
  } else if (weatherStatus === 'failed') {
    content = 
      <section id="alerts" className="weather-news-category">
        <WeatherComponentTitle>
          Alerts
        </WeatherComponentTitle>
        <div id="alerts-content" className="weather-news-category-content">
          <div>{weatherError}</div>
        </div>
      </section>;
  }

  return (
    <>
      {content}
    </>
  )
}

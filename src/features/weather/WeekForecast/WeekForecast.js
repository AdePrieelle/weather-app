import { useSelector } from 'react-redux';
import '../../../styles/WeatherNewsCategory.scss';
import './WeekForecast.scss';
import { CssPreLoader } from '../../../common/CssPreLoader';
import { LinkComponentNavigation } from '../../../common/LinkComponentNavigation';
import { WeatherComponentTitle } from '../../../common/WeatherComponentTitle';
import { WeekForecastContentDaysWrapper } from './WeekForecastContentDaysWrapper';

export const WeekForecast = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);

  let content;

  if (weatherStatus === 'loading') {
    content = <CssPreLoader />
  } else if (weatherStatus === 'succeeded' || weatherData !== null) {
    content = 
    <div id="week-forecast-content" className="weather-news-category-content">
      <WeekForecastContentDaysWrapper />
      <LinkComponentNavigation
        linkPath={"/week-forecast"}
      />
    </div>
  } else if (weatherStatus === 'failed') {
    content = <div>{weatherError}</div>
  }

  return (
    <section id="week-forecast" className="weather-news-category">
      <WeatherComponentTitle>
        7-days forecast
      </WeatherComponentTitle>
      {content}
    </section>
  )
}

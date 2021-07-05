import { useSelector } from 'react-redux';
import { 
  formatLocalDateTimestamp
} from '../../common/helpers';
import { Link } from 'react-router-dom';
import '../../styles/PreviewAlertsWeather.scss';

export const PreviewAlertsWeather = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);

  let content;

  if (weatherStatus === 'loading') {
    content = 
      <section className="preview-alerts-weather">
        <div className="loading">Loading...</div>
      </section>;
    // content = <div className="loader"></div>
  } else if (weatherStatus === 'succeeded' || weatherData !== null) {

    content = 
    weatherData.alerts 
    ? <section className="preview-alerts-weather">
        <div className="preview-alerts-weather-content">
          {
            weatherData.alerts.map((alert, id) => (
              <div key={id} className="alert">
                <div className="alert-sender-name">Sender name: {alert.sender_name ? alert.sender_name : 'unkown'}</div>
                <div className="alert-event">Event: {alert.event ? alert.event : 'unkown'}</div>
                <div className="alert-start">Start: {alert.start ? formatLocalDateTimestamp(alert.start, weatherData.timezone_offset) : 'unkown'}</div>
                <div className="alert-start">End: {alert.end ? formatLocalDateTimestamp(alert.end, weatherData.timezone_offset) : 'unkown'}</div>
                {/* <div className="alert-description">Description: {alert.description ? alert.description : 'unkown'}</div> */}
              </div>
            ))
          }
        </div>
        <div className="display-more">
          <Link to="/alerts-weather">
            Show details
          </Link>
        </div>
      </section>
    : null
  } else if (weatherStatus === 'failed') {
    content = 
      <section className="preview-alerts-weather">
        <div>{weatherError}</div>
      </section>;
  }

  return (
    <>
      {content}
    </>
  )
}

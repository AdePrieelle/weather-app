import { useSelector } from 'react-redux';
import { 
  formatLocalDateTimestamp
} from '../../../common/helpers';
import { Link } from 'react-router-dom';
import './Alerts.scss';

export const Alerts = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);

  let content;

  if (weatherStatus === 'loading') {
    content = 
      <section className="alerts-weather">
        <div className="loading">Loading...</div>
      </section>;
    // content = <div className="loader"></div>
  } else if (weatherStatus === 'succeeded' || weatherData !== null) {
    content = 
    weatherData.alerts 
    ? <section className="alerts-weather">
        <div className="go-back">
          <Link to="/">
            {`<< Go back`}
          </Link>
        </div>
        <div className="alerts-weather-content">
            {
            weatherData.alerts.map((alert, id) => (
              <div key={id} className="alert">
                <div className="alert-sender-name">Sender name: {alert.sender_name ? alert.sender_name : 'unkown'}</div>
                <div className="alert-event">Event: {alert.event ? alert.event : 'unkown'}</div>
                <div className="alert-start">Start: {alert.start ? formatLocalDateTimestamp(alert.start, weatherData.timezone_offset) : 'unkown'}</div>
                <div className="alert-end">End: {alert.end ? formatLocalDateTimestamp(alert.end, weatherData.timezone_offset) : 'unkown'}</div>
                <div className="alert-description">Description: {alert.description ? alert.description : 'unkown'}</div>
              </div>
            ))
          }
        </div>
      </section>
    : null
  } else if (weatherStatus === 'failed') {
    content = 
      <section className="alerts-weather">
        <div>{weatherError}</div>
      </section>;
  }

  return (
    <>
      {content}
    </>
  )
}

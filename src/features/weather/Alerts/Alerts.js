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
      <section className="alerts">
        <div className="loading">Loading...</div>
      </section>;
    // content = <div className="loader"></div>
  } else if (weatherStatus === 'succeeded' || weatherData !== null) {
    content = 
    weatherData.alerts 
    ? <section className="alerts">
        <div className="alerts-content">
            {
            weatherData.alerts.map((alert, id) => (
              <div key={id} className="alert">
                <div className="alert-title alert-sender-title">Sender:</div>
                <div className="alert-value alert-sender-value">{alert.sender_name ? alert.sender_name : 'Unkown'}</div>
                <div className="alert-title alert-event-title">Event:</div>
                <div className="alert-value alert-event-value">{alert.event ? alert.event : 'Unkown'}</div>
                <div className="alert-title alert-start-title">Start:</div>
                <div className="alert-value alert-start-value">{alert.start ? formatLocalDateTimestamp(alert.start, weatherData.timezone_offset) : 'Unkown'}</div>
                <div className="alert-title alert-end-title">End:</div>
                <div className="alert-value alert-end-value">{alert.end ? formatLocalDateTimestamp(alert.end, weatherData.timezone_offset) : 'Unkown'}</div>
                <div className="alert-title alert-description-title">Description:</div>
                <div className="alert-value alert-description-value">{alert.description ? alert.description : 'Unkown'}</div>
              </div>
            ))
          }
        </div>
        <div className="display-more">
          <Link to="/">
              <i className="fas fa-arrow-left show-details-arrow"></i>Go back
          </Link>
        </div>
      </section>
    : null
  } else if (weatherStatus === 'failed') {
    content = 
      <section className="alerts">
        <div>{weatherError}</div>
      </section>;
  }

  return (
    <>
      {content}
    </>
  )
}

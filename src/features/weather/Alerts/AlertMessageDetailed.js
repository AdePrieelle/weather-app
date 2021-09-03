import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { 
  formatLocalDateTimestamp
} from '../../../common/helpers';
import './AlertMessage.scss';
import './AlertMessageDetailed.scss';

export const AlertMessageDetailed = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const { alertId } = useParams();

  const weatherDataAlerts = 
      alertId 
    ? weatherData.alerts.slice((+alertId - 1), +alertId)
    : weatherData.alerts;

  return (
    <>
      {
        weatherData.alerts
      ? weatherDataAlerts.map((alert, id) => (
          <div key={id} className="alert-message alert-message-detailed">
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
      : null
      }
    </>
  )
}

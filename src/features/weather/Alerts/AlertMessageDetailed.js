import { useSelector } from 'react-redux';
import { 
  formatLocalDateTimestamp
} from '../../../common/helpers';
import './AlertMessage.scss';
import './AlertMessageDetailed.scss';

export const AlertMessageDetailed = () => {
  const weatherData = useSelector(state => state.weather.weatherData);

  return (
    <>
      {
        weatherData.alerts
      ? weatherData.alerts.map((alert, id) => (
          <div key={id} id="alert-message-detailed" className="alert-message">
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

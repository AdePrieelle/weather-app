import { useSelector } from 'react-redux';
import { 
  formatLocalDateTimestamp
} from '../../../common/helpers';
import './AlertMessage.scss';
import './AlertMessageDetailed.scss';

// const exampleAlerts = [
//   {
//     sender_name: 'NWS Omaha (Eastern Nebraska and Southeastern Iowa - Omaha Valley)',
//     event: 'Special Weather Statement',
//     start: 1627618260,
//     end: 1627751700,
//     description: '...DEGRADED AIR QUALITY THROUGH THIS WEEKEND DUE TO WILDFIRE\nSMOKE...\nWHAT...Wildfire Smoke will cause degraded air quality, with\nperiods of unhealthy air quality expected.\nWHERE...Smoke is impacting a large area, but this statement\nfocuses on eastern Nebraska and western Iowa. Generally, the air\nquality will be the worst in northern parts of this area.\nWHEN....Widespread smoke is expected on Friday, with a likelihood\nfor periods of smoky conditions and degraded air quality to\ncontinue through the weekend.\nIMPACTS...The smoke will cause unhealthy air quality at times and\nmay cause health impacts. This may be especially impactful for\nindividuals with respiratory problems, elderly, and young\nchildren.\nHEALTH INFORMATION...Those with health conditions sensitive to\nair quality should reduce prolonged outdoor activity. During times\nof unhealthy air quality, those sensitive to air quality should\nconsider moving indoors or altering plans to reduce exposure to\nthe smoky air. Others may want to consider the impacts of the\nexpected poor air quality when planning and participating in\noutdoor activities and adjust as necessary, especially during\nperiods of unhealthy air quality.\nFor the most recent update on air quality across the region,\nplease visit airnow.gov, and your local health department web\npages.',
//     tags: []
//   },
//   {
//     sender_name: 'NWS Omaha (Eastern Nebraska and Southeastern Iowa - Omaha Valley)',
//     event: 'Special Weather Statement',
//     start: 1627618260,
//     end: 1627751700,
//     description: '...DUE TO WILDFIRE\nSMOKE...\nWHAT...Wildfire Smoke will cause degraded air quality, with\nperiods of unhealthy air quality expected.\nWHERE...Smoke is impacting a large area, but this statement\nfocuses on eastern Nebraska and western Iowa. Generally, the air\nquality will be the worst in northern parts of this area.\nWHEN....Widespread smoke is expected on Friday, with a likelihood\nfor periods of smoky conditions and degraded air quality to\ncontinue through the weekend.\nIMPACTS...The smoke will cause unhealthy air quality at times and\nmay cause health impacts. This may be especially impactful for\nindividuals with respiratory problems, elderly, and young\nchildren.\nHEALTH INFORMATION...Those with health conditions sensitive to\nair quality should reduce prolonged outdoor activity. During times\nof unhealthy air quality, those sensitive to air quality should\nconsider moving indoors or altering plans to reduce exposure to\nthe smoky air. Others may want to consider the impacts of the\nexpected poor air quality when planning and participating in\noutdoor activities and adjust as necessary, especially during\nperiods of unhealthy air quality.\nFor the most recent update on air quality across the region,\nplease visit airnow.gov, and your local health department web\npages.',
//     tags: []
//   },
//   {
//     sender_name: 'NWS Omaha (Eastern Nebraska and Southeastern Iowa - Omaha Valley)',
//     event: 'Special Weather Statement',
//     start: 1627618260,
//     end: 1627751700,
//     description: '... sdfsdfsd sdfsdfsdf sdfsdfsdf sdfsdfsd sdfsdfsdf DEGRADED AIR QUALITY THROUGH THIS WEEKEND DUE TO WILDFIRE\nSMOKE...\nWHAT...Wildfire Smoke will cause degraded air quality, with\nperiods of unhealthy air quality expected.\nWHERE...Smoke is impacting a large area, but this statement\nfocuses on eastern Nebraska and western Iowa. Generally, the air\nquality will be the worst in northern parts of this area.\nWHEN....Widespread smoke is expected on Friday, with a likelihood\nfor periods of smoky conditions and degraded air quality to\ncontinue through the weekend.\nIMPACTS...The smoke will cause unhealthy air quality at times and\nmay cause health impacts. This may be especially impactful for\nindividuals with respiratory problems, elderly, and young\nchildren.\nHEALTH INFORMATION...Those with health conditions sensitive to\nair quality should reduce prolonged outdoor activity. During times\nof unhealthy air quality, those sensitive to air quality should\nconsider moving indoors or altering plans to reduce exposure to\nthe smoky air. Others may want to consider the impacts of the\nexpected poor air quality when planning and participating in\noutdoor activities and adjust as necessary, especially during\nperiods of unhealthy air quality.\nFor the most recent update on air quality across the region,\nplease visit airnow.gov, and your local health department web\npages.',
//     tags: []
//   }
// ];

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

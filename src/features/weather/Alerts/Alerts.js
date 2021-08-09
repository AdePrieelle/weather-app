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

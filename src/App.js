import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityAndLatitudeLongitude } from './features/weather/weatherSlice'
import { Navbar } from './features/weather/Navbar/Navbar';
import { PreviewCurrentWeather } from './features/weather/CurrentWeather/PreviewCurrentWeather'
import { CurrentWeather } from './features/weather/CurrentWeather/CurrentWeather';
import { PreviewRainForecast } from './features/weather/RainForecast/PreviewRainForecast';
import { RainForecast } from './features/weather/RainForecast/RainForecast';
import { PreviewTwoDaysForecast } from './features/weather/TwoDaysForecast/PreviewTwoDaysForecast';
import { TwoDaysForecast } from './features/weather/TwoDaysForecast/TwoDaysForecast';
import { PreviewWeekForecast } from './features/weather/WeekForecast/PreviewWeekForecast';
import { WeekForecast } from './features/weather/WeekForecast/WeekForecast';
import { PreviewAlertsWeather } from './features/weather/PreviewAlertsWeather';
import { AlertsWeather } from './features/weather/AlertsWeather';
import { Switch, Route } from 'react-router-dom';
import ScrollToTop from './common/ScrollToTop';
import './App.scss';


function App() {
  const dispatch = useDispatch();
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);

  useEffect(() => {
    if (weatherStatus === 'idle') {
      dispatch(fetchCityAndLatitudeLongitude('London'))
    }
  }, [weatherStatus, dispatch]);

  return (
    <div className="App">
      <Navbar />
      {/* Scroll to top on route change */}
      <ScrollToTop />
      <div className="weather-contents">
        <Switch>
          <Route exact path="/">
            <div className="weather-contents-preview">
              <PreviewCurrentWeather />
              <PreviewRainForecast />
              <PreviewTwoDaysForecast />
              <PreviewWeekForecast />
              <PreviewAlertsWeather />
            </div>
          </Route>
          <Route exact path="/current-weather">
            <CurrentWeather />
          </Route>
          <Route exact path="/rain-forecast">
            <RainForecast />
          </Route>
          <Route exact path="/two-days-forecast">
            <TwoDaysForecast />
          </Route>
          <Route exact path="/week-forecast">
            <WeekForecast />
          </Route>
          <Route exact path="/alerts-weather">
            <AlertsWeather />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;

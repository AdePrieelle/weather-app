import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityAndLatitudeLongitude } from './features/weather/weatherSlice'
import { Navbar } from './features/weather/Navbar/Navbar';
import { CurrentWeather } from './features/weather/CurrentWeather';
import { PreviewCurrentWeather } from './features/weather/PreviewCurrentWeather'
import { MinuteForecastWeather } from './features/weather/MinuteForecastWeatherFolder/MinuteForecastWeather';
import { PreviewMinuteForecastWeather } from './features/weather/MinuteForecastWeatherFolder/PreviewMinuteForecastWeather';
import { TwoDaysForecastWeather } from './features/weather/TwoDaysForecastWeather';
import { PreviewTwoDaysForecastWeather } from './features/weather/PreviewTwoDaysForecastWeather';
import { WeekForecastWeather } from './features/weather/WeekForecastWeather';
import { PreviewWeekForecastWeather } from './features/weather/PreviewWeekForecastWeather';
import { AlertsWeather } from './features/weather/AlertsWeather';
import { PreviewAlertsWeather } from './features/weather/PreviewAlertsWeather';
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
      <div className="weather-contents">
        <ScrollToTop />
        <Switch>
          <Route exact path="/">
            <PreviewCurrentWeather />
            <PreviewTwoDaysForecastWeather />
            <PreviewMinuteForecastWeather />
            <PreviewWeekForecastWeather />
            <PreviewAlertsWeather />
          </Route>
          <Route exact path="/current-weather">
            <CurrentWeather />
          </Route>
          <Route exact path="/two-days-forecast-weather">
            <TwoDaysForecastWeather />
          </Route>
          <Route exact path="/week-forecast-weather">
            <WeekForecastWeather />
          </Route>
          <Route exact path="/alerts-weather">
            <AlertsWeather />
          </Route>
          <Route exact path="/minute-forecast-weather">
            <MinuteForecastWeather />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;

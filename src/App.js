import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityAndLatitudeLongitude } from './features/weather/weatherSlice'
import WeatherNavbar from './features/weather/WeatherNavbar';
import CurrentWeather from './features/weather/CurrentWeather';
import { PreviewCurrentWeather } from './features/weather/PreviewCurrentWeather'
// import { MinuteForecastWeather } from './features/weather/MinuteForecastWeatherFolder/MinuteForecastWeather';
// import { TwoDaysForecastWeather } from './features/weather/TwoDaysForecastWeather';
// import { WeekForecastWeather } from './features/weather/WeekForecastWeather';
// import { AlertsWeather } from './features/weather/AlertsWeather';
import { Switch, Route } from 'react-router-dom';
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
      <WeatherNavbar />
      <div className="weather-contents">
        <Switch>
          <Route exact path="/">
            <PreviewCurrentWeather />
          </Route>
          <Route exact path="/current-weather">
            <CurrentWeather />
          </Route>
          {/* <AlertsWeather />
          <MinuteForecastWeather />
          <TwoDaysForecastWeather />
          <WeekForecastWeather /> */}
        </Switch>
      </div>
    </div>
  );
}

export default App;

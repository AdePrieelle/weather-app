import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityAndLatitudeLongitude } from './features/weather/weatherSlice'
import WeatherNavbar from './features/weather/WeatherNavbar';
import CurrentWeather from './features/weather/CurrentWeather';
import { MinuteForecastWeather } from './features/weather/MinuteForecastWeatherFolder/MinuteForecastWeather';
import { TwoDaysForecastWeather } from './features/weather/TwoDaysForecastWeather';
import { WeekForecastWeather } from './features/weather/WeekForecastWeather';
import { AlertsWeather } from './features/weather/AlertsWeather';
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
        <AlertsWeather />
        <WeekForecastWeather />
        <TwoDaysForecastWeather />
        <CurrentWeather />
        <MinuteForecastWeather />
      </div>
    </div>
  );
}

export default App;

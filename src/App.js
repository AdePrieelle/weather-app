import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityAndLatitudeLongitude } from './features/weather/weatherSlice'
import WeatherNavbar from './features/weather/WeatherNavbar';
import CurrentWeather from './features/weather/CurrentWeather';
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
        <CurrentWeather />
      </div>
    </div>
  );
}

export default App;

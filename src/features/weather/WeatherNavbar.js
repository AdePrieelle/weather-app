import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCityAndLatitudeLongitude, switchTemperatureUnits } from './weatherSlice'
import '../../styles/WeatherNavbar.scss';

const WeatherNavbar = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch()
  const weatherTemperatureUnits = useSelector(state => state.weather.temperatureUnits);

  const updateFormCity = (e) => {
    setCity(e.target.value);
  }

  return (
    <nav className="weather-navbar">
      <div className="navbar-logo">Logo</div>
      <input className="navbar-input" type="text" placeholder="Search location..." onChange={updateFormCity} onKeyUp={e => {
        if (e.keyCode === 13) {
          dispatch(fetchCityAndLatitudeLongitude(city));
        }
      }}/>
      <button className="navbar-search-button" onClick={() => {dispatch(fetchCityAndLatitudeLongitude(city))}}>Search</button>
      <button className="navbar-temp-button" onClick={() => {dispatch(switchTemperatureUnits())}}>{weatherTemperatureUnits === 'Celcius' ? 'display °F' : 'display °C'}</button>
    </nav>
  )
}

export default WeatherNavbar;

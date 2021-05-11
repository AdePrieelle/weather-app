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

  const handleCitySearch = () => {
    dispatch(fetchCityAndLatitudeLongitude(city));
    setCity("");
  }

  return (
    <nav className="weather-navbar">
      <div className="weather-navbar-content">
        <div className="navbar-logo">Logo</div>
        <input className="navbar-input" value={city} type="text" placeholder="Search location..." onChange={updateFormCity} onKeyUp={e => {
          if (e.keyCode === 13) {
            handleCitySearch();
          }
        }}/>
        <button className="navbar-search-button" onClick={() => {handleCitySearch()}}>Search</button>
        <button className="navbar-temp-button" onClick={() => {dispatch(switchTemperatureUnits())}}>{weatherTemperatureUnits === 'Celcius' ? 'display °F' : 'display °C'}</button>
      </div>
      <div className="weather-navbar-tooltip">
        <div>Hint: if you can't find your city try to add the countrycode (and statecode) in ISO3166 format.</div> 
        <div>Example format: <code>city, countrycode</code> or <code>city, statecode, countrycode</code></div>
        <div>Example city: <code>London,uk</code> or <code>London,GB-LND,uk</code></div>
      </div>
    </nav>
  )
}

export default WeatherNavbar;

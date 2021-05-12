import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCityAndLatitudeLongitude, switchTemperatureUnits } from './weatherSlice'
import '../../styles/WeatherNavbar.scss';

const WeatherNavbar = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch()
  const weatherTemperatureUnits = useSelector(state => state.weather.temperatureUnits);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);
  const [showInputError, setShowInputError] = useState(0);
  const [showErrorMessage, setShowErrorMessage] = useState(0);
  const noInputErrorMessage = "Please enter a city";

  const updateFormCity = (e) => {
    setCity(e.target.value);
  }

  const handleCitySearch = () => {
    setShowErrorMessage(1);
    if (city === "") {
      setShowInputError(1);
      return null;
    } else {
      setShowInputError(0);
      dispatch(fetchCityAndLatitudeLongitude(city));
      setCity("");
    }
  }

  return (
    <nav className="weather-navbar">
      <div className="weather-navbar-content">
        <div className="navbar-logo">Logo</div>
        <div className="navbar-input-error-wrapper">
          <input 
            className="navbar-input" 
            style={{borderColor: (showErrorMessage === 0) ? "grey" : (weatherError === null && showInputError === 0) ? "grey" : "red"}}
            value={city} type="text" 
            placeholder="Search location..." 
            onChange={updateFormCity} 
            onKeyDown={() => {setShowErrorMessage(0);}}
            onKeyUp={e => {
            if (e.keyCode === 13) {
              handleCitySearch();
            }
          }}/>
          { showErrorMessage === 1 
          ? showInputError === 1
          ? <div className="weather-navbar-error">{noInputErrorMessage}</div>
          : weatherError !== null
          ? <div className="weather-navbar-error">{weatherError}</div>
          : null
          : null
          }
        </div>
        <button className="navbar-search-button" onClick={() => {handleCitySearch()}}>Search</button>
        <button className="navbar-temp-button" onClick={() => {dispatch(switchTemperatureUnits())}}>{weatherTemperatureUnits === 'Celcius' ? 'display °F' : 'display °C'}</button>
      </div>
      <div className="weather-navbar-tooltip">
        <div>Hint: if you can't find your city try to add the countrycode (and statecode) in the ISO3166 format.</div> 
        <div>Format: <code>city, countrycode</code> or <code>city, statecode, countrycode</code></div>
        <div>Example: <code>London,uk</code> or <code>London,GB-LND,uk</code></div>
      </div>
    </nav>
  )
}

export default WeatherNavbar;

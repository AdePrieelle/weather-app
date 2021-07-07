import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCityAndLatitudeLongitude, switchTemperatureUnits } from './weatherSlice'
import '../../styles/WeatherNavbar.scss';

export const WeatherNavbar = () => {
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
        <div className="navbar-logo">
          <div className="navbar-logo-svg">
            <i className="fas fa-sun"></i>
          </div>
          <div className="navbar-logo-text">penWeather</div>
        </div>
        <div className="navbar-input-temp-wrapper">
          <div className="navbar-input-error-wrapper">
            <input 
              className="navbar-input" 
              style={{borderColor: (showErrorMessage === 0) ? "grey" : (weatherError === null && showInputError === 0) ? "grey" : "red"}}
              value={city} 
              type="text" 
              placeholder="Search location..." 
              onFocus={() => {setShowErrorMessage(0)}}
              onChange={updateFormCity} 
              onKeyDown={() => {setShowErrorMessage(0)}}
              onKeyUp={e => {
              if (e.keyCode === 13) {
                handleCitySearch();
              }
            }}/>
            <div className="navbar-search-icon" onClick={() => {handleCitySearch()}}>
              <i className="fas fa-search"></i>
            </div>
            { 
                showErrorMessage === 1 
              ? showInputError === 1
              ? <div className="weather-navbar-error">{noInputErrorMessage}</div>
              : weatherError !== null
              ? <div className="weather-navbar-error">{weatherError}</div>
              : null
              : null
            }
          </div>
          <button className="navbar-temp-button" onClick={() => {dispatch(switchTemperatureUnits())}}>
            <div className="navbar-temp-button-span">
              {
                  weatherTemperatureUnits === 'Celcius' 
                ? <div className="navbar-temp-button-metric-units">
                    <div className="navbar-temp-button-metric-units-active">°C</div>
                    <div className="navbar-temp-button-metric-units-inactive">/ °F</div>
                  </div>
                : <div className="navbar-temp-button-metric-units">
                    <div className="navbar-temp-button-metric-units-active">°F</div>
                    <div className="navbar-temp-button-metric-units-inactive">/ °C</div>
                  </div>
              }
            </div>
          </button>
        </div>
      </div>
    </nav>
  )
}

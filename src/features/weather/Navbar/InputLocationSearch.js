import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCityAndLatitudeLongitude } from '../weatherSlice';
import './InputLocationSearch.scss';

export const InputLocationSearch = ({
  showErrorMessage,
  setShowErrorMessage,
  showInputError,
  setShowInputError,
}) => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);

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
    <>
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
    </>
  )
}

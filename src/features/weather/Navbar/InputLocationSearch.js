import { useState } from "react";
import { useDispatch } from 'react-redux';
import { fetchCityAndLatitudeLongitude } from '../weatherSlice';
import './InputLocationSearch.scss';
import { useHistory } from 'react-router-dom';

export const InputLocationSearch = ({
  setShowErrorMessage,
  setShowInputError,
}) => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const updateFormCity = (e) => {
    setCity(e.target.value);
  }

  const handleCitySearch = () => {
    history.push("/");
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

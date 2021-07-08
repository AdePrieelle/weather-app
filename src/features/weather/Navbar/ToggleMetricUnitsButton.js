import { useSelector, useDispatch } from 'react-redux';
import { switchTemperatureUnits } from '../weatherSlice';
import '../../../styles/Navbar/ToggleMetricUnitsButton.scss';

export const ToggleMetricUnitsButton = () => {
  const dispatch = useDispatch();
  const weatherTemperatureUnits = useSelector(state => state.weather.temperatureUnits);

  return (
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
  )
}

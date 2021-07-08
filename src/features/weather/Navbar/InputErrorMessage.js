import { useSelector } from 'react-redux';
import '../../../styles/Navbar/InputErrorMessage.scss';

export const InputErrorMessage = ({
  showErrorMessage,
  showInputError
}) => {
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);
  const noInputErrorMessage = "Please enter a city";

  return (
    <>
      { 
          showErrorMessage === 1 
        ? showInputError === 1
        ? <div className="navbar-error">{noInputErrorMessage}</div>
        : weatherError !== null
        ? <div className="navbar-error">{weatherError}</div>
        : null
        : null
      }
    </>
  )
}

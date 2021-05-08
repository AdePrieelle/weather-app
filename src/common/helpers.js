import { useSelector } from 'react-redux'

export const ConvertTemperature = (props) => {
  const weatherTemperatureUnits = useSelector(state => state.weather.temperatureUnits);
  let temperatureValue;
  if (weatherTemperatureUnits === 'Celcius') {
    temperatureValue = `${Math.round(props.kelvin - 273.15)} °C`;
  } else if (weatherTemperatureUnits === 'Fahrenheit') {
    temperatureValue = `${Math.round((props.kelvin - 273.15) * (9 / 5) + 32)} °F`;
  }

  return(
    temperatureValue
  )
}

// export const convertTemperatureUnits = (temperatureUnit, kelvin) => {
//   if (temperatureUnit === 'Celcius') {
//     return `${Math.round(kelvin - 273.15)} °C`;
//   } else if (temperatureUnit === 'Fahrenheit') {
//     return `${Math.round((kelvin - 273.15) * (9 / 5) + 32)} °F`;
//   }
// };

// export const kelvinToFahrenheit = (kelvin) => {
//   return `${Math.round((kelvin - 273.15) * (9 / 5) + 32)}°`;
// };

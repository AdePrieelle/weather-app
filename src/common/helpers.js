// import { useSelector } from 'react-redux'

// export const ConvertTemperature = (props) => {
//   const weatherTemperatureUnits = useSelector(state => state.weather.temperatureUnits);
//   let temperatureValue;
//   if (weatherTemperatureUnits === 'Celcius') {
//     temperatureValue = `${Math.round(props.kelvin - 273.15)} °C`;
//   } else if (weatherTemperatureUnits === 'Fahrenheit') {
//     temperatureValue = `${Math.round((props.kelvin - 273.15) * (9 / 5) + 32)} °F`;
//   }

//   return(
//     temperatureValue
//   )
// }

export const convertTemperatureUnits = (temperatureUnit, kelvin) => {
  if (temperatureUnit === 'Celcius') {
    return `${Math.round(kelvin - 273.15)} °C`;
  } else if (temperatureUnit === 'Fahrenheit') {
    return `${Math.round((kelvin - 273.15) * (9 / 5) + 32)} °F`;
  }
};

export const formatLocalDate = (timezoneOffset) => {
  const timeNow = new Date().getTime();
  const timeCity = timeNow + timezoneOffset*1000;
  const currentTime = new Date(timeCity);
  const day = currentTime.getUTCDay();
  const date = currentTime.getUTCDate();
  const month = currentTime.getUTCMonth();
  const year = currentTime.getUTCFullYear();
  const hours = currentTime.getUTCHours();
  const minutes = currentTime.getUTCMinutes();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${days[day]} ${date} ${months[month]} ${year} ${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

export const formatLocalTime = (time, timezoneOffset) => {
  const timeDateValue = new Date((time*1000)+(timezoneOffset*1000));
  const hours = timeDateValue.getUTCHours();
  const minutes = timeDateValue.getUTCMinutes();
  return(`${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}`);
}

export const secondsToGmtHoursAndMinutes = (seconds) => {
  const secondsNumber = seconds < 0 ? -Number(seconds): Number(seconds);
  const h = Math.floor(secondsNumber / 3600);
  const m = Math.floor(secondsNumber % 3600 / 60);

  const hoursDisplay = h < 10 ? `${h}` : h;
  const minutesDisplay = m === 0 ? "" : m < 10 ? `:0${m}`: `:${m}`;
  return `GMT${seconds < 0 ? "-" : "+"}${hoursDisplay}${minutesDisplay}`; 
}

export const convertWindSpeed = (windSpeed) => {
  if (windSpeed < 0.2) {
    return 0;
  } else if (windSpeed < 1.6) {
    return 1;
  } else if (windSpeed < 3.4) {
    return 2;
  } else if (windSpeed < 5.5) {
    return 3;
  } else if (windSpeed < 8.0) {
    return 4;
  } else if (windSpeed < 10.8) {
    return 5;
  } else if (windSpeed < 13.9) {
    return 6;
  } else if (windSpeed < 17.2) {
    return 7;
  } else if (windSpeed < 20.8) {
    return 8;
  } else if (windSpeed < 24.5) {
    return 9;
  } else if (windSpeed < 28.5) {
    return 10;
  } else if (windSpeed < 32.6) {
    return 11;
  } else if (windSpeed >= 32.6) {
    return 12;
  }
}

export const convertWindDegrees = (windDegrees) => {
  // const val = Math.floor((windDegrees / 22.5) + 0.5);
  // const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  // return arr[(val % 16)];
  const val = Math.floor((windDegrees / 45) + 0.5);
  const arr = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return arr[(val % 8)];
}

export const rotateWindArrow = (windDegrees) => {
  const val = Math.floor((windDegrees / 45) + 0.5);
  const arr = [0, 45, 90, 135, 180, 225, 270, 315];
  const amountToRotate = arr[val % 8];
  return (
    <div className="windArrow">
      {/* compensate for 45 degrees because the icon is angled at 45 degrees by default 
      and add 180 degrees to point towards the direction that the wind is going */}
      <i className="fas fa-location-arrow" style={{rotate: `${(amountToRotate-45)+180}deg`}}></i>
    </div>
  )
}

// function degToCompass(num) {
//   var val = Math.floor((num / 22.5) + 0.5);
//   var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
//   return arr[(val % 16)];
// }

// export const kelvinToFahrenheit = (kelvin) => {
//   return `${Math.round((kelvin - 273.15) * (9 / 5) + 32)}°`;
// };

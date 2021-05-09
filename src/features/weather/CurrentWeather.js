import React from 'react'
import { useSelector } from 'react-redux'
import { ConvertTemperature } from '../../common/helpers'

const CurrentWeather = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);
  const weatherCity = useSelector(state => state.weather.city);

  const formatTime = (timezoneOffset) => {
      const timeNow = new Date().getTime();
      console.log(timeNow);
      console.log(timezoneOffset);
      const timeCity = timeNow + timezoneOffset*1000;
      const currentTime = new Date(timeCity);
      const day = currentTime.getUTCDay();
      const date = currentTime.getUTCDate();
      const month = currentTime.getUTCMonth();
      const year = currentTime.getUTCFullYear();
      const hours = currentTime.getUTCHours();
      // Minutes part from the timestamp
      const minutes = "0" + currentTime.getUTCMinutes();
      // Seconds part from the timestamp
      // const seconds = "0" + currentTime.getSeconds();
      // Will display time in 10:30:23 format
      // return (hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2));

      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      // format in Sunday 9 may 2021 17:12
      return `${days[day]} ${date} ${months[month]} ${year} ${hours < 10 ? "0" : ""}${hours}:${minutes.substr(-2)}`;


      // var options = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      // var prnDt = 'Printed on ' + new Date().toLocaleTimeString('en-us', options);

      // console.log(prnDt);

  }

  let content

  if (weatherStatus === 'loading') {
    content = <div className="loading">Loading...</div>
    // content = <div className="loader"></div>
  } else if (weatherStatus === 'succeeded') {
    content = 
    <div className="current-weahter-content">
      <div>If you can't find your city then try: <code>city, countryCode</code></div>
      <div>Example: <code>London,uk</code></div>
      <div>Temperature in {weatherCity} in celcius: <ConvertTemperature kelvin={weatherData.current.temp} /></div>
      <div>current time: {formatTime(weatherData.timezone_offset)}</div>
    </div>
  } else if (weatherStatus === 'failed') {
    content = <div>{weatherError}</div>
  }

  return (
    <section className="current-weather">
      {content}
    </section>
  )
}

export default CurrentWeather;

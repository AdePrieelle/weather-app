import React from 'react'
import { useSelector } from 'react-redux'
import { ConvertTemperature } from '../../common/helpers'

const CurrentWeather = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherStatus = useSelector(state => state.weather.statusFetchCityAndLatitudeLongitude);
  const weatherError = useSelector(state => state.weather.errorFetchCityAndLatitudeLongitude);
  const weatherCity = useSelector(state => state.weather.city);

  let content

  if (weatherStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (weatherStatus === 'succeeded') {
    content = <div>Temperature in {weatherCity} in celcius: <ConvertTemperature kelvin={weatherData.current.temp} /></div>
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

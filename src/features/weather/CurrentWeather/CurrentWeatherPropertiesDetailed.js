import { useSelector } from 'react-redux';
import { 
  convertTemperatureUnits, 
  formatLocalTime, 
  convertWindSpeedToBeaufort, 
} from '../../../common/helpers';
import { WindArrowBeaufort } from '../../../common/WindArrowBeaufort';
import './CurrentWeatherPropertiesDetailed.scss';

export const CurrentWeatherPropertiesDetailed = () => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const weatherTemperatureUnits = useSelector(state => state.weather.temperatureUnits);
  const weatherLatitude = useSelector(state => state.weather.latitude);
  const weatherLongitude = useSelector(state => state.weather.longitude);

  return (
    <div className="current-weather-properties-detailed">
      <div className="title title-wind">Wind</div>
      <div className="value value-wind">
        <WindArrowBeaufort
          windDegrees={weatherData.current.wind_deg}
          windSpeedBeaufort={convertWindSpeedToBeaufort(weatherData.current.wind_speed)}
        />
      </div>
      <div className="title title-cloudiness">Cloudiness</div>
      <div className="value value-cloudiness">{weatherData.current.clouds}%</div>
      <div className="title title-humidity">Humidity</div>
      <div className="value value-humidity">{weatherData.current.humidity}%</div>
      <div className="title title-latitude">Latitude</div>
      <div className="value value-latitude">{weatherLatitude}° W</div>
      <div className="title title-longitude">Longitude</div>
      <div className="value value-longitude">{weatherLongitude}° N</div>
      <div className="title title-pressure">Pressure</div>
      <div className="value value-pressure">{weatherData.current.pressure} hPa</div>
      <div className="title title-dew-point">Dew point</div>
      <div className="value value-dew-point">{convertTemperatureUnits(weatherTemperatureUnits, weatherData.current.dew_point)}</div>
      <div className="title title-uv-index">Uv index</div>
      <div className="value value-uv-index">{Math.round(weatherData.current.uvi)}</div>
      <div className="title title-visibility">Visibility</div>
      <div className="value value-visibility">
        {
            weatherData.current.visibility >= 1000 
          ? `${weatherData.current.visibility/1000} km` 
          : `${weatherData.current.visibility} m`
        }
      </div>
      <div className="title title-windspeed-metre-sec">Windspeed</div>
      <div className="value value-windspeed-metre-sec">{(weatherData.current.wind_speed*3.6).toFixed(2)} km/h</div>
      <div className="title title-sunrise">Sunrise</div>
      <div className="value value-sunrise">{formatLocalTime(weatherData.current.sunrise, weatherData.timezone_offset)}</div>
      <div className="title title-sunset">Sunset</div>
      <div className="value value-sunset">{formatLocalTime(weatherData.current.sunset, weatherData.timezone_offset)}</div>
    </div>
  )
}

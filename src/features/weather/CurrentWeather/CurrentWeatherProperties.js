import { useSelector } from 'react-redux';
import { convertWindSpeedToBeaufort } from '../../../common/helpers';
import { WindArrowBeaufort } from '../../../common/WindArrowBeaufort';
import './CurrentWeatherProperties.scss';

export const CurrentWeatherProperties = () => {
  const weatherData = useSelector(state => state.weather.weatherData);

  return (
    <div className="current-weather-properties">
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
    </div>
  )
}

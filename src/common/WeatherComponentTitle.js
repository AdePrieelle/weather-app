import './WeatherComponentTitle.scss';

export const WeatherComponentTitle = (props) => {
  return (
    <h1 className="weather-component-title">{props.children}</h1>
  )
}

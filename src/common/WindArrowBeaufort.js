import './WindArrowBeaufort.scss';

export const WindArrowBeaufort = ({ windDegrees, windSpeedBeaufort }) => {
  const val = Math.floor((windDegrees / 45) + 0.5);
  const arr = [0, 45, 90, 135, 180, 225, 270, 315];
  const amountToRotate = arr[val % 8];
  
  const translateXWindArrow = '-2px';
  const translateYWindArrow = '2px';
  return (
    <div className="wind-arrow-beaufort-wrapper">
      {/* compensate for 45 degrees because the icon is angled at 45 degrees by default 
      and add 180 degrees to point towards the direction that the wind is going */}
      <i className="fas fa-location-arrow wind-arrow" style={{transform: `translate(${translateXWindArrow}, ${translateYWindArrow})`, rotate: `${(amountToRotate-45)+180}deg`}}></i>
      <div className="wind-speed-beaufort">
        {windSpeedBeaufort}
      </div>
    </div>
  )
}

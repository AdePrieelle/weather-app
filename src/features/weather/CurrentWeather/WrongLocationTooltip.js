import './WrongLocationTooltip.scss';

export const WrongLocationTooltip = ({
  showWrongLocationTooltip,
  ToggleWrongLocationTooltip
}) => {
  return (
    <>
      <div className={
          showWrongLocationTooltip 
        ? "wrong-location-tooltip wrong-location-tooltip-active"
        : "wrong-location-tooltip"
      }>
        <div className="wrong-location-tooltip-content">
          <div className="wrong-location-tooltip-content-text">If you can't find your city try to add the countrycode (and statecode) in the ISO3166 format.</div> 
          <div>Format: <code>city,countrycode</code> or <code>city,statecode,countrycode</code></div>
          <div>Example: <code>London,GB</code> or <code>London,GB-LND,GB</code></div>
          <div className="close-button-wrapper">
            <button className="wrong-location-tooltip-close" onClick={() => {ToggleWrongLocationTooltip()}}>Got it!</button>
          </div>
        </div>
      </div>
    </>
  )
}

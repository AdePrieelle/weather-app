export const SelectTimeOverlayLine = ({ 
  xScale, 
  hoveredTimeValue, 
  innerHeight,
  width,
  widthBreakpointSmall,
  widthBreakpointMedium
}) => {
  return(
    <line 
      className="select-time-overlay-line"
      x1={xScale(hoveredTimeValue)} 
      x2={xScale(hoveredTimeValue)} 
      y1={0} 
      y2={innerHeight} 
      style={{
        strokeWidth: `${
            width >= widthBreakpointMedium
          ? '5px' 
          : width >= widthBreakpointSmall
          ? '4px'
          : '3px'
        }`
      }} 
    />
  )
}

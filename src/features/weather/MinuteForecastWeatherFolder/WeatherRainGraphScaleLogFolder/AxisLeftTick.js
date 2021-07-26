export const AxisLeftTick = ({
  yScale,
  rainIntensity,
  rainIntensityValue,
  innerWidth,
  width,
  widthBreakpointSmall,
  widthBreakpointLarge,
  axisLeftTickOffset
}) => {
  return (
    <g className="tick" transform={`translate(0,${yScale(rainIntensity[rainIntensityValue])})`}>
      <line x2={innerWidth} />
      <text 
        style={{
          textAnchor: 'end', 
          fontSize: `${
              width >= widthBreakpointLarge 
            ? '14px' 
            : width >= widthBreakpointSmall
            ? '12px'
            : '10px'
          }`
        }} 
        x={-axisLeftTickOffset} 
        dy=".32em"
      >
        {rainIntensityValue}
      </text>
    </g>
  )
}

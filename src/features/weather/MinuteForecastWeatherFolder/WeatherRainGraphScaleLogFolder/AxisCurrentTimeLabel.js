export const AxisCurrentTimeLabel = ({ 
  axisCurrentTimeLabelXOffset, 
  axisCurrentTimeLabelYOffset, 
  axisCurrentTimeTextLabel,
  width,
  widthBreakpointSmall,
  widthBreakpointLarge
}) => {
  return (
    <text 
      className="text-label-current-time"
      textAnchor="middle"
      transform={`translate(${axisCurrentTimeLabelXOffset},${-axisCurrentTimeLabelYOffset})`}
      style={{
        fontSize: `${
            width >= widthBreakpointLarge 
          ? '16px' 
          : width >= widthBreakpointSmall
          ? '14px'
          : '12px'
        }`
      }} 
    >
      {axisCurrentTimeTextLabel}
    </text>
  )
}

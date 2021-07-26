import { AxisLeftTick } from './AxisLeftTick';

export const AxisLeft= ({ 
  yScale, 
  innerWidth, 
  width,
  widthBreakpointSmall,
  widthBreakpointLarge,
  axisLeftTickOffset,
  rainIntensity
 }) => {
  return (
    <g className="axis">
      {/* always render one rain intensity level tick above current max rain intensity value if yScale .nice() is removed */}
      <AxisLeftTick 
        rainIntensityValue={'Light rain'}
        yScale={yScale}
        rainIntensity={rainIntensity}
        innerWidth={innerWidth}
        width={width}
        widthBreakpointSmall={widthBreakpointSmall}
        widthBreakpointLarge={widthBreakpointLarge}
        axisLeftTickOffset={axisLeftTickOffset}
      />
      <AxisLeftTick 
        rainIntensityValue='Moderate rain' 
        yScale={yScale}
        rainIntensity={rainIntensity}
        innerWidth={innerWidth}
        width={width}
        widthBreakpointSmall={widthBreakpointSmall}
        widthBreakpointLarge={widthBreakpointLarge}
        axisLeftTickOffset={axisLeftTickOffset}
      />
      {(yScale.domain()[1] > rainIntensity['Moderate rain'])
        ? <AxisLeftTick 
            rainIntensityValue='Heavy rain' 
            yScale={yScale}
            rainIntensity={rainIntensity}
            innerWidth={innerWidth}
            width={width}
            widthBreakpointSmall={widthBreakpointSmall}
            widthBreakpointLarge={widthBreakpointLarge}
            axisLeftTickOffset={axisLeftTickOffset}
          />
        : null
      }
      {(yScale.domain()[1] > rainIntensity['Heavy rain'])
        ? <AxisLeftTick 
            rainIntensityValue='Violent rain' 
            yScale={yScale}
            rainIntensity={rainIntensity}
            innerWidth={innerWidth}
            width={width}
            widthBreakpointSmall={widthBreakpointSmall}
            widthBreakpointLarge={widthBreakpointLarge}
            axisLeftTickOffset={axisLeftTickOffset}
          />
        : null
      }
    </g>
  )
}

import { useSelector } from 'react-redux';
import * as d3 from 'd3';
import { Marks } from './Marks';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { AxisOuterLines } from './AxisOuterLines';
import { AxisCurrentTimeLabel } from './AxisCurrentTimeLabel';
import { SelectTimeOverlay } from './SelectTimeOverlay';
import { useSvgWrapperSize } from './useSvgWrapperSize';
import { 
  dataTimezoneOffsetInMilliseconds,
  // calculateBreakpointSizeMarginLeft,
  calculateBreakpointSizeMargin,
  rainIntensityLevels,
  calculateMaxYScaleDomain
} from './common/helpers';
import './styles/WeatherRainGraphScaleLog.scss';

// svg graph size parameters
const margin = { top: 25, right: 30, bottom: 30, left: 130 };
const marginTopValues = {small: 20, medium: 20, large: 25}
const marginRightValues = {small: 20, medium: 20, large: 20}
const marginBottomValues = {small: 20, medium: 25, large: 30}
const marginLeftValues = {small: 80, medium: 100, large: 110}
// const marginLeftLarge = 130;
// const marginLeftMedium = 110;
// const marginLeftSmall = 90;
const axisCurrentTimeLabelXOffset = 0;
const axisCurrentTimeLabelYOffset = 10;
const axisCurrentTimeTextLabel = "Now";
const selectTimeOverLayRectRightPadding = 14;
const selectTimeOverlayTooltipSvgWrapperWidthBreakpoint = 306;
const selectTimeOverlayTooltipSvgWrapperWidthBreakpointXOffset = 28;
const axisLeftTickOffset = 10;
const widthBreakpointSmall = 480;
const widthBreakpointMedium = 700;
const widthBreakpointLarge = 900;
const axisBottomTicksAmountLarge = 12;
const axisBottomTicksAmountSmall = 4;
const axisBottomTickPaddingLarge = 16;
const axisBottomTickPaddingMedium = 12;
const axisBottomTickPaddingSmall = 10;
const xAxisTickFormat = d3.utcFormat("%H:%M");

export const WeatherRainGraphScaleLog = () => {
  const weatherRainData = useSelector(state => state.weather.weatherData.minutely);
  const timezoneOffset = useSelector(state => state.weather.weatherData.timezone_offset);

  const [width, height] = useSvgWrapperSize();
  
  if(!weatherRainData) {
    return <pre style={{fontSize: "1em"}}>Loading...</pre>
  }

  const data = dataTimezoneOffsetInMilliseconds(weatherRainData, timezoneOffset);

  // margin.left = calculateBreakpointSizeMarginLeft(
  //   width,
  //   widthBreakpointLarge,
  //   widthBreakpointSmall,
  //   marginLeftLarge,
  //   marginLeftMedium,
  //   marginLeftSmall
  // );

  const calculatedMarginValues = calculateBreakpointSizeMargin(
    width,
    widthBreakpointLarge,
    widthBreakpointSmall,
    marginTopValues,
    marginRightValues,
    marginBottomValues,
    marginLeftValues
  );

  margin.top = calculatedMarginValues.top;
  margin.right = calculatedMarginValues.right;
  margin.bottom = calculatedMarginValues.bottom;
  margin.left = calculatedMarginValues.left;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const yValue = d => d.precipitation;
  const xValue = d => d.dt;

  const dataDomainMax = d3.max(data, yValue);
  const rainIntensity = rainIntensityLevels;
  // display one rain intensity level above the current max rain intensity level
  const maxYScaleDomain = calculateMaxYScaleDomain(dataDomainMax, rainIntensity);

  // use epsilon as a small number because scaleLog min domain value cant be zero
  const epsilon = 0.1;
  const yScale = d3.scaleLog()
    .domain([epsilon, maxYScaleDomain])
    .range([innerHeight, 0])
    .clamp(true)
    .nice();

  const xScale = d3.scaleTime()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth]);

  return (
    <div className="svg-wrapper">
      <svg className="svg-graph">
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisOuterLines 
            innerWidth={innerWidth}
            innerHeight={innerHeight}
          />
          <AxisCurrentTimeLabel 
            axisCurrentTimeLabelXOffset={axisCurrentTimeLabelXOffset}
            axisCurrentTimeLabelYOffset={axisCurrentTimeLabelYOffset}
            axisCurrentTimeTextLabel={axisCurrentTimeTextLabel}
            width={width}
            widthBreakpointSmall={widthBreakpointSmall}
            widthBreakpointLarge={widthBreakpointLarge}
          />
          <AxisBottom 
            width={width}
            xScale={xScale} 
            innerHeight={innerHeight}
            xAxisTickFormat={xAxisTickFormat}
            widthBreakpointSmall={widthBreakpointSmall}
            widthBreakpointMedium={widthBreakpointMedium}
            widthBreakpointLarge={widthBreakpointLarge}
            axisBottomTicksAmountLarge={axisBottomTicksAmountLarge}
            axisBottomTicksAmountSmall={axisBottomTicksAmountSmall}
            axisBottomTickPaddingLarge={axisBottomTickPaddingLarge}
            axisBottomTickPaddingMedium={axisBottomTickPaddingMedium}
            axisBottomTickPaddingSmall={axisBottomTickPaddingSmall}
          />
          <AxisLeft 
            yScale={yScale} 
            innerWidth={innerWidth} 
            width={width}
            widthBreakpointSmall={widthBreakpointSmall}
            widthBreakpointLarge={widthBreakpointLarge}
            axisLeftTickOffset={axisLeftTickOffset}
            rainIntensity={rainIntensity}
          />
          <Marks 
            data={data} 
            xScale={xScale} 
            yScale={yScale} 
            xValue={xValue}
            yValue={yValue}
            innerHeight={innerHeight}
            width={width}
            widthBreakpointSmall={widthBreakpointSmall}
            widthBreakpointLarge={widthBreakpointLarge}
          />
          <SelectTimeOverlay 
            data={data}
            xScale={xScale}
            yScale={yScale}
            width={width}
            innerWidth={innerWidth}
            innerHeight={innerHeight}
            rainIntensity={rainIntensity}
            xAxisTickFormat={xAxisTickFormat}
            selectTimeOverLayRectRightPadding={selectTimeOverLayRectRightPadding}
            widthBreakpointSmall={widthBreakpointSmall}
            widthBreakpointMedium={widthBreakpointMedium}
            selectTimeOverlayTooltipSvgWrapperWidthBreakpoint={selectTimeOverlayTooltipSvgWrapperWidthBreakpoint}
            selectTimeOverlayTooltipSvgWrapperWidthBreakpointXOffset={selectTimeOverlayTooltipSvgWrapperWidthBreakpointXOffset}
          />
        </g>
      </svg>
    </div>
  )
}

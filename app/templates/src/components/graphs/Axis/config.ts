import { AxisOpts } from './Axis';
import * as d3 from 'd3';

export const YEARS = ['2001','11Q4','12Q1','12Q2','12Q3','12Q4','13Q1','13Q2','13Q3','13Q4','14Q1','14Q2','14Q3','14Q4','15Q1','15Q2','15Q3','15Q4','16Q1','16Q2'];
export const COLORS = ['#01fec7','#b5286a', '#fec801','#0499fd','#ff3567','#eb5b0d','#91ea19','#3e42d7'];

//GRAPH MARGINS [LEFT,TOP,RIGHT,BOTTOM] 
export const MARGINS = {
    left:60,
    top:30,
    right:30,
    bottom:40
}
export const AXIS_LABEL_SPACE = 40; 

export const AXIS_OPTS_DEFAULT:AxisOpts = {
    xScaleDomain:[0,19],
    yScaleDomain:[0,50], 
    yAxisLabel:"",
    xAxisLabel:"",
    margins:MARGINS,
    xAxisList:YEARS,
    hasHorizontalLines:true,
    hasVerticalLines:true,
    xTickFormat:(x)=>{
        return x
    },
    yTickFormat:(x)=>{
        return x
    },
    xScaleFn:(xDomain, width)=>{
        return d3.scaleTime()
            .rangeRound([0, width]); 
    },
    yScaleFn:(yDomain, height)=>{
        return d3.scaleLinear()
            .rangeRound([height, 0]);
    },
    yTickerOuterSize:5, 
    xTickerOuterSize:5
}


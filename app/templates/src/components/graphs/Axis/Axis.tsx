import * as React from 'react';
import { AXIS_OPTS_DEFAULT, MARGINS, YEARS } from './config';
import * as d3 from 'd3';


export interface Margins{
    top:number;
    left:number;
    bottom:number;
    right:number;
}

export interface AxisOpts{
}

export interface AxisProps{
    // axisOpts:AxisOpts
    /**
     * The horizontal domain values of the axis
     */
    xScaleDomain?:any[];

    /**
     * The vertical domain values of the axis
     */
    yScaleDomain?:any[]; 

    /**
     * The label describing the values of the vertical axis
     */
    yAxisLabel?:string;

    /**
     * The label describing the values of the horizontal axis
     */
    xAxisLabel?:string;

    /**
     * The margins from which the axis will start to be drawn
     * this is to ensure there is space for the tick labels
     */
    margins?:Margins;

    /**
     * True if axis should render horizontal lines inside the graph
     */
    hasHorizontalLines?:boolean;

    /**
     * True if axis should render vertical lines inside the graph
     */
    hasVerticalLines?:boolean;

    /**
     * The function that will generate the xScale
     */
    xScaleFn:(xDomain:number[], width:number)=>any;


    /**
     * The function that will generate the yScale
     */
    yScaleFn:(yDomain:number[], height:number)=>any;

    /**
     * The function that will generate x axis tick label
     */
    xTickFormat?:(x)=>string;

    /**
     * The function that will generate y axis tick label
     */
    yTickFormat?:(x)=>string;    

    /**
     * The size in pixels of the first and last tick in a graph for the x axis
     */
    yTickerOuterSize?:number; 

    /**
     * The size in pixels of the first and last tick in a graph for the y axis
     */
    xTickerOuterSize?:number; 

    /**
     * The size in pixels of the first and last tick in a graph for the x axis
     */
    yTickerInnerSize?:number; 
    
    /**
     * The size in pixels of the first and last tick in a graph for the y axis
     */
    xTickerInnerSize?:number; 
}

export interface AxisState{

}


export class Axis<T extends AxisProps, V> extends React.Component<T,V>{
    canvas:d3.Selection<any, any, any, any>;
    axisCanvas:d3.Selection<any, any, any, any>;
    rect:d3.Selection<any, any, any, any>;
    svg:d3.Selection<any, any, any, any>;
    xScale:d3.ScaleLinear<any,any>;
    yScale:d3.ScaleLinear<any,any>;
    xAxisGroup:d3.Selection<any, any, any, any>;
    yAxisGroup:d3.Selection<any, any, any, any>;
    ryAxisGroup:d3.Selection<any, any, any, any>;
    yAxisLabel:d3.Selection<any, any, any, any>;
    ryAxisLabel:d3.Selection<any, any, any, any>;
    xAxisLabel:d3.Selection<any, any, any, any>;
    adjustedWidth:number;
    adjustedHeight:number;
    ryScale:any;
    data:any;
    graphType:string;
    yCall:any; 
    xCall:any; 

    constructor(props, initialState, margins){
        super(props)
        this.state = initialState;
    }

    /**
     * initialise graph options to use defaults when not provided
     */
    public static defaultProps: Partial<AxisProps> = {
        xScaleDomain:[0,19],
        yScaleDomain:[0,50], 
        yAxisLabel:"",
        xAxisLabel:"",
        margins:MARGINS,
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
        xTickerOuterSize:5,
        yTickerInnerSize:5,
        xTickerInnerSize:5
    };

    /**
     * This function draws the initial x & y axis also appends x & y axis labels
     * @param {el:HTMLElement} Graph container element
     */
    _renderAxis=(el:HTMLElement) =>{
        let axisOpts = this.props;
        let bb = el.getBoundingClientRect(); 

        // CALCULATE ADJUSTED WIDTH 
        this._generateAdjustedDimensions(bb);

        // ATTACH SCALES TO INSTANCE 
        this._updateScales();
        this._updateTickCalls();

        // CREATE SVG ELEMENT
        this.svg = d3.select(el)
            .append('svg')
            .attr('height',bb.height)
            .attr('width',bb.width);

        // CREATE SVG CANVAS
        this.canvas = this.svg
            .append('g')
            .attr('class','canvas')
            .attr('transform','translate('+[axisOpts.margins.left,axisOpts.margins.top]+')');
        
        this.axisCanvas = this.canvas
            .append("g")
            .attr("class", "axis-canvas")

        let self = this; 

        // append y axis group and add the ticks
        this.yAxisGroup = this.axisCanvas.append('g')
            .attr('class','axis y')
            // .call(this.yCall);

        // select all ticks in y axis and add data-attribute
        this.yAxisGroup.selectAll('.tick')
            .attr('data-tick', (d,k) => {
                return 'ty'+k;
            });

        // append x axis group and add the ticks
        this.xAxisGroup = this.axisCanvas.append('g')
            .attr('class','axis x')
            .attr('tranform','translate('+[0,40]+')')
            // .call(this.xCall);

        this._updateAxis();
    }

    _updateAxis = ()=>{
        let axisOpts = this.props;

        this.yAxisGroup
            .call(this.yCall);

        this.yAxisGroup
            .selectAll(".tick text")
            .attr("dx", -20);

        this.xAxisGroup
            .attr('transform','translate('+[0,this.adjustedHeight]+')')
            .call(this.xCall);
    }

    _updateTickCalls=()=>{
        let axisOpts = this.props; 

        this.yCall = d3.axisLeft(this.yScale);

        this.yCall
            .tickFormat(axisOpts.yTickFormat)
            .tickSizeOuter(axisOpts.yTickerOuterSize)
            .tickSizeInner(axisOpts.yTickerInnerSize);

        this.xCall = d3.axisBottom(this.xScale);

        this.xCall
            .tickFormat(axisOpts.xTickFormat)
            .tickSizeOuter(axisOpts.xTickerOuterSize)
            .tickSizeInner(axisOpts.xTickerInnerSize);

        if(axisOpts.hasVerticalLines){
            this.xCall = this.xCall.tickSizeInner( -this.adjustedHeight );
        }

        if(axisOpts.hasHorizontalLines){
            this.yCall = this.yCall.tickSizeInner( -this.adjustedWidth );
        }
    }

    _updateScales = ()=>{
        this.xScale = this.props.xScaleFn(this.props.xScaleDomain, this.adjustedWidth);
        this.yScale = this.props.yScaleFn(this.props.yScaleDomain, this.adjustedHeight);
    }

    _rotateTicks = (tickGroup:any, degree:number, textAnchor:string = 'middle', dy:number = 0)=>{
        tickGroup.selectAll(".tick text")
            .attr('transform','rotate(' + degree + ')')
            .style('text-anchor','middle')
            .attr("dy",dy); 
    }

    _generateAdjustedDimensions = (boundingBox:any)=>{
        let margins = this.props.margins;

        this.adjustedWidth = boundingBox.width - margins.left - margins.right;  
        this.adjustedHeight = boundingBox.height - margins.top - margins.bottom;         
    }

    _onResize = ()=>{
        

    }

}
import * as React from 'react';
import * as ReactDOM from 'react-dom'; 
import { AxisOpts, Axis, AxisProps } from '../Axis/Axis';
import { GraphCanvas } from '../GraphCanvas/GraphCanvas';
import * as d3 from 'd3';


export interface LineGraphDataItem{
    label:string|Date; 
    value:any;
}


export interface LineGraphItem{
    key:string;
    label:string; 
    data:LineGraphDataItem[];
}


export interface LineGraphProps extends AxisProps{  
    data:LineGraphItem[];
    className?:string;
}

export interface LineGraphState{ 
}

const initialState = {}

declare var jQuery;

export class LineGraph extends Axis<LineGraphProps, LineGraphState>{
    graphCanvas:HTMLDivElement;
    lineFn: d3.Line<[number, number]>; 
    lineGroups: any; 
    constructor(props:LineGraphProps){
        super(props,initialState,null); 
        this.state = {
        };

        jQuery(window).on("resize", this.onResize);
    }

    componentDidMount(){
        this._renderAxis(this.graphCanvas);
        
        if(this.props.data){
            this.drawGraph();
            this.setState({
                data:this.props.data
            })
        }
    }
    
    componentDidUpdate(prevProps:LineGraphProps, prevState:LineGraphState){
        if(prevProps.data.length !== this.props.data.length){
            console.log("proos",this.props.data)
            this.updateLines();
        }
    }
    
    drawGraph = ()=>{
        this.lineFn = d3.line()
            .x((e:any)=>{
                return this.xScale(e.label)
            })
            .y((e:any)=>{
                return this.yScale(e.value)
            })

        let bottomLineFn = d3.line()
            .x((e:any)=>{
                return this.xScale(e.label); 
            })
            .y((e:any)=>{
                return this.yScale(0); 
            })

        this.lineGroups = this.canvas 
            .selectAll(".line")
            .data(this.props.data)
            .enter()
                .append("g")
                .attr("class", "line-group");

        this.lineGroups
            .append("path")
            .attr("class", (e, i)=>{
                return "line line-"+i 
            })
            .attr("d", (e)=>{
                return bottomLineFn(e.data)
            })
            .transition()
            .duration(1000)
            .delay(400)
            .attr("d", (e)=>{
                return this.lineFn(e.data)
            })
    }

    updateLines = ()=>{
        let bottomLineFn = d3.line()
            .x((e:any)=>{
                return this.xScale(e.label); 
            })
            .y((e:any)=>{
                return this.yScale(0); 
            })

        this.canvas 
            .selectAll(".line")
            .data(this.props.data)
            .exit()
                .transition()
                .duration(600)
                .attr("d", (e:any)=>{
                    return bottomLineFn(e.data);
                })
                .style("opacity", 0)
                .remove();

        this.lineGroups = this.canvas
            .selectAll(".line")
            .enter()
                .append("g")
                .attr("class", "line-group")
    }

    resizeLines = ()=>{
        this.lineFn = d3.line()
            .x((e:any)=>{
                return this.xScale(e.label)
            })
            .y((e:any)=>{
                return this.yScale(e.value)
            })
            
        this.lineGroups
            .selectAll("path.line")
            .attr("d", (e)=>{
                return this.lineFn(e.data)
            })
    }

    onResize = ()=>{
        let bb = this.graphCanvas.getBoundingClientRect(); 
        this._generateAdjustedDimensions(bb); 
        this._updateScales(); 
        this._updateTickCalls();
        this._updateAxis();
        this.resizeLines();

        this._onResize();
    }

    render(){
        let props = this.props, 
            state = this.state, 
            cls = props.className && props.className || "";

        return (
            <div className={"line-graph " + cls}>
                <GraphCanvas className="line-graph__canvas" 
                    refEl={ e => this.graphCanvas = e }
                />
            </div>
        )
    }

}


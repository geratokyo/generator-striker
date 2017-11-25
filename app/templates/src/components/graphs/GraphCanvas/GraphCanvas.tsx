import * as React from 'react';



export interface GraphCanvasProps{
    className?:string;
    refEl:(el:HTMLDivElement)=>void
}

export const GraphCanvas:React.SFC<GraphCanvasProps> = (props)=>{
    let cls = props.className || ""; 
    return (
        <div className={"graph-canvas " + cls}
            ref={(e)=>{ props.refEl(e) }}>
            {
                props.children
            }
        </div>
    )
}
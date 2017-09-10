import * as React from 'react'; 
import { IS_MOBILE } from '../../../config';


export interface ButtonProps{
    label:string|JSX.Element; 
    onClick:(e:any)=>void;
    className?:string;
}

export class Button extends React.Component<ButtonProps, any>{
    constructor(props:ButtonProps){
        super(props);
    }
    
    onClick = (e:React.SyntheticEvent<any>)=>{
        e.preventDefault();
        this.props.onClick(e);
    }

    render(){
        let props = this.props;
        let cls = props.className || ""; 
        return (
            <div className={"btn-action " + cls} onClick={this.onClick} >
                <div className="btn-label">
                    {props.label}
                </div>
            </div>
        )
    }
}


export interface LinkButtonProps{
    label:string; 
    className?:string;
    href:string;
}

function redirectTo(e:React.SyntheticEvent<any>){
    if(IS_MOBILE){
        let el:HTMLAnchorElement = e.currentTarget as HTMLAnchorElement; 
    
        window.location.href = el.href;
    }
}
export function LinkButton(props:LinkButtonProps){

    let cls = props.className || ""; 
    return (
        <a href={props.href || ""} className={"btn-action " + cls} onTouchStart={redirectTo}>
            <div className="btn-label">
                {props.label}
            </div>
        </a>
    )
}


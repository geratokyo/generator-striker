import * as React from 'react';
import VerticalAligner from '../VerticalAligner/VerticalAligner';
export interface DialogProps{
    onClose?:Function;
    className?:string;
}

export interface DialogState{
}

export class Dialog extends React.Component<DialogProps,DialogState>{
    constructor(props:DialogProps){
        super(props); 
    }
    
    // shouldComponentUpdate(props:DialogProps,state:DialogState){
    //     return props.visible !== this.props.visible ||
    //         props.title !== this.props.title;
    // }
    

    onClose = ()=>{
        let el:HTMLDivElement = this.refs['backdrop'] as HTMLDivElement; 
        let el1:HTMLDivElement = this.refs['content-wrapper'] as HTMLDivElement; 
        el.classList.remove("animated", "fadeIn");
        el1.classList.remove("animated", "fadeInUp");

        el.classList.add("animated", "fadeOut")
        el1.classList.add("animated", "fadeOutDown")
        setTimeout(()=>{
            this.props.onClose()
        },700)
    }

    render(){
        let clz = this.props.className || '';
        return (
            <div className={"dialog-container " + clz}>
                <div className="dialog-backdrop animated fadeIn" 
                    onClick={ this.onClose }
                    ref="backdrop"></div>
                <VerticalAligner>
                    <div className="dialog-content-wrapper animated fadeInUp"
                        ref="content-wrapper">
                        <div className="close-button-container close-button" onClick={ this.onClose }>
                            <i className="icon-close"></i>
                        </div>
                        <div className="content-wrapper">
                            <VerticalAligner>
                                <div className="content-container">
                                    {this.props.children}
                                </div>
                            </VerticalAligner>
                        </div>
                    </div>
                </VerticalAligner>
            </div>
        );
    }
}
import * as React from 'react';
import * as Promise from 'bluebird';
import VerticalAligner from '../VerticalAligner/VerticalAligner';
export interface DialogProps {
    close?: () => void;
    className?: string;
}

export interface DialogState {
}

export class Dialog extends React.Component<DialogProps, DialogState>{
    backdropEl: HTMLDivElement;
    contentWrapperEl: HTMLDivElement;

    constructor(props: DialogProps) {
        super(props);
    }

    close = (ev?:React.SyntheticEvent<any>) => {
        return new Promise((res, rej) => {
            this.animteExit(); 

            setTimeout(() => {
                if(ev){
                    rej(new Error("dialog rejected"))
                }else{
                    res(true);
                }

            }, 700)
        })
    }

    animteExit = ()=>{
        this.backdropEl.classList.remove("animated", "fadeIn");
        this.contentWrapperEl.classList.remove("animated", "fadeInUp");

        this.backdropEl.classList.add("animated", "fadeOut");
        this.contentWrapperEl.classList.add("animated", "fadeOutDown");
    }

    render() {
        let clz = this.props.className || '';
        return (
            <div className={"dialog " + clz}>
                <div className="dialog__backdrop animated fadeIn"
                    onClick={this.props.close}
                    id="DialogBackdrop"
                    ref={e => this.backdropEl = e}></div>
                <VerticalAligner>
                    <div className="dialog__wrapper animated fadeInUp"
                        ref={e => this.contentWrapperEl = e}>
                        <div className="dialog__close-button" 
                            id="DialogCloseButton"
                            onClick={this.props.close}>
                            <i className="icon-close"></i>
                        </div>
                        <main className="dialog__content">
                            {this.props.children}
                        </main>
                    </div>
                </VerticalAligner>
            </div>
        );
    }
}

export interface DialogNormalLayoutProps {
    className?: string;
}

export const DialogNormalLayout: React.SFC<DialogNormalLayoutProps> = (props) => {
    let cls = props.className || "";
    return (
        <div className={"dialog-layout container-fluid " + cls}>
            {props.children}
        </div>
    )
}
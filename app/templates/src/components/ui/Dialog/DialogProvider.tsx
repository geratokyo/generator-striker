
import {Dialog,DialogProps} from './Dialog'; 
import * as React from 'react'; 
import * as Promise from 'bluebird'; 
import * as ReactDOM from 'react-dom'; 

export class DialogProvider{
    el:HTMLElement; 
    constructor(el?:HTMLElement){
        if (!el){
            el = document.createElement('div');
            el.className = 'dialog-service-wrapper'; 
            document.querySelector('body').appendChild(el); 
        }
        this.el = el; 

    }

    show = (content:(resolve,reject)=>React.ReactElement<any>,dialogProps?:DialogProps)=>{
        this.el.classList.add("shown")
        return new Promise((resolve,reject)=>{
            var props = {
                ...dialogProps,
                visible:true,
                onClose:this.hide
            };
            ReactDOM.render(
                <Dialog {...props}>
                    {content(resolve,reject)}
                </Dialog>,
                this.el)
        }); 
    }

    hide = () =>{
        this.el.classList.remove("shown")
        this.el.innerHTML = "";
    }
}
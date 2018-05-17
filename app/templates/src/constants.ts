import { DialogProvider } from './components/ui/Dialog/DialogProvider';
import { Translation } from './models/models';
export const START_MASK     	= 0xFF00000; 
export const APP_START      	= 0x0100000;
export const CONTENT_MANAGER_START   = 0x0200000;


export function ofType(actionType:number,list:number[]){
    let okay = false;  
    for(var i=0;i<list.length;i++){
        if ((actionType & list[i])>0){
            okay = true;
            break;
        } 
    }
    return okay; 
}

export const PAGES = {
    SPLASH:0,
}

export const DP = new DialogProvider();

/**
 * Functions that will check the screen width 
 */
export var SCREEN_WIDTH = {
    IS_SMALL: ()=>{ return window.innerWidth <= 560},
    IS_MEDIUM: ()=>{ return window.innerWidth > 560 && window.innerWidth <= 992},
    IS_LARGE: ()=>{ return window.innerWidth > 992}
}

/**
 * Function to format number display
 */
export const NUMBER_FORMAT_FUNCTION= {
    numberWithCommas: (x)=>{
        let s = ",";
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, s);
    },
    currencyNumber: (x, symbol)=>{
        x=parseInt(x).toFixed(0);
        return x === "£-" ? "N/A": (x < 0 ? "-":"") + symbol + Math.abs(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }, 
    decimal:(x, decimalPoints)=>{
        return parseFloat(x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")).toFixed(decimalPoints);
    }, 
    percent:(x)=>{
        x = x*100;
        return (x).toFixed(x < 1 ? 2 : 0) + "%";
    },
    seCurrency:(x, symbol)=>{
        x=parseInt(x).toFixed(0);
        return x === "£-" ? "N/A": (x < 0 ? "-":"+") + symbol + Math.abs(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
}

/*************************/
/////// CUSTOM CODE /////// 
/*************************/

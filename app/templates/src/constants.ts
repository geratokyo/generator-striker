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

/*************************/
/////// CUSTOM CODE /////// 
/*************************/

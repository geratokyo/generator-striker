
import { Dictionary, Translation, INIT_TRANSLATIONS } from '../../models/models'; 
import { ControllerProps } from 'strikejs-react';
import { DataService } from '../../services/DataService';
export const STATE_KEY = 'app';

export interface AppProps extends ControllerProps<AppState> {
	componentName:string;
	isMobile:boolean; 
	injector:any;
	dataService:DataService;
}
export enum WINDOW_VIEWS {
	SPLASH, 
	CONTENT
}

export interface AppState{
	locale:Translation;
}
export const AppInitState:AppState = {
	locale: INIT_TRANSLATIONS,
}

export interface inAppState{
	currentView:WINDOW_VIEWS;
}

export const inAppInitialState:inAppState = {
	currentView:WINDOW_VIEWS.SPLASH
}


export const STATES = {
	embedVisible:"embedVisible",
	infoVisible:"infoVisible"
}
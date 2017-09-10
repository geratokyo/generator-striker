import {
		APP_START
	} from '../../constants'; 
import {TYPES} from './Actions'; 
import {STATES, AppState} from './StateAndProps';
import { Action,IManagedState } from 'strikejs-react';



export function Reducer(state:IManagedState<AppState>,action:Action):any{

	switch (action.type) {
		case TYPES.DATA_LOADED:
			state.$set("locale", action.data.locale);	
		break;
	}

}



import {
		<%= uSnakeCName %>_START
	} from '../../constants'; 
import {TYPES} from './Actions'; 
import { <%= uCamelCName %>State} from './StateAndProps';
import { Action,IManagedState } from 'strikejs-react';



export function Reducer(state:IManagedState<<%= uCamelCName %>State>,action:Action):any{

	switch (action.type) {
	}

}



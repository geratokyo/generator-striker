import * as React from 'react'; 
import {Reducer} from './Reducer';
import { createControllerView } from 'strikejs-react';
import { <%= uCamelCName %>Props, in<%= uCamelCName %>State, in<%= uCamelCName %>InitialState, <%= uCamelCName %>InitState } from './StateAndProps';
import { ACTIONS, TYPES } from './Actions';


export const STATE_KEY = '<%= camelCName %>';

class <%= uCamelCName %>Controller extends React.Component<<%= uCamelCName %>Props,in<%= uCamelCName %>State>{
    this.el:HTMLDivElement; 
    constructor(props){
        super(props);
        this.state = in<%= uCamelCName %>InitialState;
    }

    componentDidMount(){
    }

    render(){
        let state = this.state, 
            props = this.props;
        
        return (
            <div className="<%= kebabCName %>" ref={ e => this.el = e}>
            </div>
        ); 
    }
};

export const <%= uCamelCName %> = createControllerView({
    reducer:Reducer, 
    propsToPropagate:['dataService'], 
    initialState:<%= uCamelCName %>InitState, 
    stateKey:STATE_KEY, 
    component:(function(){
        return <%= uCamelCName %>Controller
    }()),
}); 
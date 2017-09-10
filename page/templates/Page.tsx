import * as React from 'react'; 


export interface <%= uCamelCName %>Props{
    className?:string;
}

export interface <%= uCamelCName %>State{

}

export class <%= uCamelCName %> extends React.Component<<%= uCamelCName %>Props, <%= uCamelCName %>State>{
    constructor(p:<%= uCamelCName %>Props){
        super(p);
    }

    render(){
        let props = this.props, 
            state = this.state,
            cls = this.props.className || "";
        return (
            <div className={"<%= kebabCName %> " + cls}  ref="<%= kebabCName %>-element">
                
            </div>
        )
    }
}
import * as React from 'react'; 
import { Translation } from '../../../models/models';
import { SHOW_INFO_DIALOG,SHOW_EMBED_DIALOG } from '../Dialog/Utils';

var jQuery = require("jquery");


export interface SocialButtonsProps{
    locale:Translation;

}

export interface SocialButtonsState{
    twitterLink:string; 
    facebookLink:string; 
}

export class SocialButtons extends React.Component<SocialButtonsProps, SocialButtonsState>{
    constructor(props:SocialButtonsProps){
        super(props);
        this.state = {
            twitterLink:"", 
            facebookLink:""
        }
    }

    componentDidMount(){
        let tw = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(jQuery('meta[name="twitter:description"]').attr('content')), 
            fb = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL);
        
        this.setState({twitterLink:tw, facebookLink:fb});
        this.forceUpdate();
    }

    onEmbedClick = () =>{
        SHOW_EMBED_DIALOG(this.props.locale)
    }

    onInfoClick = () =>{
        SHOW_INFO_DIALOG(this.props.locale)
    }

    render(){
        let props = this.props, 
            state = this.state; 

        return (
            <div className="social-buttons-container">
                <a className="share-button facebook hide-on-embed inverted" href={state.facebookLink} target="_blank">
                    <i className="icon-facebook"></i>
                </a>
                <a className="share-button twitter hide-on-embed inverted" href={state.twitterLink} target="_blank">
                    <i className="icon-twitter"></i>
                </a>
                <div className="share-button embed hide-on-embed inverted" onClick={this.onEmbedClick}>
                    <i className="icon-embed"></i>
                </div>
                <div className="share-button info" onClick={this.onInfoClick}>
                    <i className="icon-info"></i>
                </div>        
            </div>
        )
    }
}
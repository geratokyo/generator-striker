import * as React from 'react'; 
import { Translation } from '../../../models/models';
import { Button } from '../Button/Button';
import { RES_URL } from '../../../config';
import VerticalAligner from '../VerticalAligner/VerticalAligner';

declare var jQuery;
export interface EmbedCodeProps{
    embedded?:string;
    locale:Translation;
    height:number;
}

export interface EmbedCodeState{
}

export class EmbedCode extends React.Component<EmbedCodeProps, EmbedCodeState>{
    constructor(props:EmbedCodeProps){
        super(props);
        this.state = {}
    }

    onCopyToClipboard(evt:any){
        let a:any = jQuery('.embed-textarea').get(0);
		a.select();
		try{
			document.execCommand && document.execCommand('copy');
		}catch(err){

		}
    }

    render(){
        let props = this.props; 
        let specificHash = "#/embed";
        
        //make sure url has no hash and other vars
        let url = (document.URL).split("#")[0];

        url += specificHash;
        let campaignName = props.locale.campaignName.split(" ").join("-").toLocaleLowerCase();
        let a: string = [
            '<div class="<%= appname %>" style="width:100%;height:',props.height,'px;margin:0 auto;background:#fff;position:relative;">',
                '<iframe data-url="',url,'" src="',url,'" style="position:absolute;top:0;left:0;width:100%;height:100%; border:1px solid #ccc;"></iframe></div>',
                '<div class="meframe"></div>',
                '<br/>',
                '<div>',
                    '<a href="',(document.URL).split("#")[0],'" target="_blank">',props.locale.campaignName,'</a> by ',
                    '<a href="',props.locale.clientUrl,'" target="_blank">',props.locale.clientTitle,'</a>',
                '</div>',
            '</div>',
            '<br/>'].join("");

        return (
            <div className="embed-code-container">                    
                <div className="embed-copy-container">
                    <p>{props.locale.embedCopy}</p>
                </div>
                
                <textarea readOnly={true} className="embed-textarea center" value={a}/>
                    <div className="button-wrapper center">
                        <Button 
                            className="embed-copy-btn main black-text"
                            onClick={this.onCopyToClipboard}>
                            {props.locale.copyToClipboard}
                        </Button>
                    </div>
            </div>
        )
    }
}
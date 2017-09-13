import * as React from 'react'; 
import { RES_URL } from '../../config';
import { Translation } from '../../models/models';

export interface SplashScreenProps{
    visible:boolean; 
    className?:string;
    locale:Translation;
}

export interface SplashScreenState{

}


export class SplashScreen extends React.Component<SplashScreenProps, SplashScreenState>{

    constructor(props:SplashScreenProps){
        super(props); 
    }

    render(){
        let cls = this.props.className || "";
        return (
            <div className={"splashscreen-container " + cls}
                data-visible={this.props.visible}>
                <a href={this.props.locale.clientUrl} target="_blank" className="client-logo-container hide-on-embed">
                    <img src={RES_URL + "img/client-logo.svg"} alt="" className="client-logo"/>
                </a>

                <table className="table-container">
                    <tbody>
                        <tr>
                            <td>
                                <div className="row">
                                    {this.props.children}
                                </div>
                            </td>
                        </tr>
                        <tr className="row-spacer">
                            <td>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        )
    }
}
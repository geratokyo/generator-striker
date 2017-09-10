import * as React from 'react'; 
import {Reducer} from './Reducer';
import { createControllerView } from 'strikejs-react';
import { Dialog } from '../../components/ui/Dialog/Dialog';
import { SplashScreen } from '../../components/pages/Splashscreen/Splashscreen';
import { Button } from '../../components/ui/Button/Button';
import { AppProps, inAppState, WINDOW_VIEWS, inAppInitialState, AppInitState } from './StateAndProps';
import { ACTIONS, TYPES } from './Actions';
import { SocialButtons } from '../../components/ui/SocialButtons/SocialButtons';
import { DialogProvider } from '../../components/ui/Dialog/DialogProvider';
import { SHOW_INFO_DIALOG } from '../../components/ui/Dialog/Utils';
import * as _ from 'lodash';
import { Footer } from '../../components/ui/Footer/Footer';
import { RES_URL } from '../../config';


export const STATE_KEY = 'app';

class AppController extends React.Component<AppProps,inAppState>{
    DP:DialogProvider; 
    constructor(props){
        super(props);
        this.state = inAppInitialState;
        this.DP = new DialogProvider();
    }

    componentDidMount(){
    }

    hideSplashScreen = ()=>{
        this.setState({currentView:WINDOW_VIEWS.CONTENT});
    }

    render(){
        let state = this.state, 
            props = this.props,
            locale = this.props.data.locale;
        
        return (
            <div className="app-container">
                <div className="app-content-container">
                    <div className="splashscreen-wrapper"
                        ref="splashscreen">
                        {
                            this.props.dataService.isDataLoaded && 
                            ( <SplashScreen 
                                locale={locale}
                                visible={state.currentView === WINDOW_VIEWS.SPLASH}>
                            </SplashScreen>)
                        }
                    </div>
                </div>
                <Footer 
                    locale={locale}/>   
            </div>
        ); 
    }
};



export const App = createControllerView({
    reducer:Reducer, 
    propsToPropagate:['dataService'], 
    initialState:AppInitState, 
    stateKey:STATE_KEY, 
    component:(function(){
        return AppController
    }()),
}); 
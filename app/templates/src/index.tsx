import {Router,hashHistory,IndexRoute,Route} from 'strikejs-router'; 
import {createStore} from 'strikejs-react'; 
import * as React from 'react'; 
import * as ReactDOM from 'react-dom'; 
import { App } from './controllers/App/App';
import { DataService } from './services/DataService';
import { ACTIONS as APP_ACTIONS } from './controllers/App/Actions';
import { DialogProvider } from './components/ui/Dialog/DialogProvider';
import { IS_MOBILE, IS_EMBED } from './config';

declare var jQuery;

(function(){

    let hash = hashHistory(); 
    let store = createStore({
        ready:true,
        trackChanges:false
    }); 

    function Container(props){
        return props.children; 
    }

    let DS = new DataService(store);

    jQuery("#SiteDeeplink").addClass("hide");

    if(IS_EMBED){
        jQuery("body").addClass("embed");
    }

    if(IS_MOBILE){
        jQuery("body").addClass("mobile");
    }

    ReactDOM.render(
        <Router history={hash}>
            <IndexRoute component={App} props={{dataService:DS,store}}>
            </IndexRoute>
            <Route component={App} path={"/embedCode"} props={{ dataService: DS, store }}></Route>
            <Route component={App} path={"/embed"} props={{ dataService: DS, store }}></Route>
        </Router>
    ,document.getElementById('SiteContainer'),()=>{
        DS.load().then((data)=>{
            store.dispatch(APP_ACTIONS.DATA_LOADED(data));
        })
    }); 

}()); 

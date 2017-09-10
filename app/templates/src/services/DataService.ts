import {IStore} from 'strikejs-react';
import {ACTIONS} from '../controllers/App/Actions';
import {Translation} from '../models/models';
import {FIREBASE_CONF} from '../config';

var jQuery = require("jquery");
declare var firebase;

export class DataService{
    app:any;
    database:any; 
    translations:Translation;
    locale:string;
    def:any;
    store:IStore;
    data:any;
    isDataLoaded:boolean;

    constructor(store: IStore){
        this.store = store;
        let w: any = window;
        this.locale = w.__LOCALE__; 
        this.def = jQuery.Deferred();

        var config : any = FIREBASE_CONF;
        this.app = firebase.initializeApp(config);
        this.database = this.app.database();
        this.isDataLoaded = false;
    }


    load(){
        this.database.ref("/"+this.locale).on("value",
            (e: any)=>{
                this.data = e.val() as any;

                this.isDataLoaded = true;
                this.def.resolve(this.data); 
            }
        )
        return this.def.promise();
    }

    getByKey = (key:string)=>{
        return this.data[key];
    }

    getNavBar = ()=>{
        return this.data.navBar; 
    }

    getLocale= ()=>{
        return this.data.locale; 
    }
    
    getData(){
        return this.data;
    }

    static factory(store:IStore){
        return new DataService(store);
    }

    static $inject = ['store'];
}
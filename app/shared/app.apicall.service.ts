import { Injectable } from '@angular/core';
import { HTTP_PROVIDERS,Http,Response, Headers,RequestOptions} from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ApiCallClass } from './apicall.model';

import Config = require("../app.config");

@Injectable()
export class ServerApi{
   
    constructor(private http:Http,private router:Router){}

         
    callApi(data): Observable<any> {
        

            if(data[0].method=="POST")
            {
                let headers = new Headers({ 'Content-Type': 'application/json'});
                
                let options = new RequestOptions({ headers: headers });
                try{return this.http.post(Config.ConfigObj.server+"/postCall",{data:data[0]},options)
                                .map(this.extractData);       
                }
                catch(e){
                    alert("post exception:"+e.message);
                }    
            }
            else {

                    let observableBatch = [];
                    try{
                        data.forEach(( componentarray, inx ) => {
                          
                            var str = Object.keys(componentarray).map(function(key){
                                       return encodeURIComponent(key) + '=' + encodeURIComponent(componentarray[key]);
                                       }).join('&');
                            observableBatch.push( this.http.get( Config.ConfigObj.server+"/getCall?"+str).map(this.extractData) );
                        });
                    }
                    catch(e){
                        alert("eception:"+e.message);
                    }
                    return Observable.forkJoin<any>(observableBatch);
                }

    }
    private extractData(res: Response) {
        let body = res.json();
        window.localStorage.setItem("auth_key",body.sessionID);
        return body || { };
    }
    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
      //  alert("errMsg:"+errMsg);
      //  return Observable.throw(errMsg);
   }
   
}
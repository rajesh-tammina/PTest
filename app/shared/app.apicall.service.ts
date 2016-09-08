import { Injectable } from '@angular/core';
import { HTTP_PROVIDERS,Http,Response, Headers,RequestOptions} from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/RX';
import { ApiCallClass } from './apicall.model';

import Config = require("../app.config");

declare var $:any;
var expiredTime,eventTime;
var $modal = $('<div class="modal fade" id="myModal" tabindex="-1" '+
                ' role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" > '+
                ' <div class="modal-dialog modal-sm">'+
                ' <div class="modal-content">'+
                ' <div class="modal-header">'+
                // '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
                '<h4 class="modal-title" id="myModalLabel">Session Expired</h4>'+
                '</div>'+
                '<div class="modal-body-popup">'+
                '<p>Your Session will be expired in 2 minutes.Are you sure want to continue? </p>'+
                '</div>'+
                  '<div class="modal-footer">'+
                  '<button id="success" type="button" class="btn btn-success" >Yes</button>'+
                //   '<button id="reject" type="button" class="btn btn-primary" >No</button> '+
                   '</div>'+
              '</div>'+
        ' </div>'+
      '</div>'
);
@Injectable()
export class ServerApi{
  
     newSessionId;
     sessionOutTime;
    constructor(private http:Http,private router:Router){}


    callAuthApi(data): Observable<any> {
        

            if(data[0].method=="POST")
            {
                let headers = new Headers({ 'Content-Type': 'application/json'});
                
                let options = new RequestOptions({ headers: headers });
                try{return this.http.post(Config.ConfigObj.server+"/authPost",{data:data[0]},options)
                                .map(this.extractAuthData).share();       
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
                            observableBatch.push( this.http.get( Config.ConfigObj.server+"/authGet?"+str).map(this.extractAuthData).share() );
                            //.subscribe(data => { alert(data);},  this.handleError,  () => console.log('done'))
                     });
                    }
                    catch(e){
                        alert("callAuthApi exception:"+e.message);
                    }
                    return Observable.forkJoin<any>(observableBatch);
                }

        }
    
    extractAuthData(res: Response){
         let body = res.json();
        return body || { };
    }


    //This service is called each time the client tries to hit the server api after login
    callApi(data): Observable<any> {
        
        console.log("call with data:"+JSON.stringify(data));

            if(data[0].method=="POST")
            {
                let headers = new Headers({ 'Content-Type': 'application/json'});
                
                let options = new RequestOptions({ headers: headers });
                try{return this.http.post(Config.ConfigObj.server+"/postCall",{data:data[0]},options)
                                .map(this.extractData).share();       
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

                            observableBatch.push( this.http.get( Config.ConfigObj.server+"/getCall?"+str).map(this.extractData).share() );
                            //.subscribe(data => { alert(data);},  this.handleError,  () => console.log('done'))
                     });
                    }
                    catch(e){
                        alert("post exception:"+e.message);
                    }
                    return Observable.forkJoin<any>(observableBatch);
                }

    }
   public extractData(res: Response) {
      //this.sessionOutTime = 13*1000;
     //   alert(this.sessionOutTime);
       let body = res.json();
       eventTime=body.eventTime;
       window.localStorage.setItem("auth_key",body.sessionID);
     // alert( "extractData body: "+JSON.stringify(body));
       extendExpiration(body,eventTime);
        
       return body || { };
   }
   
 sessionExpiry(){
          sessionExpired();
        }  
}

var popUpDialog = (function ($) {
        'use strict';
                return {
                /**
                 * Opens our dialog
                 * @param message Custom message
                 * @param options Custom options:
                 *                   options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
                 *                   options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
                 */
                show: function () {
                     var pp=setTimeout(() =>
                                {
                                  sessionExpired();
                               
                                },2*60*1000);
                        $modal.find("#success").off('click').on('click', function (e) {
                                var tmpsec = eventTime;
                                extendTime(tmpsec);
                                  clearTimeout(pp);
                                popUpDialog.hide();
                        });
                         $modal.find("#reject").off('click').on('click', function (e) {
                              popUpDialog.hide();
                        });
                        // Opening dialog
                        $modal.modal();
                        
                },
                /**
                 * Closes dialog
                 */
                hide: function () {
                        $modal.modal('hide');
                }
                };

        })($);
function extendExpiration(body,sec){
      // alert( "extendExpiration body: "+JSON.stringify(body));
      //  var str={"sessionID":window.localStorage.getItem("auth_key")};
       if(body.Success+"" == "true"){
         // alert("coming in if");
          clearTimeout(expiredTime);
            expiredTime =  setTimeout(() =>{ 
                     var newtime = new Date().getTime();
                     //console.log("newtime:"+newtime);
                     var oldtime = parseInt(window.localStorage.getItem("currentSec"));
                    // console.log("old----"+oldtime);
                     var diff=newtime-oldtime;
                    // console.log("newtime:"+newtime+"old----"+oldtime+" diff:"+diff);

                     if(diff>=eventTime)
                     {
                               popUpDialog.show(); 
                     }
                     else{
                         // alert("expiredTime else eventTime condition:"+(eventTime-diff));
                          extendTime(eventTime-diff);
                        // extendExpiration({"Success":"true"},(13000-diff));

                     }
                             //alert("coming outside settimeout");
             },parseInt(sec));
       }
       return body;
}

function extendTime(sec){
       
        let xhttp = new XMLHttpRequest();  
        xhttp.open("GET", Config.ConfigObj.server+"/extendTime?sessionID="+window.localStorage.getItem("auth_key"), true);
        xhttp.send();
        xhttp.onreadystatechange = function() {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                        var newSessionId = JSON.parse(xhttp.responseText);
                        newSessionId.Success="true";
                        window.localStorage.removeItem("auth_key");
                        window.localStorage.setItem("auth_key",newSessionId.sessionID);
                        extendExpiration(newSessionId,sec);
                }
                else if(xhttp.status == 400){
                       sessionExpired();
                }
        };
}

function sessionExpired(){
                window.localStorage.removeItem("accountID");
                window.localStorage.removeItem("auth_key");
                window.location.href= "/login/loginForm?status=expired";
              
        }  
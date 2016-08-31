import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router,ActivatedRoute } from '@angular/router';

import { ServerApi } from '../../../shared/app.apicall.service';
import { ApiCallClass } from '../../../shared/apicall.model';
import { SharedService } from '../../PLP/shared/shared/shared-service.service';


@Component({
    selector: 'new-psw',
    templateUrl: './app/modules/login/new-psw/new-psw.layout.html',
    styleUrls: ['./app/modules/login/login.style.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [ ServerApi,SharedService, ApiCallClass ]
})
export class NewPasswordComponent implements OnInit {
    tokendata = {
        stateAbbr:"",
        token:""
    };
    userdata = {
        StateAbbr:"",
        Username:"",
        Password:""
    };
    urlObj;
    section="NewPassword";
    data:ApiCallClass;
    constructor(private router: Router, private server: ServerApi,private shared: SharedService,private apiJson:ApiCallClass,private activeRoute: ActivatedRoute) {

        alert("params are:"+JSON.stringify(this.activeRoute.snapshot.params));
        this.tokendata = {
        stateAbbr:this.activeRoute.snapshot.params.stateAbbr,
        token:this.activeRoute.snapshot.params.token
            };
        this.userdata.StateAbbr=this.activeRoute.snapshot.params.stateAbbr;
        this.userdata.Username=this.activeRoute.snapshot.params.uname;
     }

    ngOnInit() {
        this.urlObj=this.shared.getUrlObject(this.section);
        this.validateToken("");
    }   

    validateToken(cb){
         try{
                this.apiJson.method="GET";
                 
                 this.apiJson.endUrl = this.urlObj.tokenUrl;
                
                let user=JSON.stringify(this.tokendata);
                this.apiJson.data=user;
                alert("this.apiJson:"+JSON.stringify(this.apiJson));
                this.server.callApi([this.apiJson]).subscribe(resp => {
                    if (resp[0].Success + "" == "true") {
                       // this.router.navigate(['./plpcontent']);
                       cb();
                    }
                    else {
                        alert("error occured while authenticating");
                    }
                });
            }
            catch(e){
                alert("login exception:"+e.message);
            }
    }


    sendNewPassword(){

        this.validateToken(this.resetPassword);        
     }

     resetPassword(){
             try{
                this.apiJson.method="POST";
                 
                 this.apiJson.endUrl = this.urlObj.endUrl;
                
                let user=JSON.stringify(this.userdata);
                this.apiJson.data=user;
                alert("this.apiJson:"+JSON.stringify(this.apiJson));
                this.server.callApi([this.apiJson]).subscribe(resp => {
                    if (resp[0].Success + "" == "true") {
                       // this.router.navigate(['./plpcontent']);
                    }
                    else {
                        alert("error occured while authenticating");
                    }
                });
            }
            catch(e){
                alert("login exception:"+e.message);
            }
     }
    
}

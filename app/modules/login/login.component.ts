import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

import { ServerApi } from '../../shared/app.apicall.service';
import { ApiCallClass } from '../../shared/apicall.model';


@Component({
    selector : 'login-element',
    templateUrl : './app/modules/login/login.layout.html',
    styleUrls : ['./app/modules/login/login.style.css'],
    directives : [ ROUTER_DIRECTIVES ],
    providers : [ ServerApi,ApiCallClass ]
})
export class LoginComponent implements OnInit {
    userdata = {
        username: "",
        password: "",
        stateAbbr: "IC"
    };
    data:ApiCallClass;
    constructor(private router: Router, private loginauth: ServerApi,private apiJson:ApiCallClass) { }

    ngOnInit() {

    }

    login() {
      try{
        this.apiJson.method="GET";
        this.apiJson.endUrl="login";
        let user=JSON.stringify(this.userdata);
        this.apiJson.data=user;
        this.loginauth.callApi([this.apiJson]).subscribe(resp => {
            if (resp[0].Success + "" == "true") {
                this.router.navigate(['./plpcontent']);
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

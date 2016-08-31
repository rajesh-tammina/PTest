import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

import { ForgotUserModel } from './forgot-username.model';
import { ServerApi } from '../../../shared/app.apicall.service';
import { ApiCallClass } from '../../../shared/apicall.model';
import { SharedService } from '../../PLP/shared/shared/shared-service.service';

@Component({
    selector: 'forgot-username',
    templateUrl: './app/modules/login/recovery-user/forgot-username.layout.html',
    styleUrls: ['./app/modules/login/login.style.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [ServerApi,ApiCallClass,SharedService]
})
export class UsernameRecoveryComponent implements OnInit {
    userdata={
                stateAbbr:this.shared.getDefaultStateAbbr(),
                email:""
            }
    data:ApiCallClass;
    section="UsernameRecovery";
    constructor(private router: Router, private server: ServerApi,private shared:SharedService,private apiJson:ApiCallClass) { }

    ngOnInit() {

    }

    resetUsername(){
         try{
                this.apiJson.method="GET";
                let urlObj=this.shared.getUrlObject(this.section);
                this.apiJson.endUrl = urlObj.endUrl;
              
                let user=JSON.stringify(this.userdata);
                this.apiJson.data=user;
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

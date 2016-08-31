import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { ForgotPswModel } from './forgot-psw.model';
import { ServerApi } from '../../../shared/app.apicall.service';
import { ApiCallClass } from '../../../shared/apicall.model';
import { SharedService } from '../../PLP/shared/shared/shared-service.service';

@Component({
    selector: 'forgot-psw',
    templateUrl: './app/modules/login/recovery-psw/forgot-psw.layout.html',
    styleUrls: ['./app/modules/login/login.style.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [ ServerApi, ApiCallClass,SharedService ]
})
export class PasswordRecoveryComponent implements OnInit {
    //userdata =new ForgotPswModel();
   userdata={
                    StateAbbr:this.shared.getDefaultStateAbbr(),
                    Username:"",
                    ReturnURL:this.shared.getReturnUrl()
            }
    data:ApiCallClass;
    section="PasswordRecovery";
    constructor(private router: Router, private server: ServerApi,private shared:SharedService,private apiJson:ApiCallClass) { }

    ngOnInit() {

    }

    resetPassword(){
         try{
                this.apiJson.method="POST";
                 let urlObj=this.shared.getUrlObject(this.section);
                 this.apiJson.endUrl = urlObj.endUrl;
                
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

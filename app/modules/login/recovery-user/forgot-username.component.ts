import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import { ControlGroup,Control,Validators,FormBuilder,CORE_DIRECTIVES,FORM_DIRECTIVES,AbstractControl} from '@angular/common';

import { ForgotUserModel } from './forgot-username.model';
import { ServerApi } from '../../../shared/app.apicall.service';
import { ApiCallClass } from '../../../shared/apicall.model';
import { SharedService } from '../../PLP/shared/shared/shared-service.service';
import { CustomValidations } from '../../PLP/shared/shared/common-validation';
import { Utilities } from '../../../shared/utilities.class';
import message = require("../../../shared/messages");

@Component({
    selector: 'forgot-username',
    templateUrl: './app/modules/login/recovery-user/forgot-username.layout.html',
    styleUrls: ['./app/modules/login/login.style.css'],
    directives: [ROUTER_DIRECTIVES,FORM_DIRECTIVES],
    providers: [ServerApi,ApiCallClass,SharedService,Utilities]
})
export class UsernameRecoveryComponent implements OnInit {
    userdata={
                stateAbbr:this.shared.getDefaultStateAbbr(),
                email:""
            }
    data:ApiCallClass;
    public successVal=false;
    errorMessage;
    public errorVal= false;
    section="UsernameRecovery";
    ForgotUserNameForm:ControlGroup;
    constructor(private router: Router, private server: ServerApi,private shared:SharedService,
    private apiJson:ApiCallClass,fb:FormBuilder,private utils:Utilities) {
        this.ForgotUserNameForm = fb.group({
         'email' : ["",Validators.compose([Validators.required,CustomValidations.mailFormat])]
        
   });
   this.errorMessage=message.messages;
     }

    ngOnInit() {

    }

    resetUsername(){
         try{
                this.utils.showLoading();
                this.apiJson.method="GET";
                let urlObj=this.shared.getUrlObject(this.section);
                this.apiJson.endUrl = urlObj.endUrl;
              
                let user=JSON.stringify(this.userdata);
                this.apiJson.data=user;
                this.server.callAuthApi([this.apiJson]).subscribe(resp => {
                    //alert(JSON.stringify(resp));
                    if (resp[0].Result + "" == "true") {
                       // this.router.navigate(['./plpcontent']);
                         this.utils.hideLoading();
                         this.successVal = true;
                               setTimeout(function() {
                                    this.successVal = false;
                                // console.log(this.edited);
                                }.bind(this), 5000);  

                    }
                    else {
                        this.utils.hideLoading();
                         this.errorVal = true;
                               setTimeout(function() {
                                    this.errorVal = false;
                                // console.log(this.edited);
                                }.bind(this), 5000);  
                    }
                },this.utils.handleError);
            }
            catch(e){
                alert("resetUsername exception:"+e.message);
            }
    }
}

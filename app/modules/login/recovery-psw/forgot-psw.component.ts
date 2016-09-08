import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { ControlGroup,Control,Validators,FormBuilder,CORE_DIRECTIVES,FORM_DIRECTIVES,AbstractControl} from '@angular/common';
import { ForgotPswModel } from './forgot-psw.model';
import { ServerApi } from '../../../shared/app.apicall.service';
import { ApiCallClass } from '../../../shared/apicall.model';
import { SharedService } from '../../PLP/shared/shared/shared-service.service';
import { CustomValidations } from '../../PLP/shared/shared/common-validation';
import { Utilities } from '../../../shared/utilities.class';
import message = require("../../../shared/messages");

@Component({
    selector: 'forgot-psw',
    templateUrl: './app/modules/login/recovery-psw/forgot-psw.layout.html',
    styleUrls: ['./app/modules/login/login.style.css'],
    directives: [ROUTER_DIRECTIVES,FORM_DIRECTIVES],
    providers: [ ServerApi, ApiCallClass,SharedService,Utilities ]
})
export class PasswordRecoveryComponent implements OnInit {
    //userdata =new ForgotPswModel();
   userdata={
                    StateAbbr:this.shared.getDefaultStateAbbr(),
                    Username:"",
                    ReturnURL:""
            }
    data:ApiCallClass;
    errorMessage;
    public successVal = false;
    public errorVal =  false;
    section="PasswordRecovery";
    ForgotPasswordForm:ControlGroup;
    constructor(private router: Router, private server: ServerApi,private shared:SharedService,
    private apiJson:ApiCallClass,fb:FormBuilder,private utils:Utilities) {
         this.ForgotPasswordForm = fb.group({
         'Username' : ["",Validators.compose([CustomValidations.noScript,Validators.required])]
        
   });
   this.errorMessage=message.messages;
     }

    ngOnInit() {

    }

    resetPassword(){
         try{
               this.utils.showLoading();
                this.apiJson.method="POST";
                 let urlObj=this.shared.getUrlObject(this.section);
                 this.apiJson.endUrl = urlObj.endUrl;
                this.userdata.ReturnURL=this.shared.getReturnUrl()+"/"+this.userdata.Username+"/"+this.shared.getDefaultStateAbbr()
                let user=JSON.stringify(this.userdata);
                this.apiJson.data=user;
                this.server.callAuthApi([this.apiJson]).subscribe(resp => {
                //  alert(JSON.stringify(resp));
                    if (resp.Result + "" == "true") {
                         this.utils.hideLoading();
                           this.successVal = true;
                               setTimeout(function() {
                                    this.successVal = false;
                                // console.log(this.edited);
                                }.bind(this), 5000);
                       // this.router.navigate(['./plpcontent']);
                    }
                    else {
                         this.utils.hideLoading();
                          this.errorVal = true;
                               setTimeout(function() {
                                    this.errorVal = false;
                                // console.log(this.edited);
                                }.bind(this), 5000);
                       // alert("error occured while authenticating");
                    }
                },this.utils.handleError)
            }
            catch(e){
                alert("resetPassword exception:"+e.message);
            }
    }

   
}

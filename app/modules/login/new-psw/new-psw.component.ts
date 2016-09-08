import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';

import { ControlGroup, Control, Validators, FormBuilder, CORE_DIRECTIVES, FORM_DIRECTIVES, AbstractControl} from '@angular/common';
import { ApiCallClass } from '../../../shared/apicall.model';
import { ServerApi } from '../../../shared/app.apicall.service';
import { SharedService } from '../../PLP/shared/shared/shared-service.service';
import { CustomValidations } from '../../PLP/shared/shared/common-validation';
import { Utilities } from '../../../shared/utilities.class';
import message = require("../../../shared/messages");

@Component({
    selector: 'new-psw',
    templateUrl: './app/modules/login/new-psw/new-psw.layout.html',
    styleUrls: ['./app/modules/login/login.style.css'],
    directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES],
    providers: [ServerApi, SharedService, ApiCallClass, Utilities]
})
export class NewPasswordComponent implements OnInit {
    tokendata = {
        stateAbbr: "",
        token: ""
    };

    userdata = {
        StateAbbr: "",
        Username: "",
        Password: ""
    };

    urlObj;
    section = "NewPassword";
    data: ApiCallClass;
    newPasswordForm: ControlGroup;
    public successVal = false;
    public errorVal = false;
    errorMessage;
    constructor(private router: Router, private server: ServerApi,
        private shared: SharedService, private apiJson: ApiCallClass, private activeRoute: ActivatedRoute, fb: FormBuilder, private utils: Utilities) {
        this.tokendata = {
            stateAbbr: this.activeRoute.snapshot.params.stateAbbr,
            token: router.routerState.queryParams._value.Token
        };
        this.userdata.StateAbbr = this.activeRoute.snapshot.params.stateAbbr;
        this.userdata.Username = this.activeRoute.snapshot.params.uname;

        this.newPasswordForm = fb.group({
            'newPassword': ["", Validators.compose([Validators.required, CustomValidations.passwordStrength])],
            'confirmPassword': ["", Validators.compose([Validators.required, CustomValidations.passwordStrength])]
        });
        this.errorMessage = message.messages;
    }

    ngOnInit() {
        this.urlObj = this.shared.getUrlObject(this.section);
        /**Calling token validation on loading.*/
        this.validateToken(function () { });
    }

    /**This function is used for token validation.*/
    validateToken(cb) {
        try {
            this.apiJson.method = "GET";
            this.apiJson.endUrl = this.urlObj.tokenUrl;
            let user = JSON.stringify(this.tokendata);
            this.apiJson.data = user;
            this.server.callAuthApi([this.apiJson]).subscribe(resp => {
                if (resp[0].Success + "" == "true") {
                    if (resp[0].Result + "" == "true") {
                        cb(this);
                    }
                    else {
                        this.router.navigateByUrl('/login/loginForm?status=expired');
                    }
                }
                else {
                    // alert("Error occured while authenticating");
                }
            });
        }
        catch (e) {
            alert("validateToken exception:" + e.message);
        }
    }

    /**This function is used for sending new password.*/
    sendNewPassword() {
        this.validateToken(this.resetPassword);
    }

    /**This function is used for resetting new password.*/
    resetPassword(ref) {
        try {
            //alert("coming in reset Password"+ref.section);
            // if(this.userdata){
            ref.utils.showLoading();
            ref.apiJson.method = "POST";
            let urlObj = ref.shared.getUrlObject(ref.section);
            ref.apiJson.endUrl = urlObj.endUrl;
            let user = JSON.stringify(ref.userdata);
            ref.apiJson.data = user;
            if (ref.userdata.Username != ref.userdata.Password) {
                ref.server.callAuthApi([ref.apiJson]).subscribe(resp => {
                    if (resp.Result + "" == "true") {
                        // this.router.navigate(['./plpcontent']);
                        ref.utils.hideLoading();
                        ref.successVal = true;
                    }
                    else {
                        ref.utils.hideLoading();
                        ref.errorVal = true;
                        setTimeout(function () {
                            ref.errorVal = false;
                            // console.log(this.edited);
                        }.bind(ref), 5000);
                    }
                }, ref.utils.handleError);
            }
        }
        catch (e) {
            alert("resetPassword exception:" + e.message);
        }
    }

    RedirectToLogin() {
        this.router.navigateByUrl('/login/loginForm');
    }

}

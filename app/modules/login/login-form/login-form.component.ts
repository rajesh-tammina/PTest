import { Component, OnInit } from '@angular/core';
import { ControlGroup, Control, Validators, FormBuilder, CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { ApiCallClass } from '../../../shared/apicall.model';
import { CustomValidations } from '../../PLP/shared/shared/common-validation';
import { ServerApi } from '../../../shared/app.apicall.service';
import { SharedService } from '../../PLP/shared/shared/shared-service.service';
import { Utilities } from '../../../shared/utilities.class';

@Component({
    selector: 'login-form-element',
    templateUrl: './app/modules/login/login-form/login-form.layout.html',
    styleUrls: ['./app/modules/login/login.style.css'],
    directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES],
    providers: [ServerApi, ApiCallClass, SharedService, Utilities]
})

export class LoginFormComponent implements OnInit {
    userdata = {
        username: "",
        password: "",
        stateAbbr: this.shared.getStateAbbr()
    };
    errorMessage;
    data: ApiCallClass;
    session = "";
    public errorVal = false;
    PLPLoginForm: ControlGroup;


    constructor(private router: Router, private utils: Utilities, private shared: SharedService,
        private loginauth: ServerApi, private apiJson: ApiCallClass, fb: FormBuilder) {
        /**Initializing form ControlGroup*/
        this.PLPLoginForm = fb.group({
            UserName: ["", Validators.compose([Validators.required,
                CustomValidations.noScript, CustomValidations.cannotContainSpace])],
            Password: ["", Validators.compose([Validators.required,
                CustomValidations.noScript, CustomValidations.cannotContainSpace])]
        });

    }


    /**Initializing session value based on query param "status" in Login screen */
    ngOnInit() {
        /**Tracking session expiry status */
        this.session = this.router.routerState.queryParams._value.status;

        /**Initializing validation messages object */
        this.errorMessage = this.shared.getMessages();

    }

    /**This function performs login functionality */
    login() {
        try {

            this.utils.showLoading();
            this.apiJson.method = "GET";
            this.apiJson.endUrl = "login";
            let user = JSON.stringify(this.userdata);

            this.apiJson.data = user;
            this.loginauth.callApi([this.apiJson]).subscribe(resp => {
                if (resp[0].Success + "" == "true") {
                    //Navigate to PLP sectiona if result.Success is true
                    this.router.navigateByUrl('plpcontent');
                    window.localStorage.setItem("accountID", resp[0].Result);
                }
                else {
                    //calling error call functionality if result.Success is not true
                    this.utils.hideLoading();
                    // this.utils.showModal("Error occured while authenticating");

                }
            }, (err) => {
                //Handling the exception in Login API call
                this.utils.hideLoading();
                var error = JSON.parse(err._body);
                if (error.Success + "" == "false") {

                    this.errorVal = true;
                    setTimeout(function () {
                        this.errorVal = false;
                        // console.log(this.edited);
                    }.bind(this), 5000);
                }
                else {
                    this.utils.handleError;
                }
            });
        }
        catch (e) {
            this.utils.hideLoading();
            // this.utils.showModal(e.message);
        }

    }
}
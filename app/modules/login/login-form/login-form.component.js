System.register(['@angular/core', '@angular/common', '@angular/router', '../../../shared/apicall.model', '../../PLP/shared/shared/common-validation', '../../../shared/app.apicall.service', '../../PLP/shared/shared/shared-service.service', '../../../shared/utilities.class'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, router_1, apicall_model_1, common_validation_1, app_apicall_service_1, shared_service_service_1, utilities_class_1;
    var LoginFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (apicall_model_1_1) {
                apicall_model_1 = apicall_model_1_1;
            },
            function (common_validation_1_1) {
                common_validation_1 = common_validation_1_1;
            },
            function (app_apicall_service_1_1) {
                app_apicall_service_1 = app_apicall_service_1_1;
            },
            function (shared_service_service_1_1) {
                shared_service_service_1 = shared_service_service_1_1;
            },
            function (utilities_class_1_1) {
                utilities_class_1 = utilities_class_1_1;
            }],
        execute: function() {
            LoginFormComponent = (function () {
                function LoginFormComponent(router, utils, shared, loginauth, apiJson, fb) {
                    this.router = router;
                    this.utils = utils;
                    this.shared = shared;
                    this.loginauth = loginauth;
                    this.apiJson = apiJson;
                    this.userdata = {
                        username: "",
                        password: "",
                        stateAbbr: this.shared.getStateAbbr()
                    };
                    this.session = "";
                    this.errorVal = false;
                    /**Initializing form ControlGroup*/
                    this.PLPLoginForm = fb.group({
                        UserName: ["", common_1.Validators.compose([common_1.Validators.required,
                                common_validation_1.CustomValidations.noScript, common_validation_1.CustomValidations.cannotContainSpace])],
                        Password: ["", common_1.Validators.compose([common_1.Validators.required,
                                common_validation_1.CustomValidations.noScript, common_validation_1.CustomValidations.cannotContainSpace])]
                    });
                }
                /**Initializing session value based on query param "status" in Login screen */
                LoginFormComponent.prototype.ngOnInit = function () {
                    /**Tracking session expiry status */
                    this.session = this.router.routerState.queryParams._value.status;
                    /**Initializing validation messages object */
                    this.errorMessage = this.shared.getMessages();
                };
                /**This function performs login functionality */
                LoginFormComponent.prototype.login = function () {
                    var _this = this;
                    try {
                        this.utils.showLoading();
                        this.apiJson.method = "GET";
                        this.apiJson.endUrl = "login";
                        var user = JSON.stringify(this.userdata);
                        this.apiJson.data = user;
                        this.loginauth.callApi([this.apiJson]).subscribe(function (resp) {
                            if (resp[0].Success + "" == "true") {
                                //Navigate to PLP sectiona if result.Success is true
                                _this.router.navigateByUrl('plpcontent');
                                window.localStorage.setItem("accountID", resp[0].Result);
                            }
                            else {
                                //calling error call functionality if result.Success is not true
                                _this.utils.hideLoading();
                            }
                        }, function (err) {
                            //Handling the exception in Login API call
                            _this.utils.hideLoading();
                            var error = JSON.parse(err._body);
                            if (error.Success + "" == "false") {
                                _this.errorVal = true;
                                setTimeout(function () {
                                    this.errorVal = false;
                                    // console.log(this.edited);
                                }.bind(_this), 5000);
                            }
                            else {
                                _this.utils.handleError;
                            }
                        });
                    }
                    catch (e) {
                        this.utils.hideLoading();
                    }
                };
                LoginFormComponent = __decorate([
                    core_1.Component({
                        selector: 'login-form-element',
                        templateUrl: './app/modules/login/login-form/login-form.layout.html',
                        styleUrls: ['./app/modules/login/login.style.css'],
                        directives: [router_1.ROUTER_DIRECTIVES, common_1.FORM_DIRECTIVES],
                        providers: [app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, shared_service_service_1.SharedService, utilities_class_1.Utilities]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, utilities_class_1.Utilities, shared_service_service_1.SharedService, app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, common_1.FormBuilder])
                ], LoginFormComponent);
                return LoginFormComponent;
            }());
            exports_1("LoginFormComponent", LoginFormComponent);
        }
    }
});
//# sourceMappingURL=login-form.component.js.map
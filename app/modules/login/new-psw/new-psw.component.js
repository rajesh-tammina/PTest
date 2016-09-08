System.register(['@angular/core', '@angular/router', '@angular/common', '../../../shared/apicall.model', '../../../shared/app.apicall.service', '../../PLP/shared/shared/shared-service.service', '../../PLP/shared/shared/common-validation', '../../../shared/utilities.class', "../../../shared/messages"], function(exports_1, context_1) {
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
    var core_1, router_1, common_1, apicall_model_1, app_apicall_service_1, shared_service_service_1, common_validation_1, utilities_class_1, message;
    var NewPasswordComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (apicall_model_1_1) {
                apicall_model_1 = apicall_model_1_1;
            },
            function (app_apicall_service_1_1) {
                app_apicall_service_1 = app_apicall_service_1_1;
            },
            function (shared_service_service_1_1) {
                shared_service_service_1 = shared_service_service_1_1;
            },
            function (common_validation_1_1) {
                common_validation_1 = common_validation_1_1;
            },
            function (utilities_class_1_1) {
                utilities_class_1 = utilities_class_1_1;
            },
            function (message_1) {
                message = message_1;
            }],
        execute: function() {
            NewPasswordComponent = (function () {
                function NewPasswordComponent(router, server, shared, apiJson, activeRoute, fb, utils) {
                    this.router = router;
                    this.server = server;
                    this.shared = shared;
                    this.apiJson = apiJson;
                    this.activeRoute = activeRoute;
                    this.utils = utils;
                    this.tokendata = {
                        stateAbbr: "",
                        token: ""
                    };
                    this.userdata = {
                        StateAbbr: "",
                        Username: "",
                        Password: ""
                    };
                    this.section = "NewPassword";
                    this.successVal = false;
                    this.errorVal = false;
                    this.tokendata = {
                        stateAbbr: this.activeRoute.snapshot.params.stateAbbr,
                        token: router.routerState.queryParams._value.Token
                    };
                    this.userdata.StateAbbr = this.activeRoute.snapshot.params.stateAbbr;
                    this.userdata.Username = this.activeRoute.snapshot.params.uname;
                    this.newPasswordForm = fb.group({
                        'newPassword': ["", common_1.Validators.compose([common_1.Validators.required, common_validation_1.CustomValidations.passwordStrength])],
                        'confirmPassword': ["", common_1.Validators.compose([common_1.Validators.required, common_validation_1.CustomValidations.passwordStrength])]
                    });
                    this.errorMessage = message.messages;
                }
                NewPasswordComponent.prototype.ngOnInit = function () {
                    this.urlObj = this.shared.getUrlObject(this.section);
                    /**Calling token validation on loading.*/
                    this.validateToken(function () { });
                };
                /**This function is used for token validation.*/
                NewPasswordComponent.prototype.validateToken = function (cb) {
                    var _this = this;
                    try {
                        this.apiJson.method = "GET";
                        this.apiJson.endUrl = this.urlObj.tokenUrl;
                        var user = JSON.stringify(this.tokendata);
                        this.apiJson.data = user;
                        this.server.callAuthApi([this.apiJson]).subscribe(function (resp) {
                            if (resp[0].Success + "" == "true") {
                                if (resp[0].Result + "" == "true") {
                                    cb(_this);
                                }
                                else {
                                    _this.router.navigateByUrl('/login/loginForm?status=expired');
                                }
                            }
                            else {
                            }
                        });
                    }
                    catch (e) {
                        alert("validateToken exception:" + e.message);
                    }
                };
                /**This function is used for sending new password.*/
                NewPasswordComponent.prototype.sendNewPassword = function () {
                    this.validateToken(this.resetPassword);
                };
                /**This function is used for resetting new password.*/
                NewPasswordComponent.prototype.resetPassword = function (ref) {
                    try {
                        //alert("coming in reset Password"+ref.section);
                        // if(this.userdata){
                        ref.utils.showLoading();
                        ref.apiJson.method = "POST";
                        var urlObj = ref.shared.getUrlObject(ref.section);
                        ref.apiJson.endUrl = urlObj.endUrl;
                        var user = JSON.stringify(ref.userdata);
                        ref.apiJson.data = user;
                        if (ref.userdata.Username != ref.userdata.Password) {
                            ref.server.callAuthApi([ref.apiJson]).subscribe(function (resp) {
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
                };
                NewPasswordComponent.prototype.RedirectToLogin = function () {
                    this.router.navigateByUrl('/login/loginForm');
                };
                NewPasswordComponent = __decorate([
                    core_1.Component({
                        selector: 'new-psw',
                        templateUrl: './app/modules/login/new-psw/new-psw.layout.html',
                        styleUrls: ['./app/modules/login/login.style.css'],
                        directives: [router_1.ROUTER_DIRECTIVES, common_1.FORM_DIRECTIVES],
                        providers: [app_apicall_service_1.ServerApi, shared_service_service_1.SharedService, apicall_model_1.ApiCallClass, utilities_class_1.Utilities]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, app_apicall_service_1.ServerApi, shared_service_service_1.SharedService, apicall_model_1.ApiCallClass, router_1.ActivatedRoute, common_1.FormBuilder, utilities_class_1.Utilities])
                ], NewPasswordComponent);
                return NewPasswordComponent;
            }());
            exports_1("NewPasswordComponent", NewPasswordComponent);
        }
    }
});
//# sourceMappingURL=new-psw.component.js.map
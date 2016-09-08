System.register(['@angular/core', '@angular/router', '@angular/common', '../../../shared/app.apicall.service', '../../../shared/apicall.model', '../../PLP/shared/shared/shared-service.service', '../../PLP/shared/shared/common-validation', '../../../shared/utilities.class', "../../../shared/messages"], function(exports_1, context_1) {
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
    var core_1, router_1, common_1, app_apicall_service_1, apicall_model_1, shared_service_service_1, common_validation_1, utilities_class_1, message;
    var UsernameRecoveryComponent;
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
            function (app_apicall_service_1_1) {
                app_apicall_service_1 = app_apicall_service_1_1;
            },
            function (apicall_model_1_1) {
                apicall_model_1 = apicall_model_1_1;
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
            UsernameRecoveryComponent = (function () {
                function UsernameRecoveryComponent(router, server, shared, apiJson, fb, utils) {
                    this.router = router;
                    this.server = server;
                    this.shared = shared;
                    this.apiJson = apiJson;
                    this.utils = utils;
                    this.userdata = {
                        stateAbbr: this.shared.getDefaultStateAbbr(),
                        email: ""
                    };
                    this.successVal = false;
                    this.errorVal = false;
                    this.section = "UsernameRecovery";
                    this.ForgotUserNameForm = fb.group({
                        'email': ["", common_1.Validators.compose([common_1.Validators.required, common_validation_1.CustomValidations.mailFormat])]
                    });
                    this.errorMessage = message.messages;
                }
                UsernameRecoveryComponent.prototype.ngOnInit = function () {
                };
                UsernameRecoveryComponent.prototype.resetUsername = function () {
                    var _this = this;
                    try {
                        this.utils.showLoading();
                        this.apiJson.method = "GET";
                        var urlObj = this.shared.getUrlObject(this.section);
                        this.apiJson.endUrl = urlObj.endUrl;
                        var user = JSON.stringify(this.userdata);
                        this.apiJson.data = user;
                        this.server.callAuthApi([this.apiJson]).subscribe(function (resp) {
                            //alert(JSON.stringify(resp));
                            if (resp[0].Result + "" == "true") {
                                // this.router.navigate(['./plpcontent']);
                                _this.utils.hideLoading();
                                _this.successVal = true;
                                setTimeout(function () {
                                    this.successVal = false;
                                    // console.log(this.edited);
                                }.bind(_this), 5000);
                            }
                            else {
                                _this.utils.hideLoading();
                                _this.errorVal = true;
                                setTimeout(function () {
                                    this.errorVal = false;
                                    // console.log(this.edited);
                                }.bind(_this), 5000);
                            }
                        }, this.utils.handleError);
                    }
                    catch (e) {
                        alert("resetUsername exception:" + e.message);
                    }
                };
                UsernameRecoveryComponent = __decorate([
                    core_1.Component({
                        selector: 'forgot-username',
                        templateUrl: './app/modules/login/recovery-user/forgot-username.layout.html',
                        styleUrls: ['./app/modules/login/login.style.css'],
                        directives: [router_1.ROUTER_DIRECTIVES, common_1.FORM_DIRECTIVES],
                        providers: [app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, shared_service_service_1.SharedService, utilities_class_1.Utilities]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, app_apicall_service_1.ServerApi, shared_service_service_1.SharedService, apicall_model_1.ApiCallClass, common_1.FormBuilder, utilities_class_1.Utilities])
                ], UsernameRecoveryComponent);
                return UsernameRecoveryComponent;
            }());
            exports_1("UsernameRecoveryComponent", UsernameRecoveryComponent);
        }
    }
});
//# sourceMappingURL=forgot-username.component.js.map
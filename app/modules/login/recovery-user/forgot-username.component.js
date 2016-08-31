System.register(['@angular/core', '@angular/router', '../../../shared/app.apicall.service', '../../../shared/apicall.model', '../../PLP/shared/shared/shared-service.service'], function(exports_1, context_1) {
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
    var core_1, router_1, app_apicall_service_1, apicall_model_1, shared_service_service_1;
    var UsernameRecoveryComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_apicall_service_1_1) {
                app_apicall_service_1 = app_apicall_service_1_1;
            },
            function (apicall_model_1_1) {
                apicall_model_1 = apicall_model_1_1;
            },
            function (shared_service_service_1_1) {
                shared_service_service_1 = shared_service_service_1_1;
            }],
        execute: function() {
            UsernameRecoveryComponent = (function () {
                function UsernameRecoveryComponent(router, server, shared, apiJson) {
                    this.router = router;
                    this.server = server;
                    this.shared = shared;
                    this.apiJson = apiJson;
                    this.userdata = {
                        stateAbbr: this.shared.getDefaultStateAbbr(),
                        email: ""
                    };
                    this.section = "UsernameRecovery";
                }
                UsernameRecoveryComponent.prototype.ngOnInit = function () {
                };
                UsernameRecoveryComponent.prototype.resetUsername = function () {
                    try {
                        this.apiJson.method = "GET";
                        var urlObj = this.shared.getUrlObject(this.section);
                        this.apiJson.endUrl = urlObj.endUrl;
                        var user = JSON.stringify(this.userdata);
                        this.apiJson.data = user;
                        this.server.callApi([this.apiJson]).subscribe(function (resp) {
                            if (resp[0].Success + "" == "true") {
                            }
                            else {
                                alert("error occured while authenticating");
                            }
                        });
                    }
                    catch (e) {
                        alert("login exception:" + e.message);
                    }
                };
                UsernameRecoveryComponent = __decorate([
                    core_1.Component({
                        selector: 'forgot-username',
                        templateUrl: './app/modules/login/recovery-user/forgot-username.layout.html',
                        styleUrls: ['./app/modules/login/login.style.css'],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, shared_service_service_1.SharedService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, app_apicall_service_1.ServerApi, shared_service_service_1.SharedService, apicall_model_1.ApiCallClass])
                ], UsernameRecoveryComponent);
                return UsernameRecoveryComponent;
            }());
            exports_1("UsernameRecoveryComponent", UsernameRecoveryComponent);
        }
    }
});
//# sourceMappingURL=forgot-username.component.js.map
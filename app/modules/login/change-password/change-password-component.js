System.register(['@angular/core', '@angular/router', '../../../shared/app.apicall.service', '../../../shared/apicall.model'], function(exports_1, context_1) {
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
    var core_1, router_1, app_apicall_service_1, apicall_model_1;
    var ChangePasswordComponent;
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
            }],
        execute: function() {
            ChangePasswordComponent = (function () {
                function ChangePasswordComponent(router, loginauth, apiJson) {
                    this.router = router;
                    this.loginauth = loginauth;
                    this.apiJson = apiJson;
                    this.userdata = {
                        username: "",
                        password: "",
                        stateAbbr: "IC"
                    };
                }
                ChangePasswordComponent.prototype.ngOnInit = function () {
                };
                ChangePasswordComponent = __decorate([
                    core_1.Component({
                        selector: 'forgot-psw',
                        templateUrl: './app/modules/login/change-password/change-password-layout.html',
                        styleUrls: ['./app/modules/login/login.style.css'],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass])
                ], ChangePasswordComponent);
                return ChangePasswordComponent;
            }());
            exports_1("ChangePasswordComponent", ChangePasswordComponent);
        }
    }
});
//# sourceMappingURL=change-password-component.js.map
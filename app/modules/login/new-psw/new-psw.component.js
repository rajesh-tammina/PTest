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
    var NewPasswordComponent;
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
            NewPasswordComponent = (function () {
                function NewPasswordComponent(router, server, shared, apiJson, activeRoute) {
                    this.router = router;
                    this.server = server;
                    this.shared = shared;
                    this.apiJson = apiJson;
                    this.activeRoute = activeRoute;
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
                    alert("params are:" + JSON.stringify(this.activeRoute.snapshot.params));
                    this.tokendata = {
                        stateAbbr: this.activeRoute.snapshot.params.stateAbbr,
                        token: this.activeRoute.snapshot.params.token
                    };
                    this.userdata.StateAbbr = this.activeRoute.snapshot.params.stateAbbr;
                    this.userdata.Username = this.activeRoute.snapshot.params.uname;
                }
                NewPasswordComponent.prototype.ngOnInit = function () {
                    this.urlObj = this.shared.getUrlObject(this.section);
                    this.validateToken("");
                };
                NewPasswordComponent.prototype.validateToken = function (cb) {
                    try {
                        this.apiJson.method = "GET";
                        this.apiJson.endUrl = this.urlObj.tokenUrl;
                        var user = JSON.stringify(this.tokendata);
                        this.apiJson.data = user;
                        alert("this.apiJson:" + JSON.stringify(this.apiJson));
                        this.server.callApi([this.apiJson]).subscribe(function (resp) {
                            if (resp[0].Success + "" == "true") {
                                // this.router.navigate(['./plpcontent']);
                                cb();
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
                NewPasswordComponent.prototype.sendNewPassword = function () {
                    this.validateToken(this.resetPassword);
                };
                NewPasswordComponent.prototype.resetPassword = function () {
                    try {
                        this.apiJson.method = "POST";
                        this.apiJson.endUrl = this.urlObj.endUrl;
                        var user = JSON.stringify(this.userdata);
                        this.apiJson.data = user;
                        alert("this.apiJson:" + JSON.stringify(this.apiJson));
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
                NewPasswordComponent = __decorate([
                    core_1.Component({
                        selector: 'new-psw',
                        templateUrl: './app/modules/login/new-psw/new-psw.layout.html',
                        styleUrls: ['./app/modules/login/login.style.css'],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [app_apicall_service_1.ServerApi, shared_service_service_1.SharedService, apicall_model_1.ApiCallClass]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, app_apicall_service_1.ServerApi, shared_service_service_1.SharedService, apicall_model_1.ApiCallClass, router_1.ActivatedRoute])
                ], NewPasswordComponent);
                return NewPasswordComponent;
            }());
            exports_1("NewPasswordComponent", NewPasswordComponent);
        }
    }
});
//# sourceMappingURL=new-psw.component.js.map
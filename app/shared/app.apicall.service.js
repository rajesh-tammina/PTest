System.register(['@angular/core', '@angular/http', '@angular/router', 'rxjs/Observable', "../app.config"], function(exports_1, context_1) {
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
    var core_1, http_1, router_1, Observable_1, Config;
    var ServerApi;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Config_1) {
                Config = Config_1;
            }],
        execute: function() {
            ServerApi = (function () {
                function ServerApi(http, router) {
                    this.http = http;
                    this.router = router;
                }
                ServerApi.prototype.callApi = function (data) {
                    var _this = this;
                    if (data[0].method == "POST") {
                        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                        var options = new http_1.RequestOptions({ headers: headers });
                        try {
                            return this.http.post(Config.ConfigObj.server + "/postCall", { data: data[0] }, options)
                                .map(this.extractData);
                        }
                        catch (e) {
                            alert("post exception:" + e.message);
                        }
                    }
                    else {
                        var observableBatch_1 = [];
                        try {
                            data.forEach(function (componentarray, inx) {
                                var str = Object.keys(componentarray).map(function (key) {
                                    return encodeURIComponent(key) + '=' + encodeURIComponent(componentarray[key]);
                                }).join('&');
                                observableBatch_1.push(_this.http.get(Config.ConfigObj.server + "/getCall?" + str).map(_this.extractData));
                            });
                        }
                        catch (e) {
                            alert("eception:" + e.message);
                        }
                        return Observable_1.Observable.forkJoin(observableBatch_1);
                    }
                };
                ServerApi.prototype.extractData = function (res) {
                    var body = res.json();
                    window.localStorage.setItem("auth_key", body.sessionID);
                    return body || {};
                };
                ServerApi.prototype.handleError = function (error) {
                    // In a real world app, we might use a remote logging infrastructure
                    // We'd also dig deeper into the error to get a better message
                    var errMsg = (error.message) ? error.message :
                        error.status ? error.status + " - " + error.statusText : 'Server error';
                    console.error(errMsg); // log to console instead
                    //  alert("errMsg:"+errMsg);
                    //  return Observable.throw(errMsg);
                };
                ServerApi = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.Router])
                ], ServerApi);
                return ServerApi;
            }());
            exports_1("ServerApi", ServerApi);
        }
    }
});
//# sourceMappingURL=app.apicall.service.js.map
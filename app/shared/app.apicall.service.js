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
    var expiredTime, eventTime, $modal, ServerApi, popUpDialog;
    function extendExpiration(body, sec) {
        // alert( "extendExpiration body: "+JSON.stringify(body));
        //  var str={"sessionID":window.localStorage.getItem("auth_key")};
        if (body.Success + "" == "true") {
            // alert("coming in if");
            clearTimeout(expiredTime);
            expiredTime = setTimeout(function () {
                var newtime = new Date().getTime();
                //console.log("newtime:"+newtime);
                var oldtime = parseInt(window.localStorage.getItem("currentSec"));
                // console.log("old----"+oldtime);
                var diff = newtime - oldtime;
                // console.log("newtime:"+newtime+"old----"+oldtime+" diff:"+diff);
                if (diff >= eventTime) {
                    popUpDialog.show();
                }
                else {
                    // alert("expiredTime else eventTime condition:"+(eventTime-diff));
                    extendTime(eventTime - diff);
                }
                //alert("coming outside settimeout");
            }, parseInt(sec));
        }
        return body;
    }
    function extendTime(sec) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", Config.ConfigObj.server + "/extendTime?sessionID=" + window.localStorage.getItem("auth_key"), true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var newSessionId = JSON.parse(xhttp.responseText);
                newSessionId.Success = "true";
                window.localStorage.removeItem("auth_key");
                window.localStorage.setItem("auth_key", newSessionId.sessionID);
                extendExpiration(newSessionId, sec);
            }
            else if (xhttp.status == 400) {
                sessionExpired();
            }
        };
    }
    function sessionExpired() {
        window.localStorage.removeItem("accountID");
        window.localStorage.removeItem("auth_key");
        window.location.href = "/login/loginForm?status=expired";
    }
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
            $modal = $('<div class="modal fade" id="myModal" tabindex="-1" ' +
                ' role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" > ' +
                ' <div class="modal-dialog modal-sm">' +
                ' <div class="modal-content">' +
                ' <div class="modal-header">' +
                // '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
                '<h4 class="modal-title" id="myModalLabel">Session Expired</h4>' +
                '</div>' +
                '<div class="modal-body-popup">' +
                '<p>Your Session will be expired in 2 minutes.Are you sure want to continue? </p>' +
                '</div>' +
                '<div class="modal-footer">' +
                '<button id="success" type="button" class="btn btn-success" >Yes</button>' +
                //   '<button id="reject" type="button" class="btn btn-primary" >No</button> '+
                '</div>' +
                '</div>' +
                ' </div>' +
                '</div>');
            ServerApi = (function () {
                function ServerApi(http, router) {
                    this.http = http;
                    this.router = router;
                }
                ServerApi.prototype.callAuthApi = function (data) {
                    var _this = this;
                    if (data[0].method == "POST") {
                        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                        var options = new http_1.RequestOptions({ headers: headers });
                        try {
                            return this.http.post(Config.ConfigObj.server + "/authPost", { data: data[0] }, options)
                                .map(this.extractAuthData);
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
                                observableBatch_1.push(_this.http.get(Config.ConfigObj.server + "/authGet?" + str).map(_this.extractAuthData));
                                //.subscribe(data => { alert(data);},  this.handleError,  () => console.log('done'))
                            });
                        }
                        catch (e) {
                            alert("callAuthApi exception:" + e.message);
                        }
                        return Observable_1.Observable.forkJoin(observableBatch_1);
                    }
                };
                ServerApi.prototype.extractAuthData = function (res) {
                    var body = res.json();
                    return body || {};
                };
                //This service is called each time the client tries to hit the server api after login
                ServerApi.prototype.callApi = function (data) {
                    var _this = this;
                    console.log("call with data:" + JSON.stringify(data));
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
                        var observableBatch_2 = [];
                        try {
                            data.forEach(function (componentarray, inx) {
                                var str = Object.keys(componentarray).map(function (key) {
                                    return encodeURIComponent(key) + '=' + encodeURIComponent(componentarray[key]);
                                }).join('&');
                                observableBatch_2.push(_this.http.get(Config.ConfigObj.server + "/getCall?" + str).map(_this.extractData));
                                //.subscribe(data => { alert(data);},  this.handleError,  () => console.log('done'))
                            });
                        }
                        catch (e) {
                            alert("post exception:" + e.message);
                        }
                        return Observable_1.Observable.forkJoin(observableBatch_2);
                    }
                };
                ServerApi.prototype.extractData = function (res) {
                    //this.sessionOutTime = 13*1000;
                    //   alert(this.sessionOutTime);
                    var body = res.json();
                    eventTime = body.eventTime;
                    window.localStorage.setItem("auth_key", body.sessionID);
                    // alert( "extractData body: "+JSON.stringify(body));
                    extendExpiration(body, eventTime);
                    return body || {};
                };
                ServerApi.prototype.sessionExpiry = function () {
                    sessionExpired();
                };
                ServerApi = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.Router])
                ], ServerApi);
                return ServerApi;
            }());
            exports_1("ServerApi", ServerApi);
            popUpDialog = (function ($) {
                'use strict';
                return {
                    /**
                     * Opens our dialog
                     * @param message Custom message
                     * @param options Custom options:
                     *                   options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
                     *                   options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
                     */
                    show: function () {
                        var pp = setTimeout(function () {
                            sessionExpired();
                        }, 2 * 60 * 1000);
                        $modal.find("#success").off('click').on('click', function (e) {
                            var tmpsec = eventTime;
                            extendTime(tmpsec);
                            clearTimeout(pp);
                            popUpDialog.hide();
                        });
                        $modal.find("#reject").off('click').on('click', function (e) {
                            popUpDialog.hide();
                        });
                        // Opening dialog
                        $modal.modal();
                    },
                    /**
                     * Closes dialog
                     */
                    hide: function () {
                        $modal.modal('hide');
                    }
                };
            })($);
        }
    }
});
//# sourceMappingURL=app.apicall.service.js.map
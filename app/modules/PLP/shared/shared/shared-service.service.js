System.register(['@angular/core', "../../../../shared/app.constants"], function(exports_1, context_1) {
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
    var core_1, sections;
    var SharedService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (sections_1) {
                sections = sections_1;
            }],
        execute: function() {
            SharedService = (function () {
                /*This constructor initializes values*/
                function SharedService() {
                    this.sectionsList = sections.sectionsArr;
                    this.questionsList = sections.questionsArr;
                    this.endUrlObj = sections.EndUrlArr;
                    this.returnUrl = sections.returnUrl;
                }
                /*This function returns the list of all section objects
                 */
                SharedService.prototype.getServiceList = function () {
                    return this.sectionsList;
                };
                /*This function returns the list of specific section objects
                 */
                SharedService.prototype.getSectionObject = function (section) {
                    var _this = this;
                    var sectionObject;
                    if (this.sectionsList.length > 0) {
                        this.sectionsList.forEach(function (obj, key) {
                            if (obj.section + "" == section + "") {
                                obj.totalCount = _this.sectionsList.length;
                                obj.currentCount = key + 1;
                                if (key != 0)
                                    obj.previousSec = _this.sectionsList[key - 1].routerLink;
                                if (key != _this.sectionsList.length - 1)
                                    obj.nextSec = _this.sectionsList[key + 1].routerLink;
                                sectionObject = obj;
                            }
                        });
                    }
                    return sectionObject;
                };
                /*This function returns the list of specific section objects
                */
                SharedService.prototype.getQuestion = function (section) {
                    var questionObject;
                    //alert("getQuestion questions list:"+JSON.stringify(this.questionsList));
                    if (this.questionsList.length > 0) {
                        this.questionsList.forEach(function (obj, key) {
                            if (obj.section + "" == section + "") {
                                questionObject = obj;
                            }
                        });
                    }
                    return questionObject;
                };
                // This function returns entire endUrlObj based on section name.
                SharedService.prototype.getUrlObject = function (section) {
                    var urlObj;
                    if (this.endUrlObj.length > 0) {
                        this.endUrlObj.forEach(function (obj, key) {
                            if (obj.section + "" == section + "") {
                                urlObj = obj;
                            }
                        });
                    }
                    return urlObj;
                };
                SharedService.prototype.getDefaultStateAbbr = function () {
                    return "IC"; //window.localStorage.getItem("stateAbbr");
                };
                SharedService.prototype.getStateAbbr = function () {
                    return "IC"; //window.localStorage.getItem("stateAbbr");
                };
                SharedService.prototype.getAccountId = function () {
                    return "7662"; //window.localStorage.getItem("accountID");
                };
                SharedService.prototype.getAuthKey = function () {
                    return window.localStorage.getItem("auth_key");
                };
                SharedService.prototype.getReturnUrl = function () {
                    return this.returnUrl.url;
                };
                SharedService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], SharedService);
                return SharedService;
            }());
            exports_1("SharedService", SharedService);
        }
    }
});
//# sourceMappingURL=shared-service.service.js.map
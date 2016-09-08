System.register(['@angular/core', '../../../../shared/apicall.model', '../shared/PLP-nav-header.component', '../shared/shared-service.service', '../../../../shared/app.apicall.service', '../../../../shared/utilities.class', '../../../../shared/customPipes'], function(exports_1, context_1) {
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
    var core_1, apicall_model_1, PLP_nav_header_component_1, shared_service_service_1, app_apicall_service_1, utilities_class_1, customPipes_1;
    var StudyOfInterestComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (apicall_model_1_1) {
                apicall_model_1 = apicall_model_1_1;
            },
            function (PLP_nav_header_component_1_1) {
                PLP_nav_header_component_1 = PLP_nav_header_component_1_1;
            },
            function (shared_service_service_1_1) {
                shared_service_service_1 = shared_service_service_1_1;
            },
            function (app_apicall_service_1_1) {
                app_apicall_service_1 = app_apicall_service_1_1;
            },
            function (utilities_class_1_1) {
                utilities_class_1 = utilities_class_1_1;
            },
            function (customPipes_1_1) {
                customPipes_1 = customPipes_1_1;
            }],
        execute: function() {
            StudyOfInterestComponent = (function () {
                function StudyOfInterestComponent(shared, utils, serverApi, apiJson) {
                    this.shared = shared;
                    this.utils = utils;
                    this.serverApi = serverApi;
                    this.apiJson = apiJson;
                    this.report = "";
                    this.changeInrView = new core_1.EventEmitter();
                    this.containResult = new core_1.EventEmitter();
                    this.section = "StudyOfInterest";
                }
                StudyOfInterestComponent.prototype.ngOnInit = function () {
                    this.sectionObject = this.shared.getSectionObject(this.section);
                    this.getStudyOfInterestData();
                };
                StudyOfInterestComponent.prototype.getStudyOfInterestData = function () {
                    var _this = this;
                    var urlObj = this.shared.getUrlObject(this.section);
                    this.apiJson.endUrl = urlObj.endUrl;
                    var nodata = this.shared.getTableNoData(this.section);
                    this.tableNoData = nodata;
                    var data = {
                        stateAbbr: this.shared.getStateAbbr(),
                        accountID: this.shared.getAccountId(),
                        fileName: urlObj.fileName
                    };
                    this.apiJson.method = "GET";
                    // this.apiJson.endUrl="SavedFiles";
                    this.apiJson.sessionID = this.shared.getAuthKey();
                    var dat = JSON.stringify(data);
                    this.apiJson.data = dat;
                    this.serverApi.callApi([this.apiJson]).subscribe(function (response) {
                        // response[0].Result.UpdatedTimeStamp=this.utils.changeDate(response[0].Result.UpdatedTimeStamp);
                        _this.studyOfInterestData = response[0].Result;
                        if (response[0].Result != null) {
                            _this.containResult.emit({ "section": _this.section, result: "filled" });
                        }
                        else {
                            _this.containResult.emit({ "section": _this.section, result: "empty" });
                        }
                    }, this.utils.handleError);
                };
                StudyOfInterestComponent.prototype.changeView = function (evnt) {
                    this.changeInrView.emit(evnt);
                };
                __decorate([
                    core_1.Input('report-status'), 
                    __metadata('design:type', Object)
                ], StudyOfInterestComponent.prototype, "report", void 0);
                __decorate([
                    core_1.Output('changeView'), 
                    __metadata('design:type', Object)
                ], StudyOfInterestComponent.prototype, "changeInrView", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], StudyOfInterestComponent.prototype, "containResult", void 0);
                StudyOfInterestComponent = __decorate([
                    core_1.Component({
                        selector: 'study-of-interest',
                        templateUrl: './app/modules/PLP/shared/study-of-interest/study-of-interest.layout.html',
                        directives: [PLP_nav_header_component_1.PLPNavHeaderComponent],
                        providers: [shared_service_service_1.SharedService, app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, utilities_class_1.Utilities],
                        pipes: [customPipes_1.CustomDate]
                    }), 
                    __metadata('design:paramtypes', [shared_service_service_1.SharedService, utilities_class_1.Utilities, app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass])
                ], StudyOfInterestComponent);
                return StudyOfInterestComponent;
            }());
            exports_1("StudyOfInterestComponent", StudyOfInterestComponent);
        }
    }
});
//# sourceMappingURL=study-of-interest.component.js.map
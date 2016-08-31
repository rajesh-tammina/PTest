System.register(['@angular/core', '../../../../shared/apicall.model', '../shared/PLP-nav-header.component', '../shared/shared-service.service', '../../../../shared/app.apicall.service', "../../../../shared/app.constants"], function(exports_1, context_1) {
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
    var core_1, apicall_model_1, PLP_nav_header_component_1, shared_service_service_1, app_apicall_service_1, sections;
    var SchoolsOfInterestComponent;
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
            function (sections_1) {
                sections = sections_1;
            }],
        execute: function() {
            SchoolsOfInterestComponent = (function () {
                function SchoolsOfInterestComponent(shared, serverApi, apiJson) {
                    this.shared = shared;
                    this.serverApi = serverApi;
                    this.apiJson = apiJson;
                    this.report = "";
                    this.section = "SchoolsOfInterest";
                }
                SchoolsOfInterestComponent.prototype.ngOnInit = function () {
                    this.sectionObject = this.shared.getSectionObject(this.section);
                    this.endurl = sections.EndUrlArr;
                    this.getSchoolsOfInterestData();
                };
                SchoolsOfInterestComponent.prototype.getSchoolsOfInterestData = function () {
                    var _this = this;
                    var urlObj = this.shared.getUrlObject(this.section);
                    this.apiJson.endUrl = urlObj.endUrl;
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
                        _this.schoolsOfInterestData = response[0].Result;
                    });
                };
                __decorate([
                    core_1.Input('report-status'), 
                    __metadata('design:type', Object)
                ], SchoolsOfInterestComponent.prototype, "report", void 0);
                SchoolsOfInterestComponent = __decorate([
                    core_1.Component({
                        selector: 'schools-of-interest',
                        templateUrl: './app/modules/PLP/shared/schools-of-interest/schools-of-interest.layout.html',
                        directives: [PLP_nav_header_component_1.PLPNavHeaderComponent],
                        providers: [shared_service_service_1.SharedService, app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass]
                    }), 
                    __metadata('design:paramtypes', [shared_service_service_1.SharedService, app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass])
                ], SchoolsOfInterestComponent);
                return SchoolsOfInterestComponent;
            }());
            exports_1("SchoolsOfInterestComponent", SchoolsOfInterestComponent);
        }
    }
});
//# sourceMappingURL=schools-of-interest.component.js.map
System.register(['@angular/core', '@angular/common', '../../../../shared/apicall.model', '../shared/common-validation', '../shared/PLP-nav-header.component', '../shared/shared-service.service', '../../../../shared/app.apicall.service'], function(exports_1, context_1) {
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
    var core_1, common_1, apicall_model_1, common_validation_1, PLP_nav_header_component_1, shared_service_service_1, app_apicall_service_1;
    var TestScoresComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (apicall_model_1_1) {
                apicall_model_1 = apicall_model_1_1;
            },
            function (common_validation_1_1) {
                common_validation_1 = common_validation_1_1;
            },
            function (PLP_nav_header_component_1_1) {
                PLP_nav_header_component_1 = PLP_nav_header_component_1_1;
            },
            function (shared_service_service_1_1) {
                shared_service_service_1 = shared_service_service_1_1;
            },
            function (app_apicall_service_1_1) {
                app_apicall_service_1 = app_apicall_service_1_1;
            }],
        execute: function() {
            TestScoresComponent = (function () {
                function TestScoresComponent(shared, serverApi, apiJson, fb) {
                    this.shared = shared;
                    this.serverApi = serverApi;
                    this.apiJson = apiJson;
                    this.report = "";
                    this.section = "TestScores";
                    this.testScoresForm = fb.group({
                        Test: ["", common_1.Validators.compose([common_validation_1.CustomValidations.noScript])],
                        score: ["", common_1.Validators.compose([common_validation_1.CustomValidations.noScript])]
                    });
                }
                TestScoresComponent.prototype.ngOnInit = function () {
                    this.sectionObject = this.shared.getSectionObject(this.section);
                    this.questionObject = this.shared.getQuestion(this.section);
                    this.getTestScoresData();
                };
                TestScoresComponent.prototype.getTestScoresData = function () {
                    var _this = this;
                    var urlObj = this.shared.getUrlObject(this.section);
                    this.apiJson.endUrl = urlObj.endUrl;
                    var data = {
                        stateAbbr: this.shared.getStateAbbr(),
                        accountID: this.shared.getAccountId()
                    };
                    this.apiJson.method = "GET";
                    this.apiJson.sessionID = this.shared.getAuthKey();
                    var dat = JSON.stringify(data);
                    this.apiJson.data = dat;
                    this.serverApi.callApi([this.apiJson]).subscribe(function (response) {
                        _this.testScoresData = response[0].Result;
                    });
                };
                __decorate([
                    core_1.Input('report-status'), 
                    __metadata('design:type', Object)
                ], TestScoresComponent.prototype, "report", void 0);
                TestScoresComponent = __decorate([
                    core_1.Component({
                        selector: 'test-scores',
                        templateUrl: './app/modules/PLP/shared/test-scores/test-scores.layout.html',
                        directives: [PLP_nav_header_component_1.PLPNavHeaderComponent, common_1.FORM_DIRECTIVES],
                        providers: [shared_service_service_1.SharedService, app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass]
                    }), 
                    __metadata('design:paramtypes', [shared_service_service_1.SharedService, app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, common_1.FormBuilder])
                ], TestScoresComponent);
                return TestScoresComponent;
            }());
            exports_1("TestScoresComponent", TestScoresComponent);
        }
    }
});
//# sourceMappingURL=test-scores.component.js.map
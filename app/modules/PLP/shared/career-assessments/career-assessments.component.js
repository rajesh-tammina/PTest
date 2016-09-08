System.register(['@angular/core', '../../../../shared/apicall.model', '../../../../shared/customPipes', '../shared/PLP-nav-header.component', '../shared/shared-service.service', '../../../../shared/app.apicall.service', "../../../../shared/app.constants", '../../../../shared/utilities.class'], function(exports_1, context_1) {
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
    var core_1, apicall_model_1, customPipes_1, PLP_nav_header_component_1, shared_service_service_1, app_apicall_service_1, sections, utilities_class_1;
    var CareerAssessmentsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (apicall_model_1_1) {
                apicall_model_1 = apicall_model_1_1;
            },
            function (customPipes_1_1) {
                customPipes_1 = customPipes_1_1;
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
            },
            function (utilities_class_1_1) {
                utilities_class_1 = utilities_class_1_1;
            }],
        execute: function() {
            CareerAssessmentsComponent = (function () {
                function CareerAssessmentsComponent(shared, serverApi, apiJson, utils) {
                    this.shared = shared;
                    this.serverApi = serverApi;
                    this.apiJson = apiJson;
                    this.utils = utils;
                    this.report = "";
                    this.changeInrView = new core_1.EventEmitter();
                    this.containResult = new core_1.EventEmitter();
                    this.section = "CareerAssessments";
                }
                CareerAssessmentsComponent.prototype.ngOnInit = function () {
                    this.sectionObject = this.shared.getSectionObject(this.section);
                    this.endurl = sections.EndUrlArr;
                    this.getCareerAssessmentsData();
                };
                CareerAssessmentsComponent.prototype.getCareerAssessmentsData = function () {
                    var _this = this;
                    var data = {
                        stateAbbr: this.shared.getStateAbbr(),
                        accountID: this.shared.getAccountId()
                    };
                    this.apiJson.method = "GET";
                    var urlObj = this.shared.getUrlObject(this.section);
                    this.apiJson.endUrl = urlObj.endUrl;
                    var nodata = this.shared.getTableNoData(this.section);
                    this.tableNoData = nodata;
                    this.apiJson.sessionID = this.shared.getAuthKey();
                    var dat = JSON.stringify(data);
                    this.apiJson.data = dat;
                    this.serverApi.callApi([this.apiJson]).subscribe(function (response) {
                        _this.careerAssessmentsData = response[0].Result;
                        if (response[0].Result != null) {
                            _this.containResult.emit({ "section": _this.section, result: "filled" });
                        }
                        else {
                            _this.containResult.emit({ "section": _this.section, result: "empty" });
                        }
                    }, this.utils.handleError);
                };
                CareerAssessmentsComponent.prototype.postCareerAssessmentsData = function () {
                };
                CareerAssessmentsComponent.prototype.changeView = function (evnt) {
                    this.changeInrView.emit(evnt);
                };
                CareerAssessmentsComponent.prototype.changeFilledStatus = function (evnt) {
                    this.containResult.emit(evnt);
                };
                __decorate([
                    core_1.Input('report-status'), 
                    __metadata('design:type', Object)
                ], CareerAssessmentsComponent.prototype, "report", void 0);
                __decorate([
                    core_1.Output('changeView'), 
                    __metadata('design:type', Object)
                ], CareerAssessmentsComponent.prototype, "changeInrView", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], CareerAssessmentsComponent.prototype, "containResult", void 0);
                CareerAssessmentsComponent = __decorate([
                    core_1.Component({
                        selector: 'career-assessments',
                        templateUrl: './app/modules/PLP/shared/career-assessments/career-assessments.layout.html',
                        directives: [PLP_nav_header_component_1.PLPNavHeaderComponent],
                        providers: [shared_service_service_1.SharedService, app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, utilities_class_1.Utilities],
                        pipes: [customPipes_1.CustomDate]
                    }), 
                    __metadata('design:paramtypes', [shared_service_service_1.SharedService, app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, utilities_class_1.Utilities])
                ], CareerAssessmentsComponent);
                return CareerAssessmentsComponent;
            }());
            exports_1("CareerAssessmentsComponent", CareerAssessmentsComponent);
        }
    }
});
//# sourceMappingURL=career-assessments.component.js.map
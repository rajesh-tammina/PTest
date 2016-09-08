System.register(['@angular/core', '../shared/PLP-nav-header.component', '../shared/reflection.component', '../../../../shared/app.apicall.service', '../../../../shared/apicall.model', '../career-goals/career-goals.model', '@angular/common', '@angular/http', '../shared/shared-service.service'], function(exports_1, context_1) {
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
    var core_1, PLP_nav_header_component_1, reflection_component_1, app_apicall_service_1, apicall_model_1, career_goals_model_1, common_1, http_1, shared_service_service_1;
    var CareerGoalsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (PLP_nav_header_component_1_1) {
                PLP_nav_header_component_1 = PLP_nav_header_component_1_1;
            },
            function (reflection_component_1_1) {
                reflection_component_1 = reflection_component_1_1;
            },
            function (app_apicall_service_1_1) {
                app_apicall_service_1 = app_apicall_service_1_1;
            },
            function (apicall_model_1_1) {
                apicall_model_1 = apicall_model_1_1;
            },
            function (career_goals_model_1_1) {
                career_goals_model_1 = career_goals_model_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (shared_service_service_1_1) {
                shared_service_service_1 = shared_service_service_1_1;
            }],
        execute: function() {
            CareerGoalsComponent = (function () {
                function CareerGoalsComponent(apiService, apiJson, shared, careerGoals, http, fb) {
                    this.apiService = apiService;
                    this.apiJson = apiJson;
                    this.shared = shared;
                    this.careerGoals = careerGoals;
                    this.http = http;
                    this.report = "";
                    this.changeInrView = new core_1.EventEmitter();
                    this.containResult = new core_1.EventEmitter();
                    this.section = "CareerGoals";
                    this.field = "CareerGoals";
                }
                CareerGoalsComponent.prototype.ngOnInit = function () {
                    this.sectionObject = this.shared.getSectionObject(this.section);
                    this.questionObject = this.shared.getQuestion(this.section);
                };
                CareerGoalsComponent.prototype.changeView = function (evnt) {
                    this.changeInrView.emit(evnt);
                };
                CareerGoalsComponent.prototype.changeFilledStatus = function (evnt) {
                    this.containResult.emit(evnt);
                };
                __decorate([
                    core_1.Input('report-status'), 
                    __metadata('design:type', Object)
                ], CareerGoalsComponent.prototype, "report", void 0);
                __decorate([
                    core_1.Output('changeView'), 
                    __metadata('design:type', Object)
                ], CareerGoalsComponent.prototype, "changeInrView", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], CareerGoalsComponent.prototype, "containResult", void 0);
                CareerGoalsComponent = __decorate([
                    core_1.Component({
                        selector: 'career-goals',
                        templateUrl: './app/modules/PLP/shared/career-goals/career-goals.layout.html',
                        directives: [PLP_nav_header_component_1.PLPNavHeaderComponent, reflection_component_1.ReflectionComponent, common_1.FORM_DIRECTIVES],
                        providers: [app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, career_goals_model_1.CareerGoals, shared_service_service_1.SharedService]
                    }), 
                    __metadata('design:paramtypes', [app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, shared_service_service_1.SharedService, career_goals_model_1.CareerGoals, http_1.Http, common_1.FormBuilder])
                ], CareerGoalsComponent);
                return CareerGoalsComponent;
            }());
            exports_1("CareerGoalsComponent", CareerGoalsComponent);
        }
    }
});
//# sourceMappingURL=career-goals.component.js.map
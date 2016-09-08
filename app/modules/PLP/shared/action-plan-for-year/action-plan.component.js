System.register(['@angular/core', '@angular/common', '../shared/PLP-nav-header.component', '../shared/reflection.component', '../shared/shared-service.service', '../../../../shared/app.apicall.service', '../../../../shared/apicall.model'], function(exports_1, context_1) {
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
    var core_1, common_1, PLP_nav_header_component_1, reflection_component_1, shared_service_service_1, app_apicall_service_1, apicall_model_1;
    var ActionPlanComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (PLP_nav_header_component_1_1) {
                PLP_nav_header_component_1 = PLP_nav_header_component_1_1;
            },
            function (reflection_component_1_1) {
                reflection_component_1 = reflection_component_1_1;
            },
            function (shared_service_service_1_1) {
                shared_service_service_1 = shared_service_service_1_1;
            },
            function (app_apicall_service_1_1) {
                app_apicall_service_1 = app_apicall_service_1_1;
            },
            function (apicall_model_1_1) {
                apicall_model_1 = apicall_model_1_1;
            }],
        execute: function() {
            ActionPlanComponent = (function () {
                function ActionPlanComponent(apiService, apiJson, shared, fb) {
                    this.apiService = apiService;
                    this.apiJson = apiJson;
                    this.shared = shared;
                    this.report = "";
                    this.changeInrView = new core_1.EventEmitter();
                    this.containResult = new core_1.EventEmitter();
                    this.section = "ActionPlan";
                    this.field = "ActionPlan";
                }
                ActionPlanComponent.prototype.ngOnInit = function () {
                    this.sectionObject = this.shared.getSectionObject(this.section);
                    this.questionObject = this.shared.getQuestion(this.section);
                };
                ActionPlanComponent.prototype.changeView = function (evnt) {
                    this.changeInrView.emit(evnt);
                };
                ActionPlanComponent.prototype.changeFilledStatus = function (evnt) {
                    this.containResult.emit(evnt);
                };
                __decorate([
                    core_1.Input('report-status'), 
                    __metadata('design:type', Object)
                ], ActionPlanComponent.prototype, "report", void 0);
                __decorate([
                    core_1.Output('changeView'), 
                    __metadata('design:type', Object)
                ], ActionPlanComponent.prototype, "changeInrView", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], ActionPlanComponent.prototype, "containResult", void 0);
                ActionPlanComponent = __decorate([
                    core_1.Component({
                        selector: 'action-plan',
                        templateUrl: './app/modules/PLP/shared/action-plan-for-year/action-plan.layout.html',
                        directives: [PLP_nav_header_component_1.PLPNavHeaderComponent, reflection_component_1.ReflectionComponent, common_1.FORM_DIRECTIVES],
                        providers: [app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, shared_service_service_1.SharedService]
                    }), 
                    __metadata('design:paramtypes', [app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, shared_service_service_1.SharedService, common_1.FormBuilder])
                ], ActionPlanComponent);
                return ActionPlanComponent;
            }());
            exports_1("ActionPlanComponent", ActionPlanComponent);
        }
    }
});
//# sourceMappingURL=action-plan.component.js.map
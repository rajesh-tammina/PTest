System.register(['@angular/core', '../shared/PLP-nav-header.component', '../shared/reflection.component', '../shared/shared-service.service'], function(exports_1, context_1) {
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
    var core_1, PLP_nav_header_component_1, reflection_component_1, shared_service_service_1;
    var ExperientialLearningComponent;
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
            function (shared_service_service_1_1) {
                shared_service_service_1 = shared_service_service_1_1;
            }],
        execute: function() {
            ExperientialLearningComponent = (function () {
                function ExperientialLearningComponent(shared) {
                    this.shared = shared;
                    this.report = "";
                    this.section = "ExperientialLearning";
                    this.field = "TBD";
                }
                ExperientialLearningComponent.prototype.ngOnInit = function () {
                    this.sectionObject = this.shared.getSectionObject(this.section);
                    this.questionObject = this.shared.getQuestion(this.section);
                };
                ExperientialLearningComponent.prototype.getExperientialLearningData = function () {
                };
                __decorate([
                    core_1.Input('report-status'), 
                    __metadata('design:type', Object)
                ], ExperientialLearningComponent.prototype, "report", void 0);
                ExperientialLearningComponent = __decorate([
                    core_1.Component({
                        selector: 'experiential-learning',
                        templateUrl: './app/modules/PLP/shared/experiential-learning/experiential-learning.layout.html',
                        directives: [PLP_nav_header_component_1.PLPNavHeaderComponent, reflection_component_1.ReflectionComponent],
                        providers: [shared_service_service_1.SharedService]
                    }), 
                    __metadata('design:paramtypes', [shared_service_service_1.SharedService])
                ], ExperientialLearningComponent);
                return ExperientialLearningComponent;
            }());
            exports_1("ExperientialLearningComponent", ExperientialLearningComponent);
        }
    }
});
//# sourceMappingURL=experiential-learning.component.js.map
System.register(['@angular/core', "@angular/router", "../shared/shared/shared-service.service", '../report/report.component', '../../../shared/utilities.class', '../../../shared/app.apicall.service', "../shared/personal-info/personal-info.component", "../shared/education-plans/education-plans.component", "../shared/career-goals/career-goals.component", "../shared/action-plan-for-year/action-plan.component", "../shared/career-assessments/career-assessments.component", "../shared/career-cluster/career-cluster.component", "../shared/comments-and-signature/comments-and-signature.component", "../shared/course-plan/course-plan.component", "../shared/employment-history/employment-history.component", "../shared/experiential-learning/experiential-learning.component", "../shared/extra-activities/extra-activities.component", "../shared/graduation-requirements/graduation-requirements.component", "../shared/occ-and-cluster/occ-and-cluster.component", "../shared/schools-of-interest/schools-of-interest.component", "../shared/study-of-interest/study-of-interest.component", "../shared/support-network/support-network.component", "../shared/test-scores/test-scores.component", "../shared/volunteer-community-service/volunteer-community-service.component"], function(exports_1, context_1) {
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
    var core_1, router_1, shared_service_service_1, report_component_1, utilities_class_1, app_apicall_service_1, core_2, personal_info_component_1, education_plans_component_1, career_goals_component_1, action_plan_component_1, career_assessments_component_1, career_cluster_component_1, comments_and_signature_component_1, course_plan_component_1, employment_history_component_1, experiential_learning_component_1, extra_activities_component_1, graduation_requirements_component_1, occ_and_cluster_component_1, schools_of_interest_component_1, study_of_interest_component_1, support_network_component_1, test_scores_component_1, volunteer_community_service_component_1;
    var PlpComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (shared_service_service_1_1) {
                shared_service_service_1 = shared_service_service_1_1;
            },
            function (report_component_1_1) {
                report_component_1 = report_component_1_1;
            },
            function (utilities_class_1_1) {
                utilities_class_1 = utilities_class_1_1;
            },
            function (app_apicall_service_1_1) {
                app_apicall_service_1 = app_apicall_service_1_1;
            },
            function (personal_info_component_1_1) {
                personal_info_component_1 = personal_info_component_1_1;
            },
            function (education_plans_component_1_1) {
                education_plans_component_1 = education_plans_component_1_1;
            },
            function (career_goals_component_1_1) {
                career_goals_component_1 = career_goals_component_1_1;
            },
            function (action_plan_component_1_1) {
                action_plan_component_1 = action_plan_component_1_1;
            },
            function (career_assessments_component_1_1) {
                career_assessments_component_1 = career_assessments_component_1_1;
            },
            function (career_cluster_component_1_1) {
                career_cluster_component_1 = career_cluster_component_1_1;
            },
            function (comments_and_signature_component_1_1) {
                comments_and_signature_component_1 = comments_and_signature_component_1_1;
            },
            function (course_plan_component_1_1) {
                course_plan_component_1 = course_plan_component_1_1;
            },
            function (employment_history_component_1_1) {
                employment_history_component_1 = employment_history_component_1_1;
            },
            function (experiential_learning_component_1_1) {
                experiential_learning_component_1 = experiential_learning_component_1_1;
            },
            function (extra_activities_component_1_1) {
                extra_activities_component_1 = extra_activities_component_1_1;
            },
            function (graduation_requirements_component_1_1) {
                graduation_requirements_component_1 = graduation_requirements_component_1_1;
            },
            function (occ_and_cluster_component_1_1) {
                occ_and_cluster_component_1 = occ_and_cluster_component_1_1;
            },
            function (schools_of_interest_component_1_1) {
                schools_of_interest_component_1 = schools_of_interest_component_1_1;
            },
            function (study_of_interest_component_1_1) {
                study_of_interest_component_1 = study_of_interest_component_1_1;
            },
            function (support_network_component_1_1) {
                support_network_component_1 = support_network_component_1_1;
            },
            function (test_scores_component_1_1) {
                test_scores_component_1 = test_scores_component_1_1;
            },
            function (volunteer_community_service_component_1_1) {
                volunteer_community_service_component_1 = volunteer_community_service_component_1_1;
            }],
        execute: function() {
            PlpComponent = (function () {
                function PlpComponent(router, utils, section, apicall) {
                    this.router = router;
                    this.utils = utils;
                    this.section = section;
                    this.apicall = apicall;
                    this.menuState = false;
                    this.compleSectionsList = [];
                    this.mouseup = new core_2.EventEmitter();
                    this.mousedown = new core_2.EventEmitter();
                    this.mousemove = new core_2.EventEmitter();
                    this.resultsArr = ["PersonalInfo"];
                    this.viewMode = 'PersonalInfo';
                }
                PlpComponent.prototype.setTitle = function ($event) {
                };
                PlpComponent.prototype.ngOnInit = function () {
                    this.utils.showLoading();
                    this.sectionsList = this.section.getServiceList();
                };
                PlpComponent.prototype.menuToggle = function () {
                    this.menuState = !this.menuState;
                };
                PlpComponent.prototype.menuClose = function () {
                    this.menuState = false;
                };
                PlpComponent.prototype.navView = function (evnt) {
                    this.viewMode = evnt;
                };
                PlpComponent.prototype.userDataChanged = function (evnt) {
                    this.username = evnt.username;
                };
                PlpComponent.prototype.changeFilledStatus = function (section) {
                    if (section.result == "filled" && this.resultsArr.indexOf(section.section) == -1) {
                        this.resultsArr.push(section.section);
                    }
                    if (this.compleSectionsList.indexOf(section.section) == -1) {
                        this.compleSectionsList.push(section.section);
                    }
                    if (this.sectionsList.length == this.compleSectionsList.length) {
                        setTimeout(function () {
                            window.localStorage.setItem("loadedDone", "1");
                        }, 2000);
                        this.utils.hideLoading();
                    }
                };
                PlpComponent.prototype.logOut = function () {
                    window.localStorage.removeItem("auth_key");
                    this.apicall.sessionExpiry();
                    this.router.navigate(['login']);
                };
                PlpComponent.prototype.onmousedown = function (event) {
                    var currentDate = new Date();
                    var currentSeconds = currentDate.getTime();
                    window.localStorage.setItem('currentSec', currentSeconds + "");
                    //console.log(window.localStorage.getItem('currentSec'));
                };
                PlpComponent.prototype.keyboardInput = function (event) {
                    this.onmousedown(event);
                };
                __decorate([
                    core_2.HostListener('mousedown', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], PlpComponent.prototype, "onmousedown", null);
                __decorate([
                    core_2.HostListener('window:keydown', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], PlpComponent.prototype, "keyboardInput", null);
                PlpComponent = __decorate([
                    core_1.Component({
                        selector: 'plp-set',
                        templateUrl: './app/modules/PLP/PLP-sections/PLP-sections.layout.html',
                        directives: [router_1.ROUTER_DIRECTIVES,
                            report_component_1.ReportComponent,
                            personal_info_component_1.PersonalInfoComponent,
                            education_plans_component_1.EducationPlansComponent,
                            career_goals_component_1.CareerGoalsComponent,
                            action_plan_component_1.ActionPlanComponent,
                            career_assessments_component_1.CareerAssessmentsComponent,
                            career_cluster_component_1.CareerClusterComponent,
                            comments_and_signature_component_1.CommentsAndSignatureComponent,
                            course_plan_component_1.CoursePlanComponent,
                            employment_history_component_1.EmploymentHistoryComponent,
                            experiential_learning_component_1.ExperientialLearningComponent,
                            extra_activities_component_1.ExtraActivitiesComponent,
                            graduation_requirements_component_1.GraduationRequirementsComponent,
                            occ_and_cluster_component_1.OccAndClusterComponent,
                            schools_of_interest_component_1.SchoolsOfInterestComponent,
                            study_of_interest_component_1.StudyOfInterestComponent,
                            support_network_component_1.SupportNetworkComponent,
                            test_scores_component_1.TestScoresComponent,
                            volunteer_community_service_component_1.VolunteerCommunityServiceComponent],
                        providers: [shared_service_service_1.SharedService, utilities_class_1.Utilities, app_apicall_service_1.ServerApi]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, utilities_class_1.Utilities, shared_service_service_1.SharedService, app_apicall_service_1.ServerApi])
                ], PlpComponent);
                return PlpComponent;
            }());
            exports_1("PlpComponent", PlpComponent);
        }
    }
});
//# sourceMappingURL=PLP-sections.component.js.map
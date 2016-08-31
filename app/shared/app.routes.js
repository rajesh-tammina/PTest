System.register(['@angular/router', './authmanager', '../modules/PLP/report/report.component', "../modules/PLP/PLP-sections/PLP-sections.component", "../modules/login/login.component", "../modules/login/login-form/login-form.component", "../modules/login/new-psw/new-psw.component", "../modules/PLP/shared/personal-info/personal-info.component", "../modules/PLP/shared/education-plans/education-plans.component", "../modules/PLP/shared/career-goals/career-goals.component", "../modules/PLP/shared/action-plan-for-year/action-plan.component", "../modules/PLP/shared/career-assessments/career-assessments.component", "../modules/PLP/shared/career-cluster/career-cluster.component", "../modules/PLP/shared/comments-and-signature/comments-and-signature.component", "../modules/PLP/shared/course-plan/course-plan.component", "../modules/PLP/shared/employment-history/employment-history.component", "../modules/PLP/shared/experiential-learning/experiential-learning.component", "../modules/PLP/shared/experiential-learning-types/experiential-learning-types.component", "../modules/PLP/shared/extra-activities/extra-activities.component", "../modules/PLP/shared/graduation-requirements/graduation-requirements.component", "../modules/PLP/shared/occ-and-cluster/occ-and-cluster.component", "../modules/PLP/shared/schools-of-interest/schools-of-interest.component", "../modules/PLP/shared/study-of-interest/study-of-interest.component", "../modules/PLP/shared/support-network/support-network.component", "../modules/PLP/shared/test-scores/test-scores.component", "../modules/PLP/shared/volunteer-community-service/volunteer-community-service.component", '../modules/login/recovery-user/forgot-username.component', '../modules/login/recovery-psw/forgot-psw.component', '../modules/login/change-password/change-password-component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, authmanager_1, report_component_1, PLP_sections_component_1, login_component_1, login_form_component_1, new_psw_component_1, personal_info_component_1, education_plans_component_1, career_goals_component_1, action_plan_component_1, career_assessments_component_1, career_cluster_component_1, comments_and_signature_component_1, course_plan_component_1, employment_history_component_1, experiential_learning_component_1, experiential_learning_types_component_1, extra_activities_component_1, graduation_requirements_component_1, occ_and_cluster_component_1, schools_of_interest_component_1, study_of_interest_component_1, support_network_component_1, test_scores_component_1, volunteer_community_service_component_1, forgot_username_component_1, forgot_psw_component_1, change_password_component_1;
    var routes, appRouterProviders;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (authmanager_1_1) {
                authmanager_1 = authmanager_1_1;
            },
            function (report_component_1_1) {
                report_component_1 = report_component_1_1;
            },
            function (PLP_sections_component_1_1) {
                PLP_sections_component_1 = PLP_sections_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (login_form_component_1_1) {
                login_form_component_1 = login_form_component_1_1;
            },
            function (new_psw_component_1_1) {
                new_psw_component_1 = new_psw_component_1_1;
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
            function (experiential_learning_types_component_1_1) {
                experiential_learning_types_component_1 = experiential_learning_types_component_1_1;
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
            },
            function (forgot_username_component_1_1) {
                forgot_username_component_1 = forgot_username_component_1_1;
            },
            function (forgot_psw_component_1_1) {
                forgot_psw_component_1 = forgot_psw_component_1_1;
            },
            function (change_password_component_1_1) {
                change_password_component_1 = change_password_component_1_1;
            }],
        execute: function() {
            routes = [
                { path: '', component: login_component_1.LoginComponent, children: [
                        { path: '', component: login_form_component_1.LoginFormComponent }] },
                { path: 'newPassword/:uname/:stateAbbr/:token', component: new_psw_component_1.NewPasswordComponent },
                { path: 'plpcontent',
                    component: PLP_sections_component_1.PlpComponent,
                    children: [
                        { path: '', component: personal_info_component_1.PersonalInfoComponent, canActivate: [authmanager_1.AuthManager] },
                        { path: 'report', component: report_component_1.ReportComponent, canActivate: [authmanager_1.AuthManager] },
                        { path: 'personalInfo', component: personal_info_component_1.PersonalInfoComponent, canActivate: [authmanager_1.AuthManager] },
                        { path: 'careerGoals', component: career_goals_component_1.CareerGoalsComponent, canActivate: [authmanager_1.AuthManager] },
                        { path: 'educationPlans', component: education_plans_component_1.EducationPlansComponent, canActivate: [authmanager_1.AuthManager] },
                        { path: 'careerAssessments', component: career_assessments_component_1.CareerAssessmentsComponent, canActivate: [authmanager_1.AuthManager] },
                        { path: 'careerCluster', component: career_cluster_component_1.CareerClusterComponent, canActivate: [authmanager_1.AuthManager] },
                        { path: 'occAndCluster', component: occ_and_cluster_component_1.OccAndClusterComponent, canActivate: [authmanager_1.AuthManager] },
                        { path: 'coursePlan', component: course_plan_component_1.CoursePlanComponent, canActivate: [authmanager_1.AuthManager] },
                        { path: 'graduationRequirements', component: graduation_requirements_component_1.GraduationRequirementsComponent, canActivate: [authmanager_1.AuthManager] },
                        { path: 'testScores', component: test_scores_component_1.TestScoresComponent, canActivate: [authmanager_1.AuthManager] },
                        { path: 'studyOfInterest', component: study_of_interest_component_1.StudyOfInterestComponent, canActivate: [authmanager_1.AuthManager] },
                        { path: 'schoolsOfInterest', component: schools_of_interest_component_1.SchoolsOfInterestComponent, canActivate: [authmanager_1.AuthManager] },
                        { path: 'volunteerCommunityService', component: volunteer_community_service_component_1.VolunteerCommunityServiceComponent, canActivate: [authmanager_1.AuthManager] },
                        { path: 'extraActivities', component: extra_activities_component_1.ExtraActivitiesComponent, canActivate: [authmanager_1.AuthManager] },
                        { path: 'employmentHistory', component: employment_history_component_1.EmploymentHistoryComponent, canActivate: [authmanager_1.AuthManager] },
                        { path: 'actionPlan', component: action_plan_component_1.ActionPlanComponent, canActivate: [authmanager_1.AuthManager] },
                        { path: 'supportNetwork', component: support_network_component_1.SupportNetworkComponent, canActivate: [authmanager_1.AuthManager] },
                        { path: 'experientialLearning', component: experiential_learning_component_1.ExperientialLearningComponent, canActivate: [authmanager_1.AuthManager] },
                        { path: 'experLearningTypes', component: experiential_learning_types_component_1.ExperLearningTypesComponent, canActivate: [authmanager_1.AuthManager] },
                        { path: 'commentsAndSignature', component: comments_and_signature_component_1.CommentsAndSignatureComponent, canActivate: [authmanager_1.AuthManager] },
                        { path: 'ChangePassword', component: change_password_component_1.ChangePasswordComponent, canActivate: [authmanager_1.AuthManager] }
                    ],
                    canActivate: [authmanager_1.AuthManager] },
                { path: 'login', component: login_component_1.LoginComponent,
                    children: [
                        { path: '', component: login_form_component_1.LoginFormComponent },
                        { path: 'loginForm', component: login_form_component_1.LoginFormComponent },
                        { path: 'usernameRecovery', component: forgot_username_component_1.UsernameRecoveryComponent },
                        { path: 'passwordRecovery', component: forgot_psw_component_1.PasswordRecoveryComponent }
                    ]
                },
            ];
            exports_1("appRouterProviders", appRouterProviders = [
                router_1.provideRouter(routes)
            ]);
        }
    }
});
//# sourceMappingURL=app.routes.js.map
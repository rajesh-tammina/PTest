System.register(['@angular/router', './authmanager', '../modules/PLP/report/report.component', "../modules/PLP/PLP-sections/PLP-sections.component", "../modules/login/login.component", "../modules/login/login-form/login-form.component", "../modules/login/new-psw/new-psw.component", '../modules/login/recovery-user/forgot-username.component', '../modules/login/recovery-psw/forgot-psw.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, authmanager_1, report_component_1, PLP_sections_component_1, login_component_1, login_form_component_1, new_psw_component_1, forgot_username_component_1, forgot_psw_component_1;
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
            function (forgot_username_component_1_1) {
                forgot_username_component_1 = forgot_username_component_1_1;
            },
            function (forgot_psw_component_1_1) {
                forgot_psw_component_1 = forgot_psw_component_1_1;
            }],
        execute: function() {
            // import { ChangePasswordComponent } from '../modules/login/change-password/change-password-component';
            routes = [
                { path: '', redirectTo: "login", pathMatch: "full" },
                { path: 'login', component: login_component_1.LoginComponent,
                    children: [
                        { path: 'loginForm', component: login_form_component_1.LoginFormComponent },
                        { path: '', redirectTo: "loginForm", pathMatch: "full" },
                        { path: 'newPassword/:uname/:stateAbbr', component: new_psw_component_1.NewPasswordComponent },
                        { path: 'usernameRecovery', component: forgot_username_component_1.UsernameRecoveryComponent },
                        { path: 'passwordRecovery', component: forgot_psw_component_1.PasswordRecoveryComponent }
                    ]
                },
                { path: 'plpcontent',
                    component: PLP_sections_component_1.PlpComponent,
                    children: [
                        //               { path: 'personalInfo', component:  PersonalInfoComponent,canActivate:[AuthManager]},
                        { path: '' },
                        { path: 'report', component: report_component_1.ReportComponent, canActivate: [authmanager_1.AuthManager] }
                    ],
                    canActivate: [authmanager_1.AuthManager] }
            ];
            exports_1("appRouterProviders", appRouterProviders = [
                router_1.provideRouter(routes)
            ]);
        }
    }
});
//# sourceMappingURL=app.routes.js.map
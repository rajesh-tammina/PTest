System.register(['@angular/platform-browser-dynamic', '@angular/http', './app.component', '@angular/core', '@angular/forms', './shared/app.routes', './shared/authmanager'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, http_1, app_component_1, core_1, forms_1, app_routes_1, authmanager_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (app_routes_1_1) {
                app_routes_1 = app_routes_1_1;
            },
            function (authmanager_1_1) {
                authmanager_1 = authmanager_1_1;
            }],
        execute: function() {
            core_1.enableProdMode();
            platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [forms_1.disableDeprecatedForms(), forms_1.provideForms(), app_routes_1.appRouterProviders, http_1.HTTP_PROVIDERS, authmanager_1.AuthManager])
                .catch(function (err) { return console.error(err); });
        }
    }
});
//# sourceMappingURL=main.js.map
System.register(['@angular/core', '@angular/common', '../../../../shared/apicall.model', '../shared/common-validation', '../personal-info/personal-info.model', '../shared/PLP-nav-header.component', '../../../../shared/app.apicall.service', '../shared/shared-service.service'], function(exports_1, context_1) {
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
    var core_1, common_1, apicall_model_1, common_validation_1, personal_info_model_1, PLP_nav_header_component_1, app_apicall_service_1, shared_service_service_1;
    var PersonalInfoComponent;
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
            function (personal_info_model_1_1) {
                personal_info_model_1 = personal_info_model_1_1;
            },
            function (PLP_nav_header_component_1_1) {
                PLP_nav_header_component_1 = PLP_nav_header_component_1_1;
            },
            function (app_apicall_service_1_1) {
                app_apicall_service_1 = app_apicall_service_1_1;
            },
            function (shared_service_service_1_1) {
                shared_service_service_1 = shared_service_service_1_1;
            }],
        execute: function() {
            PersonalInfoComponent = (function () {
                function PersonalInfoComponent(personalInfoService, personalInfoModel, apiJson, apiJson1, shared, fb) {
                    this.personalInfoService = personalInfoService;
                    this.personalInfoModel = personalInfoModel;
                    this.apiJson = apiJson;
                    this.apiJson1 = apiJson1;
                    this.shared = shared;
                    this.report = "";
                    this.section = "PersonalInfo";
                    this.isLoading = true;
                    this.userInfo = new personal_info_model_1.PersonalInfoModel;
                    this.personalForm = fb.group({
                        lastName: ["", common_1.Validators.compose([common_1.Validators.required,
                                common_validation_1.CustomValidations.nameValid])],
                        firstName: ["", common_1.Validators.compose([common_validation_1.CustomValidations.nameValid])],
                        middleName: ["", common_1.Validators.compose([common_validation_1.CustomValidations.nameValid])],
                        email: ["", common_1.Validators.compose([common_1.Validators.required, common_validation_1.CustomValidations.mailFormat])],
                        gradYear: ["", common_1.Validators.required]
                    });
                }
                //The method is called when the component is initialized 
                PersonalInfoComponent.prototype.ngOnInit = function () {
                    this.sectionObject = this.shared.getSectionObject(this.section);
                    this.getPersonalInfo();
                };
                //The below method is used to get the data from server.
                PersonalInfoComponent.prototype.getPersonalInfo = function () {
                    var _this = this;
                    var userdata = {
                        stateAbbr: this.shared.getStateAbbr(),
                        accountID: this.shared.getAccountId()
                    };
                    this.apiJson.method = "GET";
                    var urlObj = this.shared.getUrlObject(this.section);
                    this.apiJson.endUrl = urlObj.endUrl;
                    //this.apiJson.endUrl = "Account";
                    this.apiJson.sessionID = this.shared.getAuthKey();
                    var user = JSON.stringify(userdata);
                    this.apiJson.data = user;
                    this.personalInfoService.callApi([this.apiJson]).subscribe(function (resp) {
                        _this.userInfo = resp[0].Result;
                        _this.userInfo.UserFullName = _this.userInfo.FirstName + " " + _this.userInfo.LastName;
                        _this.isLoading = false;
                    });
                };
                //The below method is used to send the data to the server
                PersonalInfoComponent.prototype.SavePersonalInfo = function () {
                    this.apiJson.method = "POST";
                    this.apiJson.endUrl = "Account";
                    this.apiJson.sessionID = this.shared.getAuthKey();
                    var user = JSON.stringify(this.userInfo);
                    this.apiJson.data = user;
                    this.personalInfoService.callApi([this.apiJson]).subscribe(function (response) {
                    });
                };
                __decorate([
                    core_1.Input('report-status'), 
                    __metadata('design:type', Object)
                ], PersonalInfoComponent.prototype, "report", void 0);
                PersonalInfoComponent = __decorate([
                    core_1.Component({
                        selector: 'personal-info',
                        templateUrl: './app/modules/PLP/shared/personal-info/personal-info.layout.html',
                        directives: [PLP_nav_header_component_1.PLPNavHeaderComponent, common_1.FORM_DIRECTIVES],
                        providers: [app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, personal_info_model_1.PersonalInfoModel, shared_service_service_1.SharedService]
                    }), 
                    __metadata('design:paramtypes', [app_apicall_service_1.ServerApi, personal_info_model_1.PersonalInfoModel, apicall_model_1.ApiCallClass, apicall_model_1.ApiCallClass, shared_service_service_1.SharedService, common_1.FormBuilder])
                ], PersonalInfoComponent);
                return PersonalInfoComponent;
            }());
            exports_1("PersonalInfoComponent", PersonalInfoComponent);
        }
    }
});
//# sourceMappingURL=personal-info.component.js.map
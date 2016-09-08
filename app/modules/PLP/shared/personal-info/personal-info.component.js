System.register(['@angular/core', '@angular/common', '../../../../shared/apicall.model', '../shared/common-validation', '../personal-info/personal-info.model', '../shared/PLP-nav-header.component', '../../../../shared/app.apicall.service', '../shared/shared-service.service', '../../../../shared/utilities.class'], function(exports_1, context_1) {
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
    var core_1, common_1, apicall_model_1, common_validation_1, personal_info_model_1, PLP_nav_header_component_1, app_apicall_service_1, shared_service_service_1, utilities_class_1;
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
            },
            function (utilities_class_1_1) {
                utilities_class_1 = utilities_class_1_1;
            }],
        execute: function() {
            PersonalInfoComponent = (function () {
                function PersonalInfoComponent(serverApi, utils, personalInfoModel, apiJson, apiJson1, shared, fb) {
                    this.serverApi = serverApi;
                    this.utils = utils;
                    this.personalInfoModel = personalInfoModel;
                    this.apiJson = apiJson;
                    this.apiJson1 = apiJson1;
                    this.shared = shared;
                    this.report = "";
                    this.changeInrView = new core_1.EventEmitter();
                    this.containResult = new core_1.EventEmitter();
                    this.userDataChanged = new core_1.EventEmitter();
                    this.section = "PersonalInfo";
                    this.isLoading = true;
                    this.userInfo = new personal_info_model_1.PersonalInfoModel;
                    this.edited = false;
                    this.errorVal = false;
                    this.personalForm = fb.group({
                        lastName: ["", common_1.Validators.compose([common_1.Validators.required,
                                common_validation_1.CustomValidations.nameValid, common_1.Validators.maxLength(50)])],
                        firstName: ["", common_1.Validators.compose([common_1.Validators.required, common_validation_1.CustomValidations.nameValid, common_1.Validators.maxLength(50)])],
                        middleName: ["", common_1.Validators.compose([common_validation_1.CustomValidations.nameValid, common_1.Validators.maxLength(50)])],
                        email: ["", common_1.Validators.compose([common_validation_1.CustomValidations.mailFormat, common_1.Validators.maxLength(50)])],
                        gradYear: ["", common_1.Validators.compose([common_1.Validators.required, common_validation_1.CustomValidations.containOnlyNumerals])]
                    });
                    this.errorMessage = this.shared.getMessages();
                }
                PersonalInfoComponent.prototype.changeView = function (evnt) {
                    this.changeInrView.emit(evnt);
                };
                //The method is called when the component is initialized 
                PersonalInfoComponent.prototype.ngOnInit = function () {
                    this.sectionObject = this.shared.getSectionObject(this.section);
                    //this.utils.showLoading();
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
                    this.serverApi.callApi([this.apiJson]).subscribe(function (response) {
                        _this.userInfo = response[0].Result;
                        _this.userInfo.UserFullName = _this.userInfo.FirstName + " " + _this.userInfo.LastName;
                        if (_this.userInfo.Avatar == null) {
                            _this.userInfo.Avatar = "./app/images/no-profile-image.jpg";
                        }
                        if ((_this.userInfo.LastName != "") && (_this.userInfo.FirstName != "") && (_this.userInfo.GradYear != "")) {
                            _this.containResult.emit({ "section": _this.section, result: "filled" });
                            _this.userDataChanged.emit({ "username": _this.userInfo.UserFullName });
                        }
                        else {
                            _this.containResult.emit({ "section": _this.section, result: "empty" });
                        }
                        // this.utils.hideLoading();
                        // this.isLoading = false;
                    }, this.utils.handleError);
                };
                //The below method is used to send the data to the server
                PersonalInfoComponent.prototype.SavePersonalInfo = function () {
                    var _this = this;
                    this.utils.showLoading();
                    this.apiJson.method = "POST";
                    this.apiJson.endUrl = "Account";
                    var email = this.userInfo.Email;
                    if (email == null) {
                        email = "";
                    }
                    var data = {
                        "StateAbbr": this.shared.getStateAbbr(),
                        "AccountID": this.shared.getAccountId(),
                        "FirstName": this.userInfo.FirstName,
                        "LastName": this.userInfo.LastName,
                        "MiddleName": this.userInfo.MiddleName,
                        "GradYear": this.userInfo.GradYear,
                        "Email": email
                    };
                    this.apiJson.sessionID = this.shared.getAuthKey();
                    var user = JSON.stringify(data);
                    this.apiJson.data = user;
                    this.serverApi.callApi([this.apiJson]).subscribe(function (response) {
                        if (response.Result + "" == "true") {
                            _this.utils.hideLoading();
                            var successMsg = _this.shared.getSuccessMessage(_this.section);
                            _this.successLabel = successMsg.update;
                            // alert(successMsg.error);
                            _this.edited = true;
                            if ((_this.userInfo.LastName != "") && (_this.userInfo.FirstName != "") && (_this.userInfo.GradYear != "")) {
                                _this.containResult.emit({ "section": _this.section, result: "filled" });
                                _this.userDataChanged.emit({ "username": _this.userInfo.UserFullName });
                            }
                            else {
                                _this.containResult.emit({ "section": _this.section, result: "empty" });
                            }
                            //wait 3 Seconds and hide
                            setTimeout(function () {
                                this.edited = false;
                                // console.log(this.edited);
                            }.bind(_this), 5000);
                        }
                        else {
                            _this.utils.hideLoading();
                            var successMsg = _this.shared.getSuccessMessage(_this.section);
                            _this.successLabel = successMsg.error;
                            _this.errorVal = true;
                            //wait 3 Seconds and hide
                            setTimeout(function () {
                                this.errorVal = false;
                                // console.log(this.edited);
                            }.bind(_this), 5000);
                        }
                        _this.userInfo.UserFullName = _this.userInfo.FirstName + " " + _this.userInfo.LastName;
                        _this.userDataChanged.emit({ "username": _this.userInfo.UserFullName });
                    }, function (error) { return _this.logError(error); });
                };
                PersonalInfoComponent.prototype.logError = function (error) {
                    // alert(error);
                    this.utils.hideLoading();
                    var successMsg = this.shared.getSuccessMessage(this.section);
                    this.successLabel = successMsg.error;
                    this.errorVal = true;
                    //wait 3 Seconds and hide
                    setTimeout(function () {
                        this.errorVal = false;
                        // console.log(this.edited);
                    }.bind(this), 5000);
                };
                __decorate([
                    core_1.Input('report-status'), 
                    __metadata('design:type', Object)
                ], PersonalInfoComponent.prototype, "report", void 0);
                __decorate([
                    core_1.Output('changeView'), 
                    __metadata('design:type', Object)
                ], PersonalInfoComponent.prototype, "changeInrView", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], PersonalInfoComponent.prototype, "containResult", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], PersonalInfoComponent.prototype, "userDataChanged", void 0);
                PersonalInfoComponent = __decorate([
                    core_1.Component({
                        selector: 'personal-info',
                        templateUrl: './app/modules/PLP/shared/personal-info/personal-info.layout.html',
                        directives: [PLP_nav_header_component_1.PLPNavHeaderComponent, common_1.FORM_DIRECTIVES],
                        providers: [app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, personal_info_model_1.PersonalInfoModel, shared_service_service_1.SharedService, utilities_class_1.Utilities]
                    }), 
                    __metadata('design:paramtypes', [app_apicall_service_1.ServerApi, utilities_class_1.Utilities, personal_info_model_1.PersonalInfoModel, apicall_model_1.ApiCallClass, apicall_model_1.ApiCallClass, shared_service_service_1.SharedService, common_1.FormBuilder])
                ], PersonalInfoComponent);
                return PersonalInfoComponent;
            }());
            exports_1("PersonalInfoComponent", PersonalInfoComponent);
        }
    }
});
//# sourceMappingURL=personal-info.component.js.map
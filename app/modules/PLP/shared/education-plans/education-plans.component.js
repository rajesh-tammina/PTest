System.register(['@angular/core', '../shared/PLP-nav-header.component', '../shared/reflection.component', '../../../../shared/app.apicall.service', '../../../../shared/apicall.model', '../education-plans/education-plans.model', '@angular/common', '@angular/http', '../shared/shared-service.service', '../../../../shared/utilities.class', '../../../../shared/customPipes', "../../../../shared/app.constants"], function(exports_1, context_1) {
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
    var core_1, PLP_nav_header_component_1, reflection_component_1, app_apicall_service_1, apicall_model_1, education_plans_model_1, common_1, http_1, shared_service_service_1, utilities_class_1, customPipes_1, sections;
    var EducationPlansComponent;
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
            function (education_plans_model_1_1) {
                education_plans_model_1 = education_plans_model_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (shared_service_service_1_1) {
                shared_service_service_1 = shared_service_service_1_1;
            },
            function (utilities_class_1_1) {
                utilities_class_1 = utilities_class_1_1;
            },
            function (customPipes_1_1) {
                customPipes_1 = customPipes_1_1;
            },
            function (sections_1) {
                sections = sections_1;
            }],
        execute: function() {
            EducationPlansComponent = (function () {
                function EducationPlansComponent(serverApi, utils, apiJson, apiJson1, shared, educationPlansModel, http, fb) {
                    this.serverApi = serverApi;
                    this.utils = utils;
                    this.apiJson = apiJson;
                    this.apiJson1 = apiJson1;
                    this.shared = shared;
                    this.educationPlansModel = educationPlansModel;
                    this.http = http;
                    this.fb = fb;
                    this.report = "";
                    this.changeInrView = new core_1.EventEmitter();
                    this.containResult = new core_1.EventEmitter();
                    this.section = "EducationPlans";
                    this.field = "PSPlans";
                    this.currentFlag = "";
                    this.selectedList = [];
                    this.education = [];
                    this.educationPlanCheck = new education_plans_model_1.EducationPlansModel();
                    this.educationSavedDt = "";
                    this.educationCompa = [];
                    this.saveOnchangeVal = [];
                    this.educationPlanRef = {
                        "LastSaved": new Date,
                        "userNotes": ""
                    };
                    this.educationPostReq = {
                        "stateAbbr": "",
                        "accountID": "",
                        "fieldName": "",
                        "userNotes": ""
                    };
                    this.userNotesPost = "";
                    this.edited = false;
                    this.errorVal = false;
                }
                EducationPlansComponent.prototype.ngOnInit = function () {
                    this.sectionObject = this.shared.getSectionObject(this.section);
                    this.questionObject = this.shared.getQuestion(this.section);
                    this.educationFieldList = sections.educationFieldsArr;
                    this.educationForm = this.fb.group({
                        userNotes: ['', common_1.Validators.required]
                    });
                    this.getEducationPlans();
                };
                EducationPlansComponent.prototype.getEducationPlans = function () {
                    var _this = this;
                    this.apiJson = new apicall_model_1.ApiCallClass();
                    var urlObj = this.shared.getUrlObject(this.section);
                    this.apiJson.endUrl = urlObj.endUrl;
                    var userdata = {
                        stateAbbr: this.shared.getStateAbbr(),
                        accountID: this.shared.getAccountId(),
                        fieldName: urlObj.fieldNameCheck
                    };
                    this.apiJson.method = "GET";
                    this.apiJson.sessionID = this.shared.getAuthKey();
                    var user = JSON.stringify(userdata);
                    this.apiJson.data = user;
                    this.serverApi.callApi([this.apiJson]).subscribe(function (response) {
                        _this.educationPlanCheck = response[0].Result;
                        _this.educationSavedDt = response[0].Result.UpdatedTimeStamp;
                        if (_this.educationPlanCheck.UserNotes != null) {
                            _this.selectedList = _this.educationPlanCheck.UserNotes.split(',');
                            for (var i = 0; i < _this.selectedList.length; i++) {
                                _this.educationCompa.push({ "usernotes": _this.selectedList[i] });
                            }
                        }
                        if (_this.educationFieldList.length > 0) {
                            _this.educationFieldList.forEach(function (obj, key) {
                                _this.educationCompa.forEach(function (k, v) {
                                    if (obj.value == k.usernotes) {
                                        obj.selected = true;
                                    }
                                });
                            });
                        }
                        //alert(response[0].Result.UserNotes);
                        if (response[0].Result.UserNotes != "" && response[0].Result.UserNotes != null) {
                            _this.containResult.emit({ "section": _this.section, result: "filled" });
                        }
                        else {
                            _this.containResult.emit({ "section": _this.section, result: "empty" });
                        }
                    }, this.utils.handleError);
                };
                EducationPlansComponent.prototype.insertEducationPlanRef = function () {
                    this.educationPlansModel.Today = new Date();
                    var day = this.educationPlansModel.Today.getDate();
                    var monthIndex = this.educationPlansModel.Today.getMonth();
                    var year = this.educationPlansModel.Today.getFullYear();
                    var todayDate = day + "/" + monthIndex + "/" + year;
                    this.educationPlanRef.userNotes = todayDate + "\n" + this.educationPlanRef.userNotes;
                };
                EducationPlansComponent.prototype.saveEducationPlanCheck = function () {
                    var _this = this;
                    var currentValue = "";
                    this.utils.showLoading();
                    var cnt = 0;
                    //alert(JSON.stringify(this.educationFieldList));
                    if (this.educationFieldList.length > 0) {
                        this.educationFieldList.forEach(function (obj, key) {
                            if (obj.selected == true) {
                                if (cnt == 0) {
                                    currentValue = obj.value;
                                }
                                else {
                                    currentValue = currentValue + "," + obj.value;
                                }
                            }
                            cnt++;
                        });
                    }
                    //alert("currentValue--->"+currentValue);
                    var urlObj = this.shared.getUrlObject(this.section);
                    this.apiJson.endUrl = urlObj.endUrl;
                    this.apiJson.method = "POST";
                    this.apiJson.sessionID = this.shared.getAuthKey();
                    this.educationPostReq = {
                        "stateAbbr": this.shared.getStateAbbr(),
                        "accountID": this.shared.getAccountId(),
                        "fieldName": urlObj.edufieldName,
                        "userNotes": currentValue
                    };
                    var user = JSON.stringify(this.educationPostReq);
                    //alert("user-->"+user);
                    this.apiJson.data = user;
                    this.serverApi.callApi([this.apiJson]).subscribe(function (response) {
                        // alert(response.Result);
                        if (response.Result + "" == "true") {
                            _this.utils.hideLoading();
                            var dd = new Date();
                            _this.educationSavedDt = dd.toDateString();
                            var successMsg = _this.shared.getSuccessMessage(_this.section);
                            _this.successLabel = successMsg.save;
                            _this.edited = true;
                            if (currentValue == "" || currentValue == null) {
                                _this.containResult.emit({ "section": _this.section, result: "empty" });
                            }
                            else {
                                _this.containResult.emit({ "section": _this.section, result: "filled" });
                            }
                            //wait 5 Seconds and hide
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
                            //wait 5 Seconds and hide
                            setTimeout(function () {
                                this.errorVal = false;
                                // console.log(this.edited);
                            }.bind(_this), 5000);
                        }
                    }, function (error) { return _this.logError(error); });
                };
                EducationPlansComponent.prototype.logError = function (error) {
                    this.utils.hideLoading();
                    var successMsg = this.shared.getSuccessMessage(this.section);
                    this.successLabel = successMsg.error;
                    this.errorVal = true;
                    //wait 5 Seconds and hide
                    setTimeout(function () {
                        this.errorVal = false;
                        // console.log(this.edited);
                    }.bind(this), 5000);
                };
                EducationPlansComponent.prototype.changeView = function (evnt) {
                    this.changeInrView.emit(evnt);
                };
                EducationPlansComponent.prototype.changeFilledStatus = function (evnt) {
                    this.containResult.emit(evnt);
                };
                __decorate([
                    core_1.Input('report-status'), 
                    __metadata('design:type', Object)
                ], EducationPlansComponent.prototype, "report", void 0);
                __decorate([
                    core_1.Output('changeView'), 
                    __metadata('design:type', Object)
                ], EducationPlansComponent.prototype, "changeInrView", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], EducationPlansComponent.prototype, "containResult", void 0);
                EducationPlansComponent = __decorate([
                    core_1.Component({
                        selector: 'education-plans',
                        templateUrl: './app/modules/PLP/shared/education-plans/education-plans.layout.html',
                        directives: [PLP_nav_header_component_1.PLPNavHeaderComponent, common_1.FORM_DIRECTIVES, reflection_component_1.ReflectionComponent],
                        providers: [app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, education_plans_model_1.EducationPlansModel, shared_service_service_1.SharedService, utilities_class_1.Utilities],
                        pipes: [customPipes_1.CustomDate]
                    }), 
                    __metadata('design:paramtypes', [app_apicall_service_1.ServerApi, utilities_class_1.Utilities, apicall_model_1.ApiCallClass, apicall_model_1.ApiCallClass, shared_service_service_1.SharedService, education_plans_model_1.EducationPlansModel, http_1.Http, common_1.FormBuilder])
                ], EducationPlansComponent);
                return EducationPlansComponent;
            }());
            exports_1("EducationPlansComponent", EducationPlansComponent);
        }
    }
});
//# sourceMappingURL=education-plans.component.js.map
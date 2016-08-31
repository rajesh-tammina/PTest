System.register(['@angular/core', '@angular/common', '../../../../shared/apicall.model', '../shared/common-validation', './reflection.model', '../../../../shared/app.apicall.service', './shared-service.service', "../../../../shared/app.constants"], function(exports_1, context_1) {
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
    var core_1, common_1, apicall_model_1, common_validation_1, reflection_model_1, app_apicall_service_1, shared_service_service_1, sections;
    var ReflectionComponent;
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
            function (reflection_model_1_1) {
                reflection_model_1 = reflection_model_1_1;
            },
            function (app_apicall_service_1_1) {
                app_apicall_service_1 = app_apicall_service_1_1;
            },
            function (shared_service_service_1_1) {
                shared_service_service_1 = shared_service_service_1_1;
            },
            function (sections_1) {
                sections = sections_1;
            }],
        execute: function() {
            ReflectionComponent = (function () {
                function ReflectionComponent(apiService, apiJson, reflectionModel, shared, fb) {
                    this.apiService = apiService;
                    this.apiJson = apiJson;
                    this.reflectionModel = reflectionModel;
                    this.shared = shared;
                    this.reflectionObj = "";
                    this.fieldName = "";
                    this.sectionName = "";
                    this.question = "";
                    this.report = "";
                    this.reflectionInfo = new reflection_model_1.ReflectionModel();
                    this.userdata = {
                        stateAbbr: "IC",
                        accountID: 7662,
                        fieldName: ""
                    };
                    this.reflectionForm = fb.group({
                        ReflectionText: ["", common_1.Validators.compose([common_validation_1.CustomValidations.noScript])]
                    });
                }
                ReflectionComponent.prototype.ngOnInit = function () {
                    this.endurl = sections.EndUrlArr;
                    this.getReflection();
                };
                //This function is used to get data from server 
                ReflectionComponent.prototype.getReflection = function () {
                    var _this = this;
                    this.apiJson.method = "GET";
                    var urlObj = this.shared.getUrlObject(this.sectionName);
                    this.apiJson.endUrl = urlObj.endUrl;
                    this.apiJson.sessionID = this.shared.getAuthKey();
                    this.userdata.fieldName = this.fieldName;
                    var user = JSON.stringify(this.userdata);
                    this.apiJson.data = user;
                    this.apiService.callApi([this.apiJson]).subscribe(function (resp) {
                        _this.reflectionInfo = resp[0].Result;
                    });
                };
                //This function is used to post data to server
                ReflectionComponent.prototype.saveReflectionInfo = function () {
                    this.apiJson.method = "POST";
                    var urlObj = this.shared.getUrlObject(this.sectionName);
                    if (urlObj.section == "EducationPlans") {
                        alert("coming in if");
                        this.reflectionFieldName = urlObj.fieldNameRef;
                    }
                    else {
                        this.reflectionFieldName = urlObj.fieldName;
                    }
                    this.apiJson.endUrl = urlObj.endUrl;
                    this.apiJson.sessionID = this.shared.getAuthKey();
                    this.reflectionPostReq = {
                        "StateAbbr": this.shared.getStateAbbr(),
                        "AccountID": this.shared.getAccountId(),
                        "FieldName": this.reflectionFieldName,
                        "UserNotes": this.reflectionInfo.UserNotes
                    };
                    var user = JSON.stringify(this.reflectionPostReq);
                    this.apiJson.data = user;
                    this.apiService.callApi([this.apiJson]).subscribe(function (response) {
                    });
                };
                ReflectionComponent.prototype.InsertReflectionInfo = function () {
                    this.reflectionModel.Today = new Date();
                    var day = this.reflectionModel.Today.getDate();
                    var monthIndex = this.reflectionModel.Today.getMonth();
                    var year = this.reflectionModel.Today.getFullYear();
                    var todayDate = day + "/" + monthIndex + "/" + year;
                    this.reflectionInfo.UserNotes = todayDate + "\n" + this.reflectionInfo.UserNotes;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ReflectionComponent.prototype, "reflectionObj", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ReflectionComponent.prototype, "fieldName", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], ReflectionComponent.prototype, "sectionName", void 0);
                __decorate([
                    core_1.Input('question'), 
                    __metadata('design:type', Object)
                ], ReflectionComponent.prototype, "question", void 0);
                __decorate([
                    core_1.Input('report-status'), 
                    __metadata('design:type', Object)
                ], ReflectionComponent.prototype, "report", void 0);
                ReflectionComponent = __decorate([
                    core_1.Component({
                        selector: 'reflection',
                        templateUrl: './app/modules/PLP/shared/shared/reflection.layout.html',
                        directives: [common_1.FORM_DIRECTIVES],
                        providers: [app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, reflection_model_1.ReflectionModel, shared_service_service_1.SharedService]
                    }), 
                    __metadata('design:paramtypes', [app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, reflection_model_1.ReflectionModel, shared_service_service_1.SharedService, common_1.FormBuilder])
                ], ReflectionComponent);
                return ReflectionComponent;
            }());
            exports_1("ReflectionComponent", ReflectionComponent);
        }
    }
});
//# sourceMappingURL=reflection.component.js.map
System.register(['@angular/core', '@angular/common', '../../../../shared/apicall.model', '../shared/common-validation', './reflection.model', '../../../../shared/app.apicall.service', './shared-service.service', '../../../../shared/utilities.class', '../../../../shared/customPipes', "../../../../shared/app.constants", "../../../../shared/messages"], function(exports_1, context_1) {
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
    var core_1, common_1, apicall_model_1, common_validation_1, reflection_model_1, app_apicall_service_1, shared_service_service_1, utilities_class_1, customPipes_1, sections, messages;
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
            function (utilities_class_1_1) {
                utilities_class_1 = utilities_class_1_1;
            },
            function (customPipes_1_1) {
                customPipes_1 = customPipes_1_1;
            },
            function (sections_1) {
                sections = sections_1;
            },
            function (messages_1) {
                messages = messages_1;
            }],
        execute: function() {
            ReflectionComponent = (function () {
                function ReflectionComponent(serverApi, utils, apiJson, reflectionModel, shared, fb) {
                    this.serverApi = serverApi;
                    this.utils = utils;
                    this.apiJson = apiJson;
                    this.reflectionModel = reflectionModel;
                    this.shared = shared;
                    this.reflectionObj = "";
                    this.fieldName = "";
                    this.sectionName = "";
                    this.question = "";
                    this.report = "";
                    this.containResult = new core_1.EventEmitter();
                    this.reflectionInfo = new reflection_model_1.ReflectionModel();
                    this.edited = false;
                    this.errorVal = false;
                    this.userdata = {
                        stateAbbr: this.shared.getStateAbbr(),
                        accountID: this.shared.getAccountId(),
                        fieldName: ""
                    };
                    this.reflectionForm = fb.group({
                        ReflectionText: ["", common_1.Validators.compose([common_validation_1.CustomValidations.noScript, common_1.Validators.maxLength(7500)])]
                    });
                    this.errorMessage = messages.messages;
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
                    this.serverApi.callApi([this.apiJson]).subscribe(function (response) {
                        _this.reflectionInfo = response[0].Result;
                        //alert("getReflection data is:"+response[0].Result.UserNotes);
                        if (response[0].Result.UserNotes != "" && response[0].Result.UserNotes != null && response[0].Result != null) {
                            _this.containResult.emit({ "section": _this.sectionName, result: "filled" });
                        }
                        else {
                            _this.containResult.emit({ "section": _this.sectionName, result: "empty" });
                        }
                    }, this.utils.handleError);
                };
                //This function is used to post data to server
                ReflectionComponent.prototype.saveReflectionInfo = function () {
                    var _this = this;
                    this.utils.showLoading();
                    this.apiJson.method = "POST";
                    var urlObj = this.shared.getUrlObject(this.sectionName);
                    if (urlObj.section == "EducationPlans") {
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
                    this.serverApi.callApi([this.apiJson]).subscribe(function (response) {
                        //alert("response===>"+response.Result);
                        if (response.Result + "" == "true") {
                            _this.utils.hideLoading();
                            var dd = new Date();
                            _this.reflectionInfo.UpdatedTimeStamp = dd.toDateString();
                            var successMsg = _this.shared.getSuccessMessage(_this.sectionName);
                            _this.successLabel = successMsg.save;
                            // alert(successMsg.error);
                            _this.edited = true;
                            //wait 3 Seconds and hide
                            //alert("this.reflectionInfo.UserNotes"+this.reflectionInfo.UserNotes);
                            if (_this.reflectionInfo.UserNotes == "" || _this.reflectionInfo.UserNotes == null) {
                                //  alert("coming in if");
                                _this.containResult.emit({ "section": _this.sectionName, result: "empty" });
                            }
                            else {
                                _this.containResult.emit({ "section": _this.sectionName, result: "filled" });
                            }
                            setTimeout(function () {
                                this.edited = false;
                                // console.log(this.edited);
                            }.bind(_this), 5000);
                        }
                        else {
                            _this.utils.hideLoading();
                            var successMsg = _this.shared.getSuccessMessage(_this.sectionName);
                            _this.successLabel = successMsg.error;
                            _this.errorVal = true;
                            //wait 3 Seconds and hide
                            setTimeout(function () {
                                this.errorVal = false;
                                // console.log(this.edited);
                            }.bind(_this), 5000);
                        }
                    }, function (error) { return _this.logError(error); });
                };
                ReflectionComponent.prototype.logError = function (error) {
                    this.utils.hideLoading();
                    var successMsg = this.shared.getSuccessMessage(this.sectionName);
                    this.successLabel = successMsg.error;
                    this.errorVal = true;
                    //wait 3 Seconds and hide
                    setTimeout(function () {
                        this.errorVal = false;
                        // console.log(this.edited);
                    }.bind(this), 5000);
                };
                ReflectionComponent.prototype.InsertReflectionInfo = function () {
                    try {
                        var dt = new Date();
                        var day = dt.getDate();
                        var monthIndex = dt.getMonth() + 1; //January is 0!
                        var year = dt.getFullYear();
                        var mm = monthIndex + "";
                        var dd = day + "";
                        if (day < 10) {
                            dd = '0' + day;
                        }
                        if (monthIndex < 10) {
                            mm = '0' + monthIndex;
                        }
                        var todayDate = mm + "/" + dd + "/" + year;
                        this.reflectionInfo.UserNotes = todayDate + "\n" + this.reflectionInfo.UserNotes;
                    }
                    catch (e) {
                        alert("insert date exception:" + e.message);
                    }
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
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], ReflectionComponent.prototype, "containResult", void 0);
                ReflectionComponent = __decorate([
                    core_1.Component({
                        selector: 'reflection',
                        templateUrl: './app/modules/PLP/shared/shared/reflection.layout.html',
                        directives: [common_1.FORM_DIRECTIVES],
                        providers: [app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, reflection_model_1.ReflectionModel, shared_service_service_1.SharedService, utilities_class_1.Utilities],
                        pipes: [customPipes_1.CustomDate]
                    }), 
                    __metadata('design:paramtypes', [app_apicall_service_1.ServerApi, utilities_class_1.Utilities, apicall_model_1.ApiCallClass, reflection_model_1.ReflectionModel, shared_service_service_1.SharedService, common_1.FormBuilder])
                ], ReflectionComponent);
                return ReflectionComponent;
            }());
            exports_1("ReflectionComponent", ReflectionComponent);
        }
    }
});
//# sourceMappingURL=reflection.component.js.map
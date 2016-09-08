System.register(['@angular/core', '@angular/common', '../shared/PLP-nav-header.component', '../shared/shared-service.service', '../../../../shared/apicall.model', '../../../../shared/app.apicall.service', '../../../../shared/utilities.class', "../../../../shared/app.constants", '../shared/common-validation'], function(exports_1, context_1) {
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
    var core_1, common_1, PLP_nav_header_component_1, shared_service_service_1, apicall_model_1, app_apicall_service_1, utilities_class_1, sections, common_validation_1;
    var ExperientialLearningComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (PLP_nav_header_component_1_1) {
                PLP_nav_header_component_1 = PLP_nav_header_component_1_1;
            },
            function (shared_service_service_1_1) {
                shared_service_service_1 = shared_service_service_1_1;
            },
            function (apicall_model_1_1) {
                apicall_model_1 = apicall_model_1_1;
            },
            function (app_apicall_service_1_1) {
                app_apicall_service_1 = app_apicall_service_1_1;
            },
            function (utilities_class_1_1) {
                utilities_class_1 = utilities_class_1_1;
            },
            function (sections_1) {
                sections = sections_1;
            },
            function (common_validation_1_1) {
                common_validation_1 = common_validation_1_1;
            }],
        execute: function() {
            ExperientialLearningComponent = (function () {
                function ExperientialLearningComponent(shared, utils, apiJson, serverApi, fb) {
                    this.shared = shared;
                    this.utils = utils;
                    this.apiJson = apiJson;
                    this.serverApi = serverApi;
                    this.report = "";
                    this.changeInrView = new core_1.EventEmitter();
                    this.containResult = new core_1.EventEmitter();
                    this.section = "ExperientialLearning";
                    this.experientialLearningData = [];
                    this.TotalExperientialLearning = [];
                    this.SubTotalExperientialLearning = [];
                    this.checkListEx = "";
                    this.CheckName = "";
                    this.currentValue = "";
                    this.ExperientialLearningPost = {};
                    this.text = "";
                    this.edited = false;
                    this.errorVal = false;
                    this.ExperientialLearningForm = fb.group({
                        'ExpLearning': ["", common_1.Validators.compose([common_validation_1.CustomValidations.noScript, common_1.Validators.maxLength(500)])]
                    });
                    this.ExpLearning = this.ExperientialLearningForm.controls['ExpLearning'];
                    this.errorMessage = this.shared.getMessages();
                }
                ExperientialLearningComponent.prototype.ngOnInit = function () {
                    this.sectionObject = this.shared.getSectionObject(this.section);
                    this.experientialLearningArr = sections.ExperientialLearningArr;
                    this.getExperLearningData();
                };
                ExperientialLearningComponent.prototype.getExperLearningData = function () {
                    var _this = this;
                    var urlObj = this.shared.getUrlObject(this.section);
                    this.apiJson.endUrl = urlObj.endUrl;
                    var userdata = {
                        stateAbbr: this.shared.getStateAbbr(),
                        accountID: this.shared.getAccountId()
                    };
                    this.apiJson.method = "GET";
                    this.apiJson.sessionID = this.shared.getAuthKey();
                    var user = JSON.stringify(userdata);
                    this.apiJson.data = user;
                    this.serverApi.callApi([this.apiJson]).subscribe(function (response) {
                        // alert(JSON.stringify(response[0].Result));
                        _this.experientialLearningData.push(response[0].Result);
                        if (_this.experientialLearningData.length > 0) {
                            _this.experientialLearningData.forEach(function (obj, key) {
                                _this.experientialLearningArr.forEach(function (v, k) {
                                    _this.chkList = [];
                                    _this.Myself = false;
                                    _this.Careers = false;
                                    _this.Future = false;
                                    _this.Try = false;
                                    if (obj[v.subNameList] == "" || obj[v.subNameList] == null) {
                                        _this.containResult.emit({ "section": _this.section, result: "empty" });
                                    }
                                    else {
                                        _this.chkList = obj[v.subNameList].split(',');
                                        if (_this.chkList.indexOf("Myself") > -1) {
                                            _this.Myself = true;
                                        }
                                        if (_this.chkList.indexOf("Careers") > -1) {
                                            _this.Careers = true;
                                        }
                                        if (_this.chkList.indexOf("Future") > -1) {
                                            _this.Future = true;
                                        }
                                        if (_this.chkList.indexOf("Try") > -1) {
                                            _this.Try = true;
                                        }
                                        _this.containResult.emit({ "section": _this.section, result: "filled" });
                                    }
                                    _this.TotalExperientialLearning.push({
                                        'name': v.name,
                                        'text': obj[v.subName],
                                        'Myself': _this.Myself,
                                        'Careers': _this.Careers,
                                        'Future': _this.Future,
                                        'Try': _this.Try
                                    });
                                });
                            });
                        }
                    }, this.utils.handleError);
                };
                //the below is to svae the experiential learning text and the list of checked values
                ExperientialLearningComponent.prototype.SaveExperientialLearning = function () {
                    var _this = this;
                    this.utils.showLoading();
                    var postDataCheck = "";
                    var ExperientialLearningPost = {};
                    ExperientialLearningPost = {
                        "StateAbbr": this.shared.getStateAbbr(),
                        "AccountID": this.shared.getAccountId()
                    };
                    //alert(JSON.stringify(this.TotalExperientialLearning));
                    this.TotalExperientialLearning.forEach(function (obj, key) {
                        var tmp = [];
                        var tmpobj = {};
                        if (obj.Myself == true) {
                            tmp.push("Myself");
                        }
                        if (obj.Careers == true) {
                            tmp.push("Careers");
                        }
                        if (obj.Future == true) {
                            tmp.push("Future");
                        }
                        if (obj.Try == true) {
                            tmp.push("Try");
                        }
                        ExperientialLearningPost[_this.experientialLearningArr[key].subName] = obj.text;
                        ExperientialLearningPost[_this.experientialLearningArr[key].subNameList] = tmp.join(',');
                    });
                    var urlObj = this.shared.getUrlObject(this.section);
                    this.apiJson.endUrl = urlObj.endUrl;
                    this.apiJson.method = "POST";
                    this.apiJson.sessionID = this.shared.getAuthKey();
                    var user = JSON.stringify(ExperientialLearningPost);
                    this.apiJson.data = user;
                    this.serverApi.callApi([this.apiJson]).subscribe(function (response) {
                        if (response.Result + "" == "true") {
                            _this.utils.hideLoading();
                            var successMsg = _this.shared.getSuccessMessage(_this.section);
                            _this.successLabel = successMsg.save;
                            _this.edited = true;
                            //wait 5 Seconds and hide
                            setTimeout(function () {
                                this.edited = false;
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
                            }.bind(_this), 5000);
                        }
                    }, function (error) { return _this.logError(error); });
                };
                ExperientialLearningComponent.prototype.logError = function (error) {
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
                ExperientialLearningComponent.prototype.changeView = function (evnt) {
                    this.changeInrView.emit(evnt);
                };
                ExperientialLearningComponent.prototype.changeFilledStatus = function (evnt) {
                    this.containResult.emit(evnt);
                };
                __decorate([
                    core_1.Input('report-status'), 
                    __metadata('design:type', Object)
                ], ExperientialLearningComponent.prototype, "report", void 0);
                __decorate([
                    core_1.Output('changeView'), 
                    __metadata('design:type', Object)
                ], ExperientialLearningComponent.prototype, "changeInrView", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], ExperientialLearningComponent.prototype, "containResult", void 0);
                ExperientialLearningComponent = __decorate([
                    core_1.Component({
                        selector: 'experiential-learning',
                        templateUrl: './app/modules/PLP/shared/experiential-learning/experiential-learning.layout.html',
                        directives: [PLP_nav_header_component_1.PLPNavHeaderComponent, common_1.FORM_DIRECTIVES],
                        providers: [shared_service_service_1.SharedService, apicall_model_1.ApiCallClass, app_apicall_service_1.ServerApi, utilities_class_1.Utilities]
                    }), 
                    __metadata('design:paramtypes', [shared_service_service_1.SharedService, utilities_class_1.Utilities, apicall_model_1.ApiCallClass, app_apicall_service_1.ServerApi, common_1.FormBuilder])
                ], ExperientialLearningComponent);
                return ExperientialLearningComponent;
            }());
            exports_1("ExperientialLearningComponent", ExperientialLearningComponent);
        }
    }
});
//# sourceMappingURL=experiential-learning.component.js.map
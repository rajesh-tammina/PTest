System.register(['@angular/core', '@angular/common', '../../../../shared/apicall.model', '../shared/common-validation', '../shared/PLP-nav-header.component', '../shared/shared-service.service', '../../../../shared/app.apicall.service', '../../../../shared/utilities.class', "../../../../shared/messages"], function(exports_1, context_1) {
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
    var core_1, common_1, apicall_model_1, common_validation_1, PLP_nav_header_component_1, shared_service_service_1, app_apicall_service_1, utilities_class_1, message;
    var TestScoresComponent;
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
            function (PLP_nav_header_component_1_1) {
                PLP_nav_header_component_1 = PLP_nav_header_component_1_1;
            },
            function (shared_service_service_1_1) {
                shared_service_service_1 = shared_service_service_1_1;
            },
            function (app_apicall_service_1_1) {
                app_apicall_service_1 = app_apicall_service_1_1;
            },
            function (utilities_class_1_1) {
                utilities_class_1 = utilities_class_1_1;
            },
            function (message_1) {
                message = message_1;
            }],
        execute: function() {
            TestScoresComponent = (function () {
                function TestScoresComponent(shared, utils, serverApi, apiJson, fb) {
                    this.shared = shared;
                    this.utils = utils;
                    this.serverApi = serverApi;
                    this.apiJson = apiJson;
                    this.report = "";
                    this.changeInrView = new core_1.EventEmitter();
                    this.containResult = new core_1.EventEmitter();
                    this.tableshow = false;
                    this.emptyTableShow = false;
                    this.section = "TestScores";
                    this.testScoresPostReq = {
                        "StateAbbr": "",
                        "AccountID": "",
                        "TestScores": []
                    };
                    this.edited = false;
                    this.errorVal = false;
                    this.testScoresForm = fb.group({
                        'Test': ["", common_1.Validators.compose([common_validation_1.CustomValidations.noScript, common_1.Validators.maxLength(100)])],
                        'score': ["", common_1.Validators.compose([common_validation_1.CustomValidations.noScript, common_1.Validators.maxLength(100)])]
                    });
                    this.Test = this.testScoresForm.controls['Test'];
                    this.score = this.testScoresForm.controls['score'];
                    this.errorMessage = message.messages;
                }
                TestScoresComponent.prototype.ngOnInit = function () {
                    this.sectionObject = this.shared.getSectionObject(this.section);
                    this.questionObject = this.shared.getQuestion(this.section);
                    this.getTestScoresData();
                };
                TestScoresComponent.prototype.getTestScoresData = function () {
                    var _this = this;
                    var urlObj = this.shared.getUrlObject(this.section);
                    this.apiJson.endUrl = urlObj.endUrl;
                    var testArr = [];
                    var filledStatus = "";
                    var data = {
                        stateAbbr: this.shared.getStateAbbr(),
                        accountID: this.shared.getAccountId()
                    };
                    this.apiJson.method = "GET";
                    this.apiJson.sessionID = this.shared.getAuthKey();
                    var dat = JSON.stringify(data);
                    this.apiJson.data = dat;
                    this.serverApi.callApi([this.apiJson]).subscribe(function (response) {
                        var testScoresTmpData = response[0].Result;
                        testScoresTmpData.forEach(function (obj, key) {
                            // alert("testScoresTmpData:"+JSON.stringify(obj));
                            if (obj.TestName == "" && obj.Score == "") {
                            }
                            else {
                                //this.containResult.emit({"section":this.section,result:"filled"});
                                testArr.push(obj);
                                filledStatus = "filled";
                            }
                        });
                        //  alert("filledStatus:"+filledStatus);
                        if (filledStatus == "filled") {
                            _this.containResult.emit({ "section": _this.section, result: "filled" });
                        }
                        else {
                            testArr.push({ "TestName": "", "Score": "" });
                            //alert(JSON.stringify(testArr));
                            _this.containResult.emit({ "section": _this.section, result: "empty" });
                        }
                        _this.testScoresData = testArr;
                        // alert("testArr:"+JSON.stringify(this.testScoresData));
                    }, this.utils.handleError);
                };
                TestScoresComponent.prototype.add = function () {
                    this.testScoresData.push({ "TestName": "", "Score": "" });
                };
                TestScoresComponent.prototype.remove = function (inx) {
                    var _this = this;
                    //  alert("inx"+inx);
                    this.testScoresData.forEach(function (obj, key) {
                        if (inx == key) {
                            //alert("yes");
                            _this.testScoresData.splice(key, inx);
                        }
                        // alert("testScoresTmpData:"+JSON.stringify(obj));
                    });
                };
                //below method is used to post the data to the server
                TestScoresComponent.prototype.SaveTestScores = function () {
                    var _this = this;
                    // alert("coming"+JSON.stringify(this.testScoresData));
                    this.utils.showLoading();
                    var urlObj = this.shared.getUrlObject(this.section);
                    this.apiJson.endUrl = urlObj.endUrl;
                    this.apiJson.method = "POST";
                    this.apiJson.sessionID = this.shared.getAuthKey();
                    this.testScoresPostReq = {
                        "StateAbbr": this.shared.getStateAbbr(),
                        "AccountID": this.shared.getAccountId(),
                        "TestScores": this.testScoresData
                    };
                    // alert(JSON.stringify(this.testScoresPostReq));
                    var user = JSON.stringify(this.testScoresPostReq);
                    this.apiJson.data = user;
                    this.serverApi.callApi([this.apiJson]).subscribe(function (response) {
                        //alert(JSON.stringify(response));
                        if (response.Result + "" == "true") {
                            alert("if:" + JSON.stringify(response));
                            _this.utils.hideLoading();
                            //     this.testScoresData.forEach((obj, key) => {
                            //           if(obj.TestName == "" && obj.Score == ""){
                            //               this.containResult.emit({"section":this.section,result:"empty"});
                            //           }
                            //           else{
                            //               this.containResult.emit({"section":this.section,result:"filled"});
                            //           }
                            //  })
                            var successMsg = _this.shared.getSuccessMessage(_this.section);
                            _this.successLabel = successMsg.update;
                            //alert(this.successLabel);
                            _this.edited = true;
                            //wait 3 Seconds and hide
                            setTimeout(function () {
                                this.edited = false;
                                // console.log(this.edited);
                            }.bind(_this), 5000);
                        }
                        else {
                            alert("else:" + JSON.stringify(response));
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
                    }, function (error) { return _this.logError(error); });
                };
                TestScoresComponent.prototype.changeView = function (evnt) {
                    this.changeInrView.emit(evnt);
                };
                TestScoresComponent.prototype.logError = function (error) {
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
                ], TestScoresComponent.prototype, "report", void 0);
                __decorate([
                    core_1.Output('changeView'), 
                    __metadata('design:type', Object)
                ], TestScoresComponent.prototype, "changeInrView", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], TestScoresComponent.prototype, "containResult", void 0);
                TestScoresComponent = __decorate([
                    core_1.Component({
                        selector: 'test-scores',
                        templateUrl: './app/modules/PLP/shared/test-scores/test-scores.layout.html',
                        directives: [PLP_nav_header_component_1.PLPNavHeaderComponent, common_1.FORM_DIRECTIVES],
                        providers: [shared_service_service_1.SharedService, app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, utilities_class_1.Utilities]
                    }), 
                    __metadata('design:paramtypes', [shared_service_service_1.SharedService, utilities_class_1.Utilities, app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, common_1.FormBuilder])
                ], TestScoresComponent);
                return TestScoresComponent;
            }());
            exports_1("TestScoresComponent", TestScoresComponent);
        }
    }
});
//# sourceMappingURL=test-scores.component.js.map
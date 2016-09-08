System.register(['@angular/core', '../../../../shared/apicall.model', '../../../../shared/customPipes', '../shared/PLP-nav-header.component', '../../../../shared/app.apicall.service', '../shared/shared-service.service', "../../../../shared/app.constants", '../../../../shared/utilities.class'], function(exports_1, context_1) {
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
    var core_1, apicall_model_1, customPipes_1, PLP_nav_header_component_1, app_apicall_service_1, shared_service_service_1, sections, utilities_class_1;
    var CareerClusterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (apicall_model_1_1) {
                apicall_model_1 = apicall_model_1_1;
            },
            function (customPipes_1_1) {
                customPipes_1 = customPipes_1_1;
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
            function (sections_1) {
                sections = sections_1;
            },
            function (utilities_class_1_1) {
                utilities_class_1 = utilities_class_1_1;
            }],
        execute: function() {
            CareerClusterComponent = (function () {
                function CareerClusterComponent(shared, utils, serverApi, apiJson, apiJson1) {
                    this.shared = shared;
                    this.utils = utils;
                    this.serverApi = serverApi;
                    this.apiJson = apiJson;
                    this.apiJson1 = apiJson1;
                    this.report = "";
                    this.changeInrView = new core_1.EventEmitter();
                    this.containResult = new core_1.EventEmitter();
                    this.careerClusterCheck = "";
                    this.clusterId = [];
                    this.section = "CareerCluster";
                    this.edited = false;
                    this.errorVal = false;
                    this.selectedList = [];
                    this.educationPostReq = {
                        "stateAbbr": "",
                        "accountID": "",
                        "fieldName": "",
                        "userNotes": ""
                    };
                }
                CareerClusterComponent.prototype.ngOnInit = function () {
                    this.sectionObject = this.shared.getSectionObject(this.section);
                    this.questionObject = this.shared.getQuestion(this.section);
                    this.endurl = sections.EndUrlArr;
                    this.getCareerClusterData();
                };
                CareerClusterComponent.prototype.getCareerClusterData = function () {
                    var _this = this;
                    this.apiJson = new apicall_model_1.ApiCallClass();
                    var data = {
                        accountID: this.shared.getAccountId(),
                        stateAbbr: this.shared.getStateAbbr()
                    };
                    var education = [];
                    this.apiJson.method = "GET";
                    var urlObj = this.shared.getUrlObject(this.section);
                    this.apiJson.endUrl = urlObj.secondRef;
                    this.careerFieldName = urlObj.fieldName;
                    this.reflection = urlObj.endUrl;
                    this.apiJson.sessionID = this.shared.getAuthKey();
                    var dat = JSON.stringify(data);
                    this.apiJson.data = dat;
                    education[0] = this.apiJson;
                    //var apiJson1:ApiCallClass;  
                    var data1 = {
                        stateAbbr: this.shared.getStateAbbr(),
                        accountID: this.shared.getAccountId(),
                        fieldName: this.careerFieldName
                    };
                    this.apiJson1 = new apicall_model_1.ApiCallClass();
                    this.apiJson1.method = "GET";
                    this.apiJson1.endUrl = this.reflection;
                    this.apiJson1.sessionID = this.shared.getAuthKey();
                    var user1 = JSON.stringify(data1);
                    this.apiJson1.data = user1;
                    education[1] = this.apiJson1;
                    this.serverApi.callApi(education).subscribe(function (response) {
                        _this.careerClusterData = response[0].Result;
                        //  alert(JSON.stringify(this.careerClusterData));
                        _this.careerClusterCheck = response[1].Result.UpdatedTimeStamp;
                        if (response[1].Result.UserNotes != null) {
                            _this.selectedList = response[1].Result.UserNotes.split(' ');
                            for (var i = 0; i < _this.selectedList.length; i++) {
                                _this.clusterId.push({ "ClusterID": _this.selectedList[i] });
                            }
                        }
                        if (_this.careerClusterData.length > 0) {
                            _this.careerClusterData.forEach(function (obj, key) {
                                _this.clusterId.forEach(function (k, v) {
                                    if (obj.ClusterID == k.ClusterID) {
                                        _this.careerClusterData[key].selected = true;
                                    }
                                });
                            });
                        }
                        //alert("response[1].Result.UserNotes--->"+response[1].Result.UserNotes);
                        if (response[1].Result.UserNotes == "0000000000000000" || response[1].Result.UserNotes == null) {
                            _this.containResult.emit({ "section": _this.section, result: "empty" });
                        }
                        else {
                            _this.containResult.emit({ "section": _this.section, result: "filled" });
                        }
                    }, this.utils.handleError);
                };
                CareerClusterComponent.prototype.SaveCareerCluster = function () {
                    var _this = this;
                    var currentValue = "";
                    var cnt = 0;
                    this.utils.showLoading();
                    if (this.careerClusterData.length > 0) {
                        this.careerClusterData.forEach(function (obj, key) {
                            if (obj.selected == true) {
                                if (cnt == 0) {
                                    currentValue = 1 + " " + obj.ClusterID;
                                }
                                else {
                                    currentValue = 1 + "" + currentValue + " " + obj.ClusterID;
                                }
                            }
                            else {
                                currentValue = 0 + "" + currentValue;
                            }
                            cnt++;
                        });
                    }
                    //alert(" this.currentValue---->"+currentValue);
                    this.apiJson.method = "POST";
                    var urlObj = this.shared.getUrlObject(this.section);
                    this.apiJson.endUrl = urlObj.endUrl;
                    this.careerFieldName = urlObj.fieldName;
                    this.apiJson.sessionID = this.shared.getAuthKey();
                    this.educationPostReq = {
                        "stateAbbr": this.shared.getStateAbbr(),
                        "accountID": this.shared.getAccountId(),
                        "fieldName": this.careerFieldName,
                        "userNotes": currentValue
                    };
                    var user = JSON.stringify(this.educationPostReq);
                    this.apiJson.data = user;
                    this.serverApi.callApi([this.apiJson]).subscribe(function (response) {
                        if (response.Result + "" == "true") {
                            _this.utils.hideLoading();
                            if (currentValue == "0000000000000000" || currentValue == null) {
                                _this.containResult.emit({ "section": _this.section, result: "empty" });
                            }
                            else {
                                _this.containResult.emit({ "section": _this.section, result: "filled" });
                            }
                            var dd = new Date();
                            _this.careerClusterCheck = dd.toDateString();
                            var successMsg = _this.shared.getSuccessMessage(_this.section);
                            _this.successLabel = successMsg.update;
                            _this.edited = true;
                            setTimeout(function () {
                                this.edited = false;
                            }.bind(_this), 5000);
                        }
                        else {
                            _this.utils.hideLoading();
                            var successMsg = _this.shared.getSuccessMessage(_this.section);
                            _this.successLabel = successMsg.error;
                            _this.errorVal = true;
                            setTimeout(function () {
                                this.errorVal = false;
                            }.bind(_this), 5000);
                        }
                    }, function (error) { return _this.logError(error); });
                };
                CareerClusterComponent.prototype.logError = function (error) {
                    this.utils.hideLoading();
                    var successMsg = this.shared.getSuccessMessage(this.section);
                    this.successLabel = successMsg.error;
                    this.errorVal = true;
                    setTimeout(function () {
                        this.errorVal = false;
                    }.bind(this), 5000);
                };
                CareerClusterComponent.prototype.changeView = function (evnt) {
                    this.changeInrView.emit(evnt);
                };
                CareerClusterComponent.prototype.changeFilledStatus = function (evnt) {
                    this.containResult.emit(evnt);
                };
                __decorate([
                    core_1.Input('report-status'), 
                    __metadata('design:type', Object)
                ], CareerClusterComponent.prototype, "report", void 0);
                __decorate([
                    core_1.Output('changeView'), 
                    __metadata('design:type', Object)
                ], CareerClusterComponent.prototype, "changeInrView", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], CareerClusterComponent.prototype, "containResult", void 0);
                CareerClusterComponent = __decorate([
                    core_1.Component({
                        selector: 'career-cluster',
                        templateUrl: './app/modules/PLP/shared/career-cluster/career-cluster.layout.html',
                        directives: [PLP_nav_header_component_1.PLPNavHeaderComponent],
                        providers: [shared_service_service_1.SharedService, app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, utilities_class_1.Utilities],
                        pipes: [customPipes_1.CustomDate]
                    }), 
                    __metadata('design:paramtypes', [shared_service_service_1.SharedService, utilities_class_1.Utilities, app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, apicall_model_1.ApiCallClass])
                ], CareerClusterComponent);
                return CareerClusterComponent;
            }());
            exports_1("CareerClusterComponent", CareerClusterComponent);
        }
    }
});
//# sourceMappingURL=career-cluster.component.js.map
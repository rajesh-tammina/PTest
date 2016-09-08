System.register(['@angular/core', '@angular/common', '../../../../shared/apicall.model', '../shared/PLP-nav-header.component', '../shared/shared-service.service', '../../../../shared/app.apicall.service', '../../../../shared/utilities.class', '../shared/common-validation', "../../../../shared/app.constants", "../../../../shared/messages"], function(exports_1, context_1) {
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
    var core_1, common_1, apicall_model_1, PLP_nav_header_component_1, shared_service_service_1, app_apicall_service_1, utilities_class_1, common_validation_1, sections, message;
    var CommentsAndSignatureComponent;
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
            function (common_validation_1_1) {
                common_validation_1 = common_validation_1_1;
            },
            function (sections_1) {
                sections = sections_1;
            },
            function (message_1) {
                message = message_1;
            }],
        execute: function() {
            CommentsAndSignatureComponent = (function () {
                function CommentsAndSignatureComponent(shared, utils, serverApi, apiJson, fb) {
                    this.shared = shared;
                    this.utils = utils;
                    this.serverApi = serverApi;
                    this.apiJson = apiJson;
                    this.report = "";
                    this.changeInrView = new core_1.EventEmitter();
                    this.containResult = new core_1.EventEmitter();
                    this.commentsAndSignatureData = {
                        Comment: "",
                        Signature: ""
                    };
                    this.section = "CommentsAndSignature";
                    this.commentPostReq = {
                        "StateAbbr": "",
                        "AccountID": "",
                        "Comment": "",
                        "Signature": ""
                    };
                    this.edited = false;
                    this.errorVal = false;
                    this.CommentAndSigForm = fb.group({
                        Comment: ["", common_1.Validators.compose([common_validation_1.CustomValidations.noScript, common_1.Validators.maxLength(500)])]
                    });
                    this.errorMessage = message.messages;
                }
                CommentsAndSignatureComponent.prototype.ngOnInit = function () {
                    this.sectionObject = this.shared.getSectionObject(this.section);
                    this.endurl = sections.EndUrlArr;
                    this.getCommentsAndSignatureData();
                };
                CommentsAndSignatureComponent.prototype.getCommentsAndSignatureData = function () {
                    var _this = this;
                    var data = {
                        stateAbbr: this.shared.getStateAbbr(),
                        accountID: this.shared.getAccountId()
                    };
                    this.apiJson.method = "GET";
                    var urlObj = this.shared.getUrlObject(this.section);
                    this.apiJson.endUrl = urlObj.endUrl;
                    this.apiJson.sessionID = this.shared.getAuthKey();
                    var dat = JSON.stringify(data);
                    this.apiJson.data = dat;
                    this.serverApi.callApi([this.apiJson]).subscribe(function (response) {
                        _this.commentsAndSignatureData = response[0].Result;
                        if (response[0].Result != null && response[0].Result.Comment != null && response[0].Result.Comment != "") {
                            _this.containResult.emit({ "section": _this.section, result: "filled" });
                        }
                        else {
                            _this.containResult.emit({ "section": _this.section, result: "empty" });
                        }
                    }, this.utils.handleError);
                };
                CommentsAndSignatureComponent.prototype.SaveComments = function () {
                    var _this = this;
                    this.utils.showLoading();
                    var urlObj = this.shared.getUrlObject(this.section);
                    this.apiJson.endUrl = urlObj.endUrl;
                    this.apiJson.method = "POST";
                    this.apiJson.sessionID = this.shared.getAuthKey();
                    this.commentPostReq = {
                        "StateAbbr": this.shared.getStateAbbr(),
                        "AccountID": this.shared.getAccountId(),
                        "Comment": this.commentsAndSignatureData.Comment,
                        "Signature": this.commentsAndSignatureData.Signature
                    };
                    var user = JSON.stringify(this.commentPostReq);
                    this.apiJson.data = user;
                    this.serverApi.callApi([this.apiJson]).subscribe(function (response) {
                        if (response.Result + "" == "true") {
                            _this.utils.hideLoading();
                            var successMsg = _this.shared.getSuccessMessage(_this.section);
                            _this.successLabel = successMsg.update;
                            _this.edited = true;
                            //wait 5 Seconds and hide
                            if (_this.commentsAndSignatureData.Comment + "" == "" || _this.commentsAndSignatureData.Comment + "" == null) {
                                _this.containResult.emit({ "section": _this.section, result: "empty" });
                            }
                            else {
                                _this.containResult.emit({ "section": _this.section, result: "filled" });
                            }
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
                CommentsAndSignatureComponent.prototype.logError = function (error) {
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
                CommentsAndSignatureComponent.prototype.changeView = function (evnt) {
                    this.changeInrView.emit(evnt);
                };
                __decorate([
                    core_1.Input('report-status'), 
                    __metadata('design:type', Object)
                ], CommentsAndSignatureComponent.prototype, "report", void 0);
                __decorate([
                    core_1.Output('changeView'), 
                    __metadata('design:type', Object)
                ], CommentsAndSignatureComponent.prototype, "changeInrView", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], CommentsAndSignatureComponent.prototype, "containResult", void 0);
                CommentsAndSignatureComponent = __decorate([
                    core_1.Component({
                        selector: 'comments-and-signature',
                        templateUrl: './app/modules/PLP/shared/comments-and-signature/comments-and-signature.layout.html',
                        directives: [PLP_nav_header_component_1.PLPNavHeaderComponent, common_1.FORM_DIRECTIVES],
                        providers: [shared_service_service_1.SharedService, app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, utilities_class_1.Utilities]
                    }), 
                    __metadata('design:paramtypes', [shared_service_service_1.SharedService, utilities_class_1.Utilities, app_apicall_service_1.ServerApi, apicall_model_1.ApiCallClass, common_1.FormBuilder])
                ], CommentsAndSignatureComponent);
                return CommentsAndSignatureComponent;
            }());
            exports_1("CommentsAndSignatureComponent", CommentsAndSignatureComponent);
        }
    }
});
//# sourceMappingURL=comments-and-signature.component.js.map
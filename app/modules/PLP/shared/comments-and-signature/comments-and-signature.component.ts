import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlGroup, Control, Validators, FormBuilder, CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import { ApiCallClass } from '../../../../shared/apicall.model';
import { CommentsAndSignatureModel } from './comments-and-signature.model';
import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { SharedService } from '../shared/shared-service.service';
import { ServerApi } from '../../../../shared/app.apicall.service';
import { Utilities } from '../../../../shared/utilities.class';

import { CustomValidations } from '../shared/common-validation';
import sections = require("../../../../shared/app.constants");
import message = require("../../../../shared/messages");

@Component({
  selector: 'comments-and-signature',
  templateUrl: './app/modules/PLP/shared/comments-and-signature/comments-and-signature.layout.html',
  directives: [PLPNavHeaderComponent, FORM_DIRECTIVES],
  providers: [SharedService, ServerApi, ApiCallClass, Utilities]
})
export class CommentsAndSignatureComponent {
  @Input('report-status') report = "";
  @Output('changeView') changeInrView = new EventEmitter();
  @Output() containResult = new EventEmitter();

  commentsAndSignatureData = {
    Comment: "",
    Signature: ""
  };
  sectionObject;
  section = "CommentsAndSignature";
  endurl;
  public commentPostReq = {
    "StateAbbr": "",
    "AccountID": "",
    "Comment": "",
    "Signature": ""
  };
  errorMessage;
  successLabel;
  public edited = false;
  public errorVal = false;
  CommentAndSigForm: ControlGroup;
  constructor(private shared: SharedService, private utils: Utilities,
    private serverApi: ServerApi, private apiJson: ApiCallClass, fb: FormBuilder) {
    this.CommentAndSigForm = fb.group({
      Comment: ["", Validators.compose([CustomValidations.noScript, Validators.maxLength(500)])]

    });
    this.errorMessage = message.messages;
  }

  ngOnInit() {
    this.sectionObject = this.shared.getSectionObject(this.section);
    this.endurl = sections.EndUrlArr;
    this.getCommentsAndSignatureData();
  }

  getCommentsAndSignatureData() {
    let data = {
      stateAbbr: this.shared.getStateAbbr(),
      accountID: this.shared.getAccountId()
    }
    this.apiJson.method = "GET";

    let urlObj = this.shared.getUrlObject(this.section);
    this.apiJson.endUrl = urlObj.endUrl;

    this.apiJson.sessionID = this.shared.getAuthKey();
    let dat = JSON.stringify(data);

    this.apiJson.data = dat;
    this.serverApi.callApi([this.apiJson]).subscribe((response) => {

      this.commentsAndSignatureData = response[0].Result;
      if (response[0].Result != null && response[0].Result.Comment!= null && response[0].Result.Comment!= "") {
        this.containResult.emit({ "section": this.section, result: "filled" });
      }
      else {
        this.containResult.emit({ "section": this.section, result: "empty" });
      }
    }, this.utils.handleError);
  }

  SaveComments() {
    this.utils.showLoading();
    let urlObj = this.shared.getUrlObject(this.section);
    this.apiJson.endUrl = urlObj.endUrl;
    this.apiJson.method = "POST";
    this.apiJson.sessionID = this.shared.getAuthKey();
    this.commentPostReq = {
      "StateAbbr": this.shared.getStateAbbr(),
      "AccountID": this.shared.getAccountId(),
      "Comment": this.commentsAndSignatureData.Comment,
      "Signature": this.commentsAndSignatureData.Signature
    }
    let user = JSON.stringify(this.commentPostReq);
    this.apiJson.data = user;
    this.serverApi.callApi([this.apiJson]).subscribe((response) => {
      if(response.Result+"" == "true"){
          this.utils.hideLoading();
      let successMsg = this.shared.getSuccessMessage(this.section);
      this.successLabel = successMsg.update;
      this.edited = true;
      //wait 5 Seconds and hide
      if (this.commentsAndSignatureData.Comment+"" == "" || this.commentsAndSignatureData.Comment+"" == null) {
        this.containResult.emit({ "section": this.section, result: "empty" });
      }
      else {
        this.containResult.emit({ "section": this.section, result: "filled" });
      }
      setTimeout(function () {
        this.edited = false;
        // console.log(this.edited);
      }.bind(this), 5000);
      }
      else{
         this.utils.hideLoading();
    let successMsg = this.shared.getSuccessMessage(this.section);
    this.successLabel = successMsg.error;
    this.errorVal = true;
    //wait 5 Seconds and hide
    setTimeout(function () {
      this.errorVal = false;
      // console.log(this.edited);
    }.bind(this), 5000);
      }

    }, error => this.logError(error));
  }

  logError(error: any) {
    this.utils.hideLoading();
    let successMsg = this.shared.getSuccessMessage(this.section);
    this.successLabel = successMsg.error;
    this.errorVal = true;
    //wait 5 Seconds and hide
    setTimeout(function () {
      this.errorVal = false;
      // console.log(this.edited);
    }.bind(this), 5000);
  }

  changeView(evnt) {
    this.changeInrView.emit(evnt);
  }
}

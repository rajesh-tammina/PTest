import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ControlGroup, Control, Validators, FormBuilder, CORE_DIRECTIVES, FORM_DIRECTIVES, AbstractControl} from '@angular/common';
import { ExperientialLearningModel } from './experiential-learning.model';
import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { SharedService } from '../shared/shared-service.service';
import { ApiCallClass } from '../../../../shared/apicall.model';
import { ServerApi } from '../../../../shared/app.apicall.service';
import { Utilities } from '../../../../shared/utilities.class';

import sections = require("../../../../shared/app.constants");

import { CustomValidations } from '../shared/common-validation';

@Component({
  selector: 'experiential-learning',
  templateUrl: './app/modules/PLP/shared/experiential-learning/experiential-learning.layout.html',
  directives: [PLPNavHeaderComponent, FORM_DIRECTIVES],
  providers: [SharedService, ApiCallClass, ServerApi, Utilities]
})
export class ExperientialLearningComponent {
  @Input('report-status') report = "";
  @Output('changeView') changeInrView = new EventEmitter();
  @Output() containResult = new EventEmitter();
  experLearningData: ExperientialLearningModel[];
  sectionObject;
  section = "ExperientialLearning";
  endUrl;
  experientialLearningArr;
  experientialLearningData = [];
  TotalExperientialLearning = [];
  SubTotalExperientialLearning = [];
  checkListEx="";
  CheckName="";
  chkList;
  Myself;
  Careers;
  Future;
  Try;
  currentValue = "";
  errorMessage;
  ExperientialLearningPost = {

  }
  text = "";
  ExperientialLearningForm: ControlGroup;

  ExpLearning: AbstractControl;
  successLabel;
  public edited = false;
  public errorVal = false;
  constructor(private shared: SharedService, private utils: Utilities,
    private apiJson: ApiCallClass, private serverApi: ServerApi, fb: FormBuilder) {
    this.ExperientialLearningForm = fb.group({
      'ExpLearning': ["", Validators.compose([CustomValidations.noScript, Validators.maxLength(500)])]

    });
    this.ExpLearning = this.ExperientialLearningForm.controls['ExpLearning'];
    this.errorMessage = this.shared.getMessages();
  }

  ngOnInit() {
    this.sectionObject = this.shared.getSectionObject(this.section);
    this.experientialLearningArr = sections.ExperientialLearningArr;
    this.getExperLearningData();
  }

  getExperLearningData() {
    let urlObj = this.shared.getUrlObject(this.section);
    this.apiJson.endUrl = urlObj.endUrl;
    let userdata = {
      stateAbbr: this.shared.getStateAbbr(),
      accountID: this.shared.getAccountId()
    };
    this.apiJson.method = "GET";
    this.apiJson.sessionID = this.shared.getAuthKey();
    let user = JSON.stringify(userdata);
    this.apiJson.data = user;
    this.serverApi.callApi([this.apiJson]).subscribe((response) => {
     // alert(JSON.stringify(response[0].Result));
      this.experientialLearningData.push(response[0].Result);
      if (this.experientialLearningData.length > 0) {
        this.experientialLearningData.forEach((obj, key) => {
          this.experientialLearningArr.forEach((v, k) => {
            this.chkList = [];
            this.Myself = false;
            this.Careers = false;
            this.Future = false;
            this.Try = false;
            if (obj[v.subNameList] == "" || obj[v.subNameList] == null) {
               this.containResult.emit({ "section": this.section, result: "empty" });
            }
            else{
              this.chkList = obj[v.subNameList].split(',');
              if (this.chkList.indexOf("Myself") > -1) {
              this.Myself = true;
              }
              if (this.chkList.indexOf("Careers") > -1) {
                this.Careers = true;
              }
              if (this.chkList.indexOf("Future") > -1) {
                this.Future = true;
              }
              if (this.chkList.indexOf("Try") > -1) {
                this.Try = true;
              }
               this.containResult.emit({ "section": this.section, result: "filled" });
            }
            this.TotalExperientialLearning.push({
              'name': v.name,
              'text': obj[v.subName],
              'Myself': this.Myself,
              'Careers': this.Careers,
              'Future': this.Future,
              'Try': this.Try
            })

          })
        })
      }
    },this.utils.handleError);
  }

  //the below is to svae the experiential learning text and the list of checked values
  SaveExperientialLearning() {
    this.utils.showLoading();
    let postDataCheck="";
    let ExperientialLearningPost = {};
    ExperientialLearningPost = {
      "StateAbbr": this.shared.getStateAbbr(),
      "AccountID": this.shared.getAccountId()
    }
//alert(JSON.stringify(this.TotalExperientialLearning));
    this.TotalExperientialLearning.forEach((obj, key) => {
      let tmp = [];
      let tmpobj = {};
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
      ExperientialLearningPost[this.experientialLearningArr[key].subName] = obj.text;
      ExperientialLearningPost[this.experientialLearningArr[key].subNameList] = tmp.join(',');
     
    })
    let urlObj = this.shared.getUrlObject(this.section);
    this.apiJson.endUrl = urlObj.endUrl;
    this.apiJson.method = "POST";
    this.apiJson.sessionID = this.shared.getAuthKey();
    let user = JSON.stringify(ExperientialLearningPost);
    this.apiJson.data = user;
    this.serverApi.callApi([this.apiJson]).subscribe((response) => {
      if(response.Result+"" == "true"){
        this.utils.hideLoading();
        let successMsg = this.shared.getSuccessMessage(this.section);
        this.successLabel = successMsg.save;
        this.edited = true;
        //wait 5 Seconds and hide
        setTimeout(function () {
        this.edited = false;
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

  changeFilledStatus(evnt) {
    this.containResult.emit(evnt);
  }
}

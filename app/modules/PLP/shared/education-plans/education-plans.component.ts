
import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { ReflectionComponent } from '../shared/reflection.component';
import { ServerApi } from '../../../../shared/app.apicall.service';
import { ApiCallClass } from '../../../../shared/apicall.model';
import { EducationPlansModel } from '../education-plans/education-plans.model';
import { ControlGroup, Control, Validators, FormBuilder, CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http, Response } from '@angular/http';
import { SharedService } from '../shared/shared-service.service';
import { Utilities } from '../../../../shared/utilities.class';
import { CustomDate } from '../../../../shared/customPipes';

import sections = require("../../../../shared/app.constants");

@Component({
  selector: 'education-plans',
  templateUrl: './app/modules/PLP/shared/education-plans/education-plans.layout.html',
  directives: [PLPNavHeaderComponent, FORM_DIRECTIVES, ReflectionComponent],
  providers: [ServerApi, ApiCallClass, EducationPlansModel, SharedService, Utilities],
  pipes: [CustomDate]
})
export class EducationPlansComponent {
  @Input('report-status') report = "";
  @Output('changeView') changeInrView = new EventEmitter();
  @Output() containResult = new EventEmitter();
  sectionObject;
  questionObject;
  educationFieldList;
  edufieldName;
  section = "EducationPlans";
  field = "PSPlans";
  
  currentFlag = "";
  endurl;
  selectedList = [];
  education = [];
  educationForm: ControlGroup;
  educationPlanCheck = new EducationPlansModel();
  educationSavedDt = "";
  public educationCompa = [

  ];
  public saveOnchangeVal = [

  ];
  public educationPlanRef = {
    "LastSaved": new Date,
    "userNotes": ""
  };

  public educationPostReq = {
    "stateAbbr": "",
    "accountID": "",
    "fieldName": "",
    "userNotes": ""
  };
  userNotesPost = "";
  successLabel;
  public edited = false;
  public errorVal = false;
  constructor(private serverApi: ServerApi, private utils: Utilities, private apiJson: ApiCallClass,
    private apiJson1: ApiCallClass, private shared: SharedService,
    private educationPlansModel: EducationPlansModel,
    private http: Http, private fb: FormBuilder) {

  }
  ngOnInit() {
    this.sectionObject = this.shared.getSectionObject(this.section);
    this.questionObject = this.shared.getQuestion(this.section);
    this.educationFieldList = sections.educationFieldsArr;
    this.educationForm = this.fb.group({
      userNotes: ['', Validators.required]
    });
    this.getEducationPlans();
  }

  getEducationPlans() {
    this.apiJson = new ApiCallClass();

    let urlObj = this.shared.getUrlObject(this.section);
    this.apiJson.endUrl = urlObj.endUrl;

    let userdata = {
      stateAbbr: this.shared.getStateAbbr(),
      accountID: this.shared.getAccountId(),
      fieldName: urlObj.fieldNameCheck
    };
    this.apiJson.method = "GET";
    this.apiJson.sessionID = this.shared.getAuthKey();
    let user = JSON.stringify(userdata);
    this.apiJson.data = user;
    this.serverApi.callApi([this.apiJson]).subscribe((response) => {
      this.educationPlanCheck = response[0].Result;
      this.educationSavedDt = response[0].Result.UpdatedTimeStamp;
      if (this.educationPlanCheck.UserNotes != null) {
        this.selectedList = this.educationPlanCheck.UserNotes.split(',');
        for (var i = 0; i < this.selectedList.length; i++) {
          this.educationCompa.push({ "usernotes": this.selectedList[i] });
        }
      }
      if (this.educationFieldList.length > 0) {
        this.educationFieldList.forEach((obj, key) => {
          this.educationCompa.forEach((k, v) => {
            if (obj.value == k.usernotes) {
              obj.selected = true;
            }
          })
        })
      }
//alert(response[0].Result.UserNotes);
      if (response[0].Result.UserNotes!="" && response[0].Result.UserNotes!=null ) {
        this.containResult.emit({ "section": this.section, result: "filled" });
      }
      else {
        this.containResult.emit({ "section": this.section, result: "empty" });
      }
    },this.utils.handleError);
  }

  insertEducationPlanRef() {
    this.educationPlansModel.Today = new Date();
    var day = this.educationPlansModel.Today.getDate();
    var monthIndex = this.educationPlansModel.Today.getMonth();
    var year = this.educationPlansModel.Today.getFullYear();
    var todayDate = day + "/" + monthIndex + "/" + year;
    this.educationPlanRef.userNotes = todayDate + "\n" + this.educationPlanRef.userNotes;
  }

  saveEducationPlanCheck() {
    let currentValue = "";
    this.utils.showLoading();
    var cnt = 0;
    //alert(JSON.stringify(this.educationFieldList));
    if (this.educationFieldList.length > 0) {
      this.educationFieldList.forEach((obj, key) => {
        if (obj.selected == true) {
          if (cnt == 0) {
            currentValue = obj.value;
          }
          else {
            currentValue = currentValue + "," + obj.value;
          }

        }
        cnt++;
      })

    }
    //alert("currentValue--->"+currentValue);
    let urlObj = this.shared.getUrlObject(this.section);
    this.apiJson.endUrl = urlObj.endUrl;
    this.apiJson.method = "POST";
    this.apiJson.sessionID = this.shared.getAuthKey();
    this.educationPostReq = {
      "stateAbbr": this.shared.getStateAbbr(),
      "accountID": this.shared.getAccountId(),
      "fieldName": urlObj.edufieldName,
      "userNotes": currentValue
    };
    let user = JSON.stringify(this.educationPostReq);
    //alert("user-->"+user);
    this.apiJson.data = user;
    this.serverApi.callApi([this.apiJson]).subscribe((response) => {
     // alert(response.Result);
    if(response.Result+"" == "true"){
        this.utils.hideLoading();
       var dd = new Date();
       this.educationSavedDt = dd.toDateString(); 
      let successMsg = this.shared.getSuccessMessage(this.section);
      this.successLabel = successMsg.save;
      this.edited = true;
      if(currentValue == "" || currentValue == null){
           this.containResult.emit({ "section": this.section, result: "empty" });
      }
      else{
        this.containResult.emit({ "section": this.section, result: "filled" });
      }
      //wait 5 Seconds and hide
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
  changeFilledStatus(evnt) {
    this.containResult.emit(evnt);
  }

}

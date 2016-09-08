import { Component, Input, Output, EventEmitter } from '@angular/core';


import { ApiCallClass } from '../../../../shared/apicall.model';
import { CustomDate } from '../../../../shared/customPipes';
import { CareerClusterModel } from './career-cluster.model';
import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { ServerApi } from '../../../../shared/app.apicall.service';
import { SharedService } from '../shared/shared-service.service';
import sections = require("../../../../shared/app.constants");
import { Utilities } from '../../../../shared/utilities.class';

@Component({
  selector: 'career-cluster',
  templateUrl: './app/modules/PLP/shared/career-cluster/career-cluster.layout.html',
  directives: [PLPNavHeaderComponent],
  providers: [SharedService, ServerApi, ApiCallClass, Utilities],
  pipes: [CustomDate]
})
export class CareerClusterComponent {
  @Input('report-status') report = "";
  @Output('changeView') changeInrView = new EventEmitter();
  @Output() containResult = new EventEmitter();

  careerClusterData: CareerClusterModel[];
  careerClusterCheck = "";
  clusterId = [];
  sectionObject;
  questionObject;
  section = "CareerCluster";
  endurl;
 
  careerFieldName;
  reflection;
  successLabel;
  public edited = false;
  public errorVal = false;
  selectedList = [];
  constructor(private shared: SharedService, private utils: Utilities, private serverApi: ServerApi,
    private apiJson: ApiCallClass, private apiJson1: ApiCallClass) {
  }

  ngOnInit() {
    this.sectionObject = this.shared.getSectionObject(this.section);
    this.questionObject = this.shared.getQuestion(this.section);
    this.endurl = sections.EndUrlArr;
    this.getCareerClusterData();
  }


  public educationPostReq = {
    "stateAbbr": "",
    "accountID": "",
    "fieldName": "",
    "userNotes": ""
  };
  getCareerClusterData() {
    this.apiJson = new ApiCallClass();
    let data = {
      accountID: this.shared.getAccountId(),
      stateAbbr: this.shared.getStateAbbr()
    }
    let education = [];
    this.apiJson.method = "GET";


    let urlObj = this.shared.getUrlObject(this.section);
    this.apiJson.endUrl = urlObj.secondRef;
    this.careerFieldName = urlObj.fieldName;
    this.reflection = urlObj.endUrl;

    this.apiJson.sessionID = this.shared.getAuthKey();
    let dat = JSON.stringify(data);
    this.apiJson.data = dat;
    education[0] = this.apiJson;
    //var apiJson1:ApiCallClass;  
    let data1 = {
      stateAbbr: this.shared.getStateAbbr(),
      accountID: this.shared.getAccountId(),
      fieldName: this.careerFieldName
    };
    this.apiJson1 = new ApiCallClass();
    this.apiJson1.method = "GET";
    this.apiJson1.endUrl = this.reflection;
    this.apiJson1.sessionID = this.shared.getAuthKey();

    let user1 = JSON.stringify(data1);
    this.apiJson1.data = user1;
    education[1] = this.apiJson1;
    this.serverApi.callApi(education).subscribe((response) => {

      this.careerClusterData = response[0].Result;
     //  alert(JSON.stringify(this.careerClusterData));
      this.careerClusterCheck = response[1].Result.UpdatedTimeStamp;
      if (response[1].Result.UserNotes != null) {
        this.selectedList = response[1].Result.UserNotes.split(' ');
        for (var i = 0; i < this.selectedList.length; i++) {
          this.clusterId.push({ "ClusterID": this.selectedList[i] });
        }
      }

      if (this.careerClusterData.length > 0) {
        this.careerClusterData.forEach((obj, key) => {
          this.clusterId.forEach((k, v) => {
            if (obj.ClusterID == k.ClusterID) {
              this.careerClusterData[key].selected = true;
            }
          })
        })
      }
//alert("response[1].Result.UserNotes--->"+response[1].Result.UserNotes);
      if (response[1].Result.UserNotes =="0000000000000000" || response[1].Result.UserNotes == null) {
        this.containResult.emit({ "section": this.section, result: "empty" });
       
      }
      else {
         this.containResult.emit({ "section": this.section, result: "filled" });
      }

    }, this.utils.handleError);
  }

  SaveCareerCluster() {
   let currentValue="";
    var cnt = 0;
    this.utils.showLoading();
    if (this.careerClusterData.length > 0) {

      this.careerClusterData.forEach((obj, key) => {
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
      })
    }
    //alert(" this.currentValue---->"+currentValue);
    this.apiJson.method = "POST";
    let urlObj = this.shared.getUrlObject(this.section);
    this.apiJson.endUrl = urlObj.endUrl;
    this.careerFieldName = urlObj.fieldName;
    this.apiJson.sessionID = this.shared.getAuthKey();
    this.educationPostReq = {
      "stateAbbr": this.shared.getStateAbbr(),
      "accountID": this.shared.getAccountId(),
      "fieldName": this.careerFieldName,
      "userNotes": currentValue
    };
    let user = JSON.stringify(this.educationPostReq);
    this.apiJson.data = user;
    this.serverApi.callApi([this.apiJson]).subscribe((response) => {
      if(response.Result+"" == "true"){
          this.utils.hideLoading();
    if (currentValue =="0000000000000000" || currentValue == null) {
        this.containResult.emit({ "section": this.section, result: "empty" });
      }
      else {
         this.containResult.emit({ "section": this.section, result: "filled" });
      }
       var dd = new Date();
       this.careerClusterCheck = dd.toDateString(); 
      let successMsg = this.shared.getSuccessMessage(this.section);
      this.successLabel = successMsg.update;
      this.edited = true;
      setTimeout(function () {
        this.edited = false;
      }.bind(this), 5000);
      }
      else{
         this.utils.hideLoading();
        let successMsg = this.shared.getSuccessMessage(this.section);
        this.successLabel = successMsg.error;
        this.errorVal = true;
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
    setTimeout(function () {
      this.errorVal = false;
    }.bind(this), 5000);
  }

  changeView(evnt) {
    this.changeInrView.emit(evnt);
  }

  changeFilledStatus(evnt) {
    this.containResult.emit(evnt);
  }
}

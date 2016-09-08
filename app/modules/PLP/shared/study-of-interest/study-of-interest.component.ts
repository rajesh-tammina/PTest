import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ApiCallClass } from '../../../../shared/apicall.model';
import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { StudyOfInterestModel } from './study-of-interest.model';
import { SharedService } from '../shared/shared-service.service';
import { ServerApi } from '../../../../shared/app.apicall.service';
import { Utilities } from '../../../../shared/utilities.class';
import { CustomDate } from '../../../../shared/customPipes';

import sections = require("../../../../shared/app.constants");

@Component({
  selector: 'study-of-interest',
  templateUrl: './app/modules/PLP/shared/study-of-interest/study-of-interest.layout.html',
  directives:[PLPNavHeaderComponent],
  providers : [ SharedService , ServerApi , ApiCallClass, Utilities],
  pipes:[CustomDate]
})
export class StudyOfInterestComponent {
   @Input('report-status') report="";
   @Output('changeView') changeInrView= new EventEmitter();
   @Output() containResult= new EventEmitter();
   
   studyOfInterestData:StudyOfInterestModel[];
   endurl;
   fileName;
   sectionObject;
   tableNoData;
   section = "StudyOfInterest";  

    constructor(private shared:SharedService,private utils:Utilities, private serverApi:ServerApi,private apiJson:ApiCallClass) {
    }

    ngOnInit(){
        this.sectionObject = this.shared.getSectionObject(this.section);
        this.getStudyOfInterestData();
    }
  
  getStudyOfInterestData(){
       let urlObj=this.shared.getUrlObject(this.section);
       this.apiJson.endUrl = urlObj.endUrl;
       let nodata = this.shared.getTableNoData(this.section);
        this.tableNoData = nodata;

       let data={
                stateAbbr :this.shared.getStateAbbr(),	
                accountID :this.shared.getAccountId(),
                fileName: urlObj.fileName
      }
      this.apiJson.method="GET";
     // this.apiJson.endUrl="SavedFiles";
      this.apiJson.sessionID = this.shared.getAuthKey();
        let dat=JSON.stringify(data);
 
        this.apiJson.data=dat;
        this.serverApi.callApi([this.apiJson]).subscribe((response)=>{
           // response[0].Result.UpdatedTimeStamp=this.utils.changeDate(response[0].Result.UpdatedTimeStamp);
            this.studyOfInterestData=response[0].Result;
            
           if(response[0].Result!=null){
                this.containResult.emit({"section":this.section,result:"filled"});
              }
              else{
                this.containResult.emit({"section":this.section,result:"empty"});
              }
         },this.utils.handleError);
  }
  
  changeView(evnt){
      this.changeInrView.emit(evnt);
  }

}

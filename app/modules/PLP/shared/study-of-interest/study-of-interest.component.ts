import { Component, Input } from '@angular/core';

import { ApiCallClass } from '../../../../shared/apicall.model';
import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { StudyOfInterestModel } from './study-of-interest.model';
import { SharedService } from '../shared/shared-service.service';
import { ServerApi } from '../../../../shared/app.apicall.service';
import sections = require("../../../../shared/app.constants");

@Component({
  selector: 'study-of-interest',
  templateUrl: './app/modules/PLP/shared/study-of-interest/study-of-interest.layout.html',
  directives:[PLPNavHeaderComponent],
  providers : [ SharedService , ServerApi , ApiCallClass]
})
export class StudyOfInterestComponent {
   @Input('report-status') report="";
   studyOfInterestData:StudyOfInterestModel[];
   endurl;
   fileName;
   sectionObject;
   section = "StudyOfInterest";  

    constructor(private shared:SharedService, private serverApi:ServerApi,private apiJson:ApiCallClass) {
    }

    ngOnInit(){
        this.sectionObject = this.shared.getSectionObject(this.section);
        this.getStudyOfInterestData();
    }
  
  getStudyOfInterestData(){
       let urlObj=this.shared.getUrlObject(this.section);
       this.apiJson.endUrl = urlObj.endUrl;
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

            this.studyOfInterestData=response[0].Result;
        });
  }
  
  
}

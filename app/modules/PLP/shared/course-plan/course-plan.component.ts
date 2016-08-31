import { Component, Input } from '@angular/core';

import { ApiCallClass } from '../../../../shared/apicall.model';
import { CoursePlanModel } from './course-plan.model';
import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { SharedService } from '../shared/shared-service.service';
import { ServerApi } from '../../../../shared/app.apicall.service';
import sections = require("../../../../shared/app.constants");
@Component({
  selector: 'course-plan',
  templateUrl: './app/modules/PLP/shared/course-plan/course-plan.layout.html',
  directives:[PLPNavHeaderComponent],
  providers : [ SharedService , ServerApi , ApiCallClass ,CoursePlanModel]
})
export class CoursePlanComponent {
  testModel;
  @Input('report-status') report="";
     sectionObject;
   section = "CoursePlan";  
   endurl;
  coursePlan = new CoursePlanModel;
  constructor(private shared:SharedService,private coursePlanData:CoursePlanModel, 
  private serverApi:ServerApi,private apiJson:ApiCallClass) {
     this.sectionObject = this.shared.getSectionObject(this.section);
        
   }

    ngOnInit(){
       this.endurl = sections.EndUrlArr;
       this.getCoursePlanData();
    }
  
  getCoursePlanData(){
     let data={
                stateAbbr :this.shared.getStateAbbr(),	
                accountID :this.shared.getAccountId()
      }
      this.apiJson.method="GET";

      let urlObj=this.shared.getUrlObject(this.section);
      this.apiJson.endUrl = urlObj.endUrl;
      this.apiJson.sessionID=this.shared.getAuthKey();
        let dat=JSON.stringify(data);
 
        this.apiJson.data=dat;
        this.serverApi.callApi([this.apiJson]).subscribe((response)=>{
            this.testModel=response[0].Result;
           // alert("response:"+JSON.stringify( this.coursePlan));
        });
  }
}

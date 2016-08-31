import { Component,Input } from '@angular/core';

import { ApiCallClass } from '../../../../shared/apicall.model';
import { EmploymentHistoryModel } from './employment-history.model';
import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { SharedService } from '../shared/shared-service.service';
import { ServerApi } from '../../../../shared/app.apicall.service';
import sections = require("../../../../shared/app.constants");
@Component({
  selector: 'employment-history',
  templateUrl: './app/modules/PLP/shared/employment-history/employment-history.layout.html',
  directives:[PLPNavHeaderComponent],
  providers : [ SharedService , ServerApi , ApiCallClass]
})
export class EmploymentHistoryComponent {
       @Input('report-status') report="";
       employmentHistoryData:EmploymentHistoryModel[];
       endurl;
       sectionObject;
       section = "EmploymentHistory";  

    constructor(private shared:SharedService, private serverApi:ServerApi,private apiJson:ApiCallClass) {
    }

    ngOnInit(){
        this.sectionObject = this.shared.getSectionObject(this.section);
        this.getEmploymentHistoryData();
    }
  
  getEmploymentHistoryData(){
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

            this.employmentHistoryData=response[0].Result;
        });
  }
}

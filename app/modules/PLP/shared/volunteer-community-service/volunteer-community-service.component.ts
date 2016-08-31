import { Component,Input} from '@angular/core';

import { ApiCallClass } from '../../../../shared/apicall.model';
import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { VolunteerCommunityServiceModel } from './volunteer-community-service.model';
import { SharedService } from '../shared/shared-service.service';
import { ServerApi } from '../../../../shared/app.apicall.service';

@Component({
  selector: 'volunteer-community-service',
  templateUrl: './app/modules/PLP/shared/volunteer-community-service/volunteer-community-service.layout.html',
  directives:[PLPNavHeaderComponent],
   providers : [ SharedService , ServerApi , ApiCallClass]
})
export class VolunteerCommunityServiceComponent {

   @Input('report-status') report="";
   volunteerCommunityServiceData:VolunteerCommunityServiceModel[];
   sectionObject;
   section = "VolunteerCommunityService";  

     constructor(private shared:SharedService, private serverApi:ServerApi,private apiJson:ApiCallClass) {
    }

    //ngOnInit is called just after constructor calling, we are initializing variable values here
    ngOnInit(){
        this.sectionObject = this.shared.getSectionObject(this.section);
        this.getVolunteerCommunityServiceData();
    }
  
  //Below function is for getting data from server 
  getVolunteerCommunityServiceData(){
      let urlObj=this.shared.getUrlObject(this.section);
      this.apiJson.endUrl = urlObj.endUrl;
         
       let data={
                stateAbbr :this.shared.getStateAbbr(),	
                accountID :this.shared.getAccountId()
      }
      this.apiJson.method="GET";
     // this.apiJson.endUrl="VolunteerExperiences";
      this.apiJson.sessionID = this.shared.getAuthKey();
        let dat=JSON.stringify(data);
 
        this.apiJson.data=dat;
        this.serverApi.callApi([this.apiJson]).subscribe((response)=>{

            this.volunteerCommunityServiceData=response[0].Result;
        });
  }
}

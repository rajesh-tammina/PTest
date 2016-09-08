import { Component,Input, Output, EventEmitter} from '@angular/core';

import { ApiCallClass } from '../../../../shared/apicall.model';
import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { VolunteerCommunityServiceModel } from './volunteer-community-service.model';
import { SharedService } from '../shared/shared-service.service';
import { ServerApi } from '../../../../shared/app.apicall.service';
import { Utilities } from '../../../../shared/utilities.class';

@Component({
  selector: 'volunteer-community-service',
  templateUrl: './app/modules/PLP/shared/volunteer-community-service/volunteer-community-service.layout.html',
  directives:[PLPNavHeaderComponent],
   providers : [ SharedService , ServerApi , ApiCallClass ,Utilities]
})
export class VolunteerCommunityServiceComponent {

   @Input('report-status') report="";
   @Output('changeView') changeInrView= new EventEmitter();
   @Output() containResult= new EventEmitter();

   volunteerCommunityServiceData:VolunteerCommunityServiceModel[];
   sectionObject;
   tableNoData;
   section = "VolunteerCommunityService";  

     constructor(private shared:SharedService, private serverApi:ServerApi,private apiJson:ApiCallClass,private utils:Utilities) {
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
          let nodata = this.shared.getTableNoData(this.section);
        this.tableNoData = nodata;
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

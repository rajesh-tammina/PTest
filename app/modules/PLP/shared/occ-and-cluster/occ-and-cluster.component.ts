import { Component,Input } from '@angular/core';

import { ApiCallClass } from '../../../../shared/apicall.model';
import { OccAndClusterModel } from './occ-and-cluster.model';
import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { SharedService } from '../shared/shared-service.service';
import { ServerApi } from '../../../../shared/app.apicall.service';
import sections = require("../../../../shared/app.constants");

@Component({
  selector: 'occ-and-cluster',
  templateUrl: './app/modules/PLP/shared/occ-and-cluster/occ-and-cluster.layout.html',
  directives:[PLPNavHeaderComponent],
  providers : [ SharedService , ServerApi , ApiCallClass ]
})
export class OccAndClusterComponent {
   @Input('report-status') report="";
   occAndClusterData:OccAndClusterModel[];
   endurl;
   sectionObject;
   section = "OccAndCluster";
   fileName;  

     constructor(private shared:SharedService, private serverApi:ServerApi,private apiJson:ApiCallClass) {
    }

    ngOnInit(){
        this.sectionObject = this.shared.getSectionObject(this.section);
       this.getOccAndClusterData();
    }
  
  getOccAndClusterData(){
       let urlObj=this.shared.getUrlObject(this.section);
       this.apiJson.endUrl = urlObj.endUrl;

      let data={
                stateAbbr :this.shared.getStateAbbr(),	
                accountID :this.shared.getAccountId(),
                fileName:urlObj.fileName
      }
      this.apiJson.method="GET";
      //this.apiJson.endUrl="SavedFiles";
      this.apiJson.sessionID=this.shared.getAuthKey();
        let dat=JSON.stringify(data);
 
        this.apiJson.data=dat;
        this.serverApi.callApi([this.apiJson]).subscribe((response)=>{

            this.occAndClusterData=response[0].Result;
        });
  }
  
 
}

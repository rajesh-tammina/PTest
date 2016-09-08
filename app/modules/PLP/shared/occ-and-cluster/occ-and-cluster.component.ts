import { Component,Input, Output, EventEmitter } from '@angular/core';

import { ApiCallClass } from '../../../../shared/apicall.model';
import { CustomDate } from '../../../../shared/customPipes';
import { OccAndClusterModel } from './occ-and-cluster.model';
import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { SharedService } from '../shared/shared-service.service';
import { ServerApi } from '../../../../shared/app.apicall.service';
import sections = require("../../../../shared/app.constants");

@Component({
  selector: 'occ-and-cluster',
  templateUrl: './app/modules/PLP/shared/occ-and-cluster/occ-and-cluster.layout.html',
  directives:[PLPNavHeaderComponent],
  providers : [ SharedService , ServerApi , ApiCallClass ],
  pipes: [CustomDate]
})
export class OccAndClusterComponent {
   @Input('report-status') report="";
   @Output('changeView') changeInrView= new EventEmitter();
   @Output() containResult= new EventEmitter();
   
   occAndClusterData:OccAndClusterModel[];
   endurl;
   sectionObject;
   section = "OccAndCluster";
   fileName;  
   tableNoData;

     constructor(private shared:SharedService, private serverApi:ServerApi,private apiJson:ApiCallClass) {
    }

    ngOnInit(){
        this.sectionObject = this.shared.getSectionObject(this.section);
       this.getOccAndClusterData();
    }
  
  getOccAndClusterData(){
       let urlObj=this.shared.getUrlObject(this.section);
       this.apiJson.endUrl = urlObj.endUrl;
 let nodata = this.shared.getTableNoData(this.section);
        this.tableNoData = nodata;
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
            
            if(response[0].Result!=null){
                this.containResult.emit({"section":this.section,result:"filled"});
              }
              else{
                this.containResult.emit({"section":this.section,result:"empty"});
              }
         },this.shared.handleError);
  }
  
  changeView(evnt){
      this.changeInrView.emit(evnt);
  }
 
}

import { Component, Input } from '@angular/core';

import { ApiCallClass } from '../../../../shared/apicall.model';
import { CommentsAndSignatureModel } from './comments-and-signature.model';
import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { SharedService } from '../shared/shared-service.service';
import { ServerApi } from '../../../../shared/app.apicall.service';
import sections = require("../../../../shared/app.constants");

@Component({
  selector: 'comments-and-signature',
  templateUrl: './app/modules/PLP/shared/comments-and-signature/comments-and-signature.layout.html',
  directives:[PLPNavHeaderComponent],
  providers : [ SharedService , ServerApi , ApiCallClass ]
})
export class CommentsAndSignatureComponent {
  @Input('report-status') report="";
  commentsAndSignatureData={
   Comment: ""  
  };
  sectionObject;
   section = "CommentsAndSignature"; 
   endurl;
    constructor(private shared:SharedService, private serverApi:ServerApi,private apiJson:ApiCallClass) {
    }

    ngOnInit(){
        this.sectionObject = this.shared.getSectionObject(this.section);
        this.endurl = sections.EndUrlArr;
        this.getCommentsAndSignatureData();
    }
  
  getCommentsAndSignatureData(){
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

            this.commentsAndSignatureData=response[0].Result;
        });
  }
  
 
}

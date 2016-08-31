import { Component,Input } from '@angular/core';
import { ControlGroup,Control,Validators,FormBuilder,CORE_DIRECTIVES,FORM_DIRECTIVES} from '@angular/common';

import { ApiCallClass } from '../../../../shared/apicall.model';
import { CustomValidations } from '../shared/common-validation';
import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { TestScoresModel } from './test-scores.model';
import { SharedService } from '../shared/shared-service.service';
import { ServerApi } from '../../../../shared/app.apicall.service';
import sections = require("../../../../shared/app.constants");

@Component({
  selector: 'test-scores',
  templateUrl: './app/modules/PLP/shared/test-scores/test-scores.layout.html',
  directives:[PLPNavHeaderComponent,FORM_DIRECTIVES],
  providers : [ SharedService , ServerApi , ApiCallClass ]
})
export class TestScoresComponent {
   @Input('report-status') report="";
   testScoresData:TestScoresModel[];

    sectionObject;
    questionObject;
    endurl;
    section = "TestScores";  
    testScoresForm: ControlGroup;
   constructor(private shared:SharedService, private serverApi:ServerApi,private apiJson:ApiCallClass,fb:FormBuilder) {
      this.testScoresForm = fb.group({
          Test : ["",Validators.compose([CustomValidations.noScript])],
          score:  ["",Validators.compose([CustomValidations.noScript])]
    });
    }

    ngOnInit(){
         this.sectionObject = this.shared.getSectionObject(this.section);
         this.questionObject = this.shared.getQuestion(this.section);
         this.getTestScoresData();
    }
  
  getTestScoresData(){
     let urlObj=this.shared.getUrlObject(this.section);
     this.apiJson.endUrl = urlObj.endUrl;
      
      let data={
                stateAbbr :this.shared.getStateAbbr(),	
                accountID :this.shared.getAccountId()
               
      }
      this.apiJson.method="GET";
      this.apiJson.sessionID=this.shared.getAuthKey();
        let dat=JSON.stringify(data);
 
        this.apiJson.data=dat;
        this.serverApi.callApi([this.apiJson]).subscribe((response)=>{

            this.testScoresData=response[0].Result;
        });
  }
 
}

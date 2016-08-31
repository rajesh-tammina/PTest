import { Component ,OnInit,Input,Output,EventEmitter} from '@angular/core';
import { ControlGroup,Control,Validators,FormBuilder,CORE_DIRECTIVES,FORM_DIRECTIVES} from '@angular/common';

import { ApiCallClass } from '../../../../shared/apicall.model';
import { CustomValidations } from '../shared/common-validation';
import { ReflectionModel } from './reflection.model';
import { ServerApi } from '../../../../shared/app.apicall.service';
import { SharedService } from './shared-service.service';
import sections = require("../../../../shared/app.constants");

@Component({
   selector: 'reflection',
   templateUrl: './app/modules/PLP/shared/shared/reflection.layout.html',
   directives: [ FORM_DIRECTIVES ],
   providers: [ ServerApi,ApiCallClass,ReflectionModel,SharedService ]
})
export class ReflectionComponent {
   @Input() reflectionObj="";
   @Input() fieldName="";
   @Input() sectionName="";
   @Input('question') question="";
   @Input('report-status') report="";
   reflectionInfo = new ReflectionModel();
   reflectionPostReq ;//=new ReflectionModel();
   reflectionFieldName;
   endurl;

   public userdata = {
        stateAbbr: "IC",
        accountID: 7662,
        fieldName : ""
    };

 reflectionForm: ControlGroup;
  constructor(private apiService: ServerApi,private apiJson:ApiCallClass,
   private reflectionModel:ReflectionModel,private shared:SharedService,fb:FormBuilder){
    this.reflectionForm = fb.group({
           ReflectionText : ["",Validators.compose([CustomValidations.noScript])]
    });
   }

 ngOnInit(){
       this.endurl = sections.EndUrlArr;
       this.getReflection();
    
    }
   
  //This function is used to get data from server 
    getReflection () {
          this.apiJson.method="GET";
          let urlObj=this.shared.getUrlObject(this.sectionName);
          this.apiJson.endUrl = urlObj.endUrl;
          this.apiJson.sessionID = this.shared.getAuthKey();
          this.userdata.fieldName = this.fieldName;
          let user=JSON.stringify(this.userdata);
          this.apiJson.data=user;
          this.apiService.callApi([this.apiJson]).subscribe((resp) => {
          this.reflectionInfo=resp[0].Result;
            });
     }

//This function is used to post data to server
saveReflectionInfo() {
      this.apiJson.method="POST";
          let urlObj=this.shared.getUrlObject(this.sectionName);
          if(urlObj.section == "EducationPlans"){
                 alert("coming in if");
                  this.reflectionFieldName=urlObj.fieldNameRef;
               }
               else{
                   this.reflectionFieldName=urlObj.fieldName;
               }
          this.apiJson.endUrl = urlObj.endUrl;

      this.apiJson.sessionID = this.shared.getAuthKey();
      this.reflectionPostReq={
          "StateAbbr": this.shared.getStateAbbr(),
          "AccountID": this.shared.getAccountId(),
          "FieldName": this.reflectionFieldName,
          "UserNotes": this.reflectionInfo.UserNotes
      };
      let user=JSON.stringify(this.reflectionPostReq);
      this.apiJson.data=user;
      this.apiService.callApi([this.apiJson]).subscribe((response) => {
           });
  }

  InsertReflectionInfo(){
    this.reflectionModel.Today = new Date();
    var day = this.reflectionModel.Today .getDate();
    var monthIndex = this.reflectionModel.Today .getMonth();
    var year = this.reflectionModel.Today .getFullYear();
    var todayDate = day+"/"+monthIndex+"/"+year;
    this.reflectionInfo.UserNotes = todayDate+"\n"+this.reflectionInfo.UserNotes;
  }


}
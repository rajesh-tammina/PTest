
import {Component,Input,OnInit} from '@angular/core';

import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { ReflectionComponent } from '../shared/reflection.component';
import {ServerApi} from '../../../../shared/app.apicall.service';
import { ApiCallClass } from '../../../../shared/apicall.model';
import {EducationPlansModel} from '../education-plans/education-plans.model';
import {ControlGroup,Control,Validators,FormBuilder,CORE_DIRECTIVES,FORM_DIRECTIVES} from '@angular/common';
import { Http, Response } from '@angular/http';
import { SharedService } from '../shared/shared-service.service';
import sections = require("../../../../shared/app.constants");

@Component({
  selector: 'education-plans',
  templateUrl: './app/modules/PLP/shared/education-plans/education-plans.layout.html',
  directives:[PLPNavHeaderComponent,FORM_DIRECTIVES,ReflectionComponent],
  providers:[ServerApi,ApiCallClass,EducationPlansModel,SharedService]
})
export class EducationPlansComponent {
       @Input('report-status') report="";
        sectionObject;
        questionObject;
        educationFieldList;
        edufieldName;
        section = "EducationPlans";  
        field="PSPlans";
        currentValue="";
        currentFlag="";
        endurl;
    selectedList =[];  
education=[];
   educationForm: ControlGroup;
   educationPlanCheck = new EducationPlansModel();
 
   public educationCompa = [
     
  ];
   public saveOnchangeVal = [
     
  ];
  public educationPlanRef = {
        "LastSaved": new Date,
        "userNotes":""
  };
 
 public  educationPostReq = {
          "stateAbbr": "",
          "accountID": "",
          "fieldName" : "",
          "userNotes":   ""
      };
  userNotesPost="";
  
  constructor(private apiService: ServerApi,private apiJson:ApiCallClass,
                private apiJson1:ApiCallClass,private shared:SharedService,
                private educationPlansModel:EducationPlansModel,
                private http: Http,private fb:FormBuilder){
       
   }
    ngOnInit(){
         this.sectionObject = this.shared.getSectionObject(this.section);
         this.questionObject = this.shared.getQuestion(this.section);
        this.educationFieldList=sections.educationFieldsArr;
         this.educationForm = this.fb.group({
                            userNotes:['',Validators.required]
                        });
        this.getEducationPlans();
    }

    getEducationPlans(){
        //alert("comig");
        this.apiJson= new ApiCallClass();
    
      let urlObj=this.shared.getUrlObject(this.section);
      this.apiJson.endUrl = urlObj.endUrl;

        let userdata = {
                        stateAbbr: this.shared.getStateAbbr(),
                        accountID: this.shared.getAccountId(),
                        fieldName : urlObj.fieldNameCheck
                        };
        this.apiJson.method="GET";
      //  this.apiJson.endUrl = "Reflection";
        this.apiJson.sessionID =this.shared.getAuthKey();
        let user=JSON.stringify(userdata);
        this.apiJson.data=user;
         this.apiService.callApi([this.apiJson]).subscribe((resp) => {
         this.educationPlanCheck=resp[0].Result;
         // alert(this.educationPlanCheck.UserNotes.split(','));
           this.selectedList = this.educationPlanCheck.UserNotes.split(',');
          for(var i=0;i<this.selectedList.length;i++){
                this.educationCompa.push({"usernotes":this.selectedList[i]});
          }
   
         if(this.educationFieldList.length>0)
          {
          this.educationFieldList.forEach((obj,key)=>{
              this.educationCompa.forEach((k,v)=>{
                 // alert(k.usernotes[v]);
              if(obj.value == k.usernotes){
                // alert("yes");
                 obj.selected=true;
             }
          })
          })
        }
     });
    }

    insertEducationPlanRef(){
            this.educationPlansModel.Today = new Date();
            var day = this.educationPlansModel.Today .getDate();
            var monthIndex = this.educationPlansModel.Today .getMonth();
            var year = this.educationPlansModel.Today .getFullYear();
            var todayDate = day+"/"+monthIndex+"/"+year;
            this.educationPlanRef.userNotes = todayDate+"\n"+ this.educationPlanRef.userNotes;
    }

  saveEducationPlanCheck(){
     // alert(this.educationFieldList.value);
    var cnt=0;
       if(this.educationFieldList.length>0)
          {
          this.educationFieldList.forEach((obj,key)=>{
              if(obj.selected == true){
                  if(cnt == 0){
                    this.currentValue= obj.value;
                  }
                  else{
                     this.currentValue= this.currentValue+","+obj.value;
                  }
                 
             }
             cnt++;
          })
          
        }
      // alert( this.currentValue);
 this.apiJson.method="POST";
  if(this.endurl.length>0)
          {
          this.endurl.forEach((obj,key)=>{
              
             if(obj.section+"" == this.section+""){
               this.apiJson.endUrl = obj.endUrl;
               this.edufieldName = obj.fieldNameCheck;
              // alert("this.apiJson.endUrl"+this.edufieldName);
             }
          })
        }
      //this.apiJson.endUrl="Reflection";
      this.apiJson.sessionID = this.shared.getAuthKey();
      
      this.educationPostReq={
          "stateAbbr": this.shared.getStateAbbr(),
          "accountID": this.shared.getAccountId(),
          "fieldName" : this.edufieldName ,
          "userNotes": this.currentValue
      };
      //  alert("careerPostReq==>"+JSON.stringify(this.educationPostReq));
      let user=JSON.stringify(this.educationPostReq);
     // alert("user==>"+user)
      this.apiJson.data=user;
     // alert("post data----------"+JSON.stringify(this.apiJson));
      this.apiService.callApi([this.apiJson]).subscribe((response) => {
          // alert("response->"+JSON.stringify(response));
           });
  }



}

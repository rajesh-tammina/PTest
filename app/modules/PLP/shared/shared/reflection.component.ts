import { Component ,OnInit,Input,Output,EventEmitter} from '@angular/core';
import { ControlGroup,Control,Validators,FormBuilder,CORE_DIRECTIVES,FORM_DIRECTIVES} from '@angular/common';

import { ApiCallClass } from '../../../../shared/apicall.model';
import { CustomValidations } from '../shared/common-validation';
import { ReflectionModel } from './reflection.model';
import { ServerApi } from '../../../../shared/app.apicall.service';
import { SharedService } from './shared-service.service';
import { Utilities } from '../../../../shared/utilities.class';
import { CustomDate } from '../../../../shared/customPipes';

import sections = require("../../../../shared/app.constants");
import messages = require("../../../../shared/messages");

@Component({
   selector: 'reflection',
   templateUrl: './app/modules/PLP/shared/shared/reflection.layout.html',
   directives: [ FORM_DIRECTIVES ],
   providers: [ ServerApi,ApiCallClass,ReflectionModel,SharedService, Utilities ],
   pipes:[ CustomDate ]
})
export class ReflectionComponent {
   @Input() reflectionObj="";
   @Input() fieldName="";
   @Input() sectionName="";
   @Input('question') question="";
   @Input('report-status') report="";
   @Output() containResult= new EventEmitter();

   reflectionInfo = new ReflectionModel();
   reflectionPostReq ;//=new ReflectionModel();
   reflectionFieldName;
   endurl;
   errorMessage;
   successLabel;
  public edited = false;
  public errorVal = false;
   public userdata = {
        stateAbbr:this.shared.getStateAbbr(),
        accountID: this.shared.getAccountId(),
        fieldName : ""
    };

 reflectionForm: ControlGroup;
  constructor(private serverApi: ServerApi,private utils:Utilities,private apiJson:ApiCallClass,
   private reflectionModel:ReflectionModel,private shared:SharedService,fb:FormBuilder){
    this.reflectionForm = fb.group({
          ReflectionText : ["",Validators.compose([CustomValidations.noScript,Validators.maxLength(7500)])]
   });
    this.errorMessage = messages.messages;
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
          this.serverApi.callApi([this.apiJson]).subscribe((response) => {
                this.reflectionInfo=response[0].Result;
                //alert("getReflection data is:"+response[0].Result.UserNotes);
                if(response[0].Result.UserNotes!="" && response[0].Result.UserNotes!=null && response[0].Result!=null){
                   this.containResult.emit({"section":this.sectionName,result:"filled"});
                }
                else{
                  this.containResult.emit({"section":this.sectionName,result:"empty"});
                }

           },this.utils.handleError);
     }

//This function is used to post data to server
saveReflectionInfo() {
  this.utils.showLoading();
      this.apiJson.method="POST";
          let urlObj=this.shared.getUrlObject(this.sectionName);
          if(urlObj.section == "EducationPlans"){
                  this.reflectionFieldName=urlObj.fieldNameRef;
                  //alert("coming in educarion palns");
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
      this.serverApi.callApi([this.apiJson]).subscribe((response) => {
        //alert("response===>"+response.Result);
        if(response.Result+"" == "true"){
          this.utils.hideLoading();
          var dd = new Date();
          this.reflectionInfo.UpdatedTimeStamp = dd.toDateString(); 
          let successMsg=this.shared.getSuccessMessage(this.sectionName);
           this.successLabel= successMsg.save;
        // alert(successMsg.error);
          this.edited = true;
           //wait 3 Seconds and hide
           //alert("this.reflectionInfo.UserNotes"+this.reflectionInfo.UserNotes);
            if(this.reflectionInfo.UserNotes == "" || this.reflectionInfo.UserNotes == null){
              //  alert("coming in if");
               this.containResult.emit({"section":this.sectionName,result:"empty"});
             }
            else{
              this.containResult.emit({"section":this.sectionName,result:"filled"});
            }
           setTimeout(function() {
             this.edited = false;
           // console.log(this.edited);
           }.bind(this), 5000);
        }
        else{
           this.utils.hideLoading();
         let successMsg=this.shared.getSuccessMessage(this.sectionName);
           this.successLabel= successMsg.error;
        this.errorVal = true;
           //wait 3 Seconds and hide
           setTimeout(function() {
             this.errorVal = false;
           // console.log(this.edited);
           }.bind(this), 5000); 
        }
    },error =>  this.logError(error));
  }

logError(error: any) {
       this.utils.hideLoading();
         let successMsg=this.shared.getSuccessMessage(this.sectionName);
           this.successLabel= successMsg.error;
        this.errorVal = true;
           //wait 3 Seconds and hide
           setTimeout(function() {
             this.errorVal = false;
           // console.log(this.edited);
           }.bind(this), 5000); 
   }

  InsertReflectionInfo(){
    try{
    let dt = new Date();
    var day = dt.getDate();
    var monthIndex = dt.getMonth()+1;  //January is 0!
    var year = dt.getFullYear();
    let mm=monthIndex+"";
    let dd=day+"";
      if(day<10){
          dd='0'+day;
      } 
      if(monthIndex<10){
          mm='0'+monthIndex;
      } 
    var todayDate = mm+"/"+dd+"/"+year;
    this.reflectionInfo.UserNotes = todayDate+"\n"+this.reflectionInfo.UserNotes;
    }
    catch(e){
      alert("insert date exception:"+e.message);

    }
  }
}
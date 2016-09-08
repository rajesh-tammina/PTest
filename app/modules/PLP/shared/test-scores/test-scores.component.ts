import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlGroup,Control,Validators,FormBuilder,CORE_DIRECTIVES,FORM_DIRECTIVES,AbstractControl} from '@angular/common';

import { ApiCallClass } from '../../../../shared/apicall.model';
import { CustomValidations } from '../shared/common-validation';
import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { TestScoresModel } from './test-scores.model';
import { SharedService } from '../shared/shared-service.service';
import { ServerApi } from '../../../../shared/app.apicall.service';
import { Utilities } from '../../../../shared/utilities.class';

import sections = require("../../../../shared/app.constants");
import message = require("../../../../shared/messages");
declare var $:any;
@Component({
  selector: 'test-scores',
  templateUrl: './app/modules/PLP/shared/test-scores/test-scores.layout.html',
  directives:[PLPNavHeaderComponent,FORM_DIRECTIVES],
  providers : [ SharedService , ServerApi , ApiCallClass, Utilities ]
})
export class TestScoresComponent {
   @Input('report-status') report="";
   @Output('changeView') changeInrView= new EventEmitter();
   @Output() containResult= new EventEmitter();
   
   testScoresData:TestScoresModel[];
    public tableshow= false;
    public emptyTableShow= false;
    sectionObject;
    questionObject;
    endurl;
    errorMessage;
    sectionsList;
    section = "TestScores";  
    Test:AbstractControl;
    score:AbstractControl;
    testScoresForm: ControlGroup;
    public testScoresPostReq={
        "StateAbbr": "",
        "AccountID": "",
        "TestScores": []
    };
    successLabel;
  public edited = false;
  public errorVal = false;

   constructor(private shared:SharedService,private utils:Utilities,
   private serverApi:ServerApi,private apiJson:ApiCallClass,fb:FormBuilder) {
      this.testScoresForm = fb.group({
          'Test' : ["",Validators.compose([CustomValidations.noScript,Validators.maxLength(100)])],
          'score': ["",Validators.compose([CustomValidations.noScript,Validators.maxLength(100)])]
    });
     this.Test = this.testScoresForm.controls['Test'];
     this.score = this.testScoresForm.controls['score'];

    this.errorMessage=message.messages;
    }

    ngOnInit(){
         this.sectionObject = this.shared.getSectionObject(this.section);
         this.questionObject = this.shared.getQuestion(this.section);
         this.getTestScoresData();
    }
  
  getTestScoresData(){
     let urlObj=this.shared.getUrlObject(this.section);
     this.apiJson.endUrl = urlObj.endUrl;
     let testArr=[];
      let filledStatus="";
      let data={
                stateAbbr :this.shared.getStateAbbr(),	
                accountID :this.shared.getAccountId()
               
      }
      this.apiJson.method="GET";
      this.apiJson.sessionID=this.shared.getAuthKey();
        let dat=JSON.stringify(data);
        this.apiJson.data=dat;
        this.serverApi.callApi([this.apiJson]).subscribe((response)=>{
          var testScoresTmpData =  response[0].Result;
          testScoresTmpData.forEach((obj, key) => {

           // alert("testScoresTmpData:"+JSON.stringify(obj));
           if(obj.TestName == "" && obj.Score == ""){
              //this.containResult.emit({"section":this.section,result:"empty"});
           }
           else{
               //this.containResult.emit({"section":this.section,result:"filled"});
              testArr.push(obj);
               
             filledStatus = "filled";
           //  alert("filledStatus"+filledStatus);
           }
    })
  //  alert("filledStatus:"+filledStatus);
    if(filledStatus == "filled"){
        this.containResult.emit({"section":this.section,result:"filled"});
    }
    else{
      
      testArr.push({"TestName":"","Score":""});
       //alert(JSON.stringify(testArr));
        this.containResult.emit({"section":this.section,result:"empty"});
    }
    this.testScoresData=testArr;
       // alert("testArr:"+JSON.stringify(this.testScoresData));
        },this.utils.handleError);
  }

   add(){
       this.testScoresData.push({"TestName":"","Score":""});
   }

remove(inx){
    //  alert("inx"+inx);
          this.testScoresData.forEach((obj, key) => {
            if(inx == key){
             //alert("yes");
                 this.testScoresData.splice(key, inx);
            }
           // alert("testScoresTmpData:"+JSON.stringify(obj));
         
    })
}
 //below method is used to post the data to the server
    SaveTestScores(){
     // alert("coming"+JSON.stringify(this.testScoresData));
      this.utils.showLoading();
          let urlObj=this.shared.getUrlObject(this.section);
            this.apiJson.endUrl = urlObj.endUrl;
            this.apiJson.method="POST";
            this.apiJson.sessionID = this.shared.getAuthKey();
            this.testScoresPostReq ={
                "StateAbbr":this.shared.getStateAbbr(),
                "AccountID": this.shared.getAccountId(),
                "TestScores": this.testScoresData
           };
           // alert(JSON.stringify(this.testScoresPostReq));
          
            let user=JSON.stringify(this.testScoresPostReq);
            this.apiJson.data=user;
            this.serverApi.callApi([this.apiJson]).subscribe((response) => {
              //alert(JSON.stringify(response));
              if(response.Result+"" == "true"){
               // alert("if:"+JSON.stringify(response));
                this.utils.hideLoading();
            //     this.testScoresData.forEach((obj, key) => {
            //           if(obj.TestName == "" && obj.Score == ""){
            //               this.containResult.emit({"section":this.section,result:"empty"});
            //           }
            //           else{
            //               this.containResult.emit({"section":this.section,result:"filled"});
            //           }
            //  })
                let successMsg=this.shared.getSuccessMessage(this.section);
                this.successLabel= successMsg.update;
                //alert(this.successLabel);
                this.edited = true;
                //wait 3 Seconds and hide
                setTimeout(function() {
                this.edited = false;
                // console.log(this.edited);
                }.bind(this), 5000);
              }
              else{
               // alert("else:"+JSON.stringify(response));
                this.utils.hideLoading();
                let successMsg=this.shared.getSuccessMessage(this.section);
                this.successLabel= successMsg.error;
                 this.errorVal = true;
               //wait 3 Seconds and hide
                setTimeout(function() {
                    this.errorVal = false;
                    // console.log(this.edited);
                  }.bind(this), 5000); 
               }
            },error => this.logError(error));
    }

    changeView(evnt){
      this.changeInrView.emit(evnt);
    } 

    logError(error: any) {
    // alert(error);
   this.utils.hideLoading();
         let successMsg=this.shared.getSuccessMessage(this.section);
           this.successLabel= successMsg.error;
        this.errorVal = true;
           //wait 3 Seconds and hide
           setTimeout(function() {
             this.errorVal = false;
           // console.log(this.edited);
           }.bind(this), 5000); 
   }



}

 import { Component , OnInit,Input,Output,EventEmitter } from '@angular/core';
 import { ControlGroup, Control, Validators, FormBuilder, FORM_DIRECTIVES } from '@angular/common';

 import { ApiCallClass } from '../../../../shared/apicall.model';
 import { CustomValidations } from '../shared/common-validation';
 import { PersonalInfoModel} from '../personal-info/personal-info.model';
 import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
 import { ServerApi } from '../../../../shared/app.apicall.service';
 import { SharedService } from '../shared/shared-service.service';
 import { Utilities } from '../../../../shared/utilities.class';

 import sections = require("../../../../shared/app.constants");


@Component({
  selector: 'personal-info',
  templateUrl: './app/modules/PLP/shared/personal-info/personal-info.layout.html',
  directives: [ PLPNavHeaderComponent, FORM_DIRECTIVES ],
  providers: [ ServerApi, ApiCallClass, PersonalInfoModel, SharedService, Utilities ]
})


export class PersonalInfoComponent implements OnInit{
   @Input('report-status') report="";
   @Output('changeView') changeInrView= new EventEmitter();
   @Output() containResult= new EventEmitter();
   @Output() userDataChanged = new EventEmitter();
   errorMessage: string;
   section = "PersonalInfo";
   sectionObject;
   endURL;
   isLoading =true;
   userInfo = new PersonalInfoModel;
   imageUrl;
   personalForm: ControlGroup;
   endurl;
   sub;
   successLabel;
  public edited = false;
  public errorVal = false;
   constructor(private serverApi : ServerApi, private utils:Utilities,
                private personalInfoModel:PersonalInfoModel,
                private apiJson:ApiCallClass, 
                private apiJson1:ApiCallClass,private shared:SharedService,
                fb:FormBuilder){
                this.personalForm = fb.group({
                 lastName: ["", Validators.compose([Validators.required,
                 CustomValidations.nameValid,Validators.maxLength(50)])],
                 firstName: ["", Validators.compose([Validators.required,CustomValidations.nameValid,Validators.maxLength(50)])],
                 middleName:  ["",Validators.compose([CustomValidations.nameValid,Validators.maxLength(50)])],
                 email:["",Validators.compose([CustomValidations.mailFormat,Validators.maxLength(50)])],
                 gradYear: ["", Validators.compose([Validators.required,CustomValidations.containOnlyNumerals])]
               });

                this.errorMessage=this.shared.getMessages();
    }

  changeView(evnt){
      this.changeInrView.emit(evnt);
  }
  //The method is called when the component is initialized 
   ngOnInit(){    
        this.sectionObject = this.shared.getSectionObject(this.section);
        //this.utils.showLoading();
        this.getPersonalInfo();
    }
    
    
    
//The below method is used to get the data from server.
  getPersonalInfo () {
      let userdata = {
            stateAbbr: this.shared.getStateAbbr(),
            accountID: this.shared.getAccountId()
        };
       this.apiJson.method="GET";
       let urlObj=this.shared.getUrlObject(this.section);
       this.apiJson.endUrl = urlObj.endUrl;

      //this.apiJson.endUrl = "Account";
      this.apiJson.sessionID = this.shared.getAuthKey();
      let user=JSON.stringify(userdata);
      this.apiJson.data=user;
      
      this.serverApi.callApi([this.apiJson]).subscribe((response) => {
                  this.userInfo = response[0].Result;
                  this.userInfo.UserFullName = this.userInfo.FirstName+" "+this.userInfo.LastName;
                 if(this.userInfo.Avatar == null){
                      this.userInfo.Avatar = "./app/images/no-profile-image.jpg";      
                 }
                if ((this.userInfo.LastName!="") && (this.userInfo.FirstName!="")  && (this.userInfo.GradYear!="")){
                    this.containResult.emit({"section":this.section,result:"filled"});
                    this.userDataChanged.emit({"username":this.userInfo.UserFullName});
                }
                else{
                    this.containResult.emit({"section":this.section,result:"empty"});
                }
                    
                 // this.utils.hideLoading();
                 // this.isLoading = false;
        },this.utils.handleError);
    }
  

//The below method is used to send the data to the server
SavePersonalInfo () {
     this.utils.showLoading();
      this.apiJson.method="POST";
      this.apiJson.endUrl="Account";
      let email=this.userInfo.Email;
      if(email==null)
      {
          email="";
      }
      let data={
            "StateAbbr": this.shared.getStateAbbr(),
            "AccountID": this.shared.getAccountId(),
            "FirstName":this.userInfo.FirstName,
            "LastName":this.userInfo.LastName,
            "MiddleName":this.userInfo.MiddleName,
            "GradYear":this.userInfo.GradYear,
            "Email":email
           };
      this.apiJson.sessionID = this.shared.getAuthKey();
      let user=JSON.stringify(data);
      this.apiJson.data=user;
      this.serverApi.callApi([this.apiJson]).subscribe((response) => {
          if(response.Result+"" == "true"){
                 this.utils.hideLoading();
                let successMsg=this.shared.getSuccessMessage(this.section);
                this.successLabel= successMsg.update;
                // alert(successMsg.error);
                this.edited = true;
               if ((this.userInfo.LastName!="") && (this.userInfo.FirstName!="")  && (this.userInfo.GradYear!="")){
                    this.containResult.emit({"section":this.section,result:"filled"});
                    this.userDataChanged.emit({"username":this.userInfo.UserFullName});
                }
                else{
                    this.containResult.emit({"section":this.section,result:"empty"});
                }
                //wait 3 Seconds and hide
                setTimeout(function() {
                    this.edited = false;
                // console.log(this.edited);
                }.bind(this), 5000);
          }
         else{
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
          this.userInfo.UserFullName = this.userInfo.FirstName+" "+this.userInfo.LastName;
           this.userDataChanged.emit({"username":this.userInfo.UserFullName});
       },error =>  this.logError(error));
     
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

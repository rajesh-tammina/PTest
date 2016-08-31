 import { Component , OnInit,Input } from '@angular/core';
 import { ControlGroup, Control, Validators, FormBuilder, FORM_DIRECTIVES } from '@angular/common';

 import { ApiCallClass } from '../../../../shared/apicall.model';
 import { CustomValidations } from '../shared/common-validation';
 import { PersonalInfoModel} from '../personal-info/personal-info.model';
 import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
 import { ServerApi } from '../../../../shared/app.apicall.service';
 import { SharedService } from '../shared/shared-service.service';
 import sections = require("../../../../shared/app.constants");

@Component({
  selector: 'personal-info',
  templateUrl: './app/modules/PLP/shared/personal-info/personal-info.layout.html',
  directives: [ PLPNavHeaderComponent, FORM_DIRECTIVES ],
   providers: [ ServerApi, ApiCallClass, PersonalInfoModel, SharedService ]
})


export class PersonalInfoComponent implements OnInit{
   @Input('report-status') report="";
   errorMessage: string;
   section = "PersonalInfo";
   sectionObject;
   endURL;
   isLoading =true;
   userInfo = new PersonalInfoModel;
   imageUrl;
   personalForm: ControlGroup;
   endurl;
   constructor(private personalInfoService : ServerApi,
                private personalInfoModel:PersonalInfoModel,
                private apiJson:ApiCallClass, 
                private apiJson1:ApiCallClass,private shared:SharedService,
                fb:FormBuilder){
                this.personalForm = fb.group({
                  lastName: ["", Validators.compose([Validators.required,
                  CustomValidations.nameValid])],
                  firstName: ["", Validators.compose([CustomValidations.nameValid])],
                  middleName:  ["",Validators.compose([CustomValidations.nameValid])],
                  email:["",Validators.compose([Validators.required,CustomValidations.mailFormat])],
                  gradYear: ["", Validators.required]
                });
    }

  
  //The method is called when the component is initialized 
   ngOnInit(){
        this.sectionObject = this.shared.getSectionObject(this.section);
        this. getPersonalInfo();
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
      
      this.personalInfoService.callApi([this.apiJson]).subscribe((resp) => {
                  this.userInfo = resp[0].Result;
                  this.userInfo.UserFullName = this.userInfo.FirstName+" "+this.userInfo.LastName;
                  this.isLoading = false;
        });
    }
  

//The below method is used to send the data to the server
SavePersonalInfo () {

      this.apiJson.method="POST";
      this.apiJson.endUrl="Account";
      this.apiJson.sessionID = this.shared.getAuthKey();
      let user=JSON.stringify(this.userInfo);
      this.apiJson.data=user;
      this.personalInfoService.callApi([this.apiJson]).subscribe((response) => {
           });
     
  }
}

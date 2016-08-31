import { Component, Input } from '@angular/core';


import { ApiCallClass } from '../../../../shared/apicall.model';
import { CareerClusterModel } from './career-cluster.model';
import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { ServerApi } from '../../../../shared/app.apicall.service';
import { SharedService } from '../shared/shared-service.service';
import sections = require("../../../../shared/app.constants");

@Component({
  selector: 'career-cluster',
  templateUrl: './app/modules/PLP/shared/career-cluster/career-cluster.layout.html',
  directives:[PLPNavHeaderComponent],
  providers : [ SharedService, ServerApi, ApiCallClass ]
})
export class CareerClusterComponent {
  @Input('report-status') report="";
  careerClusterData:CareerClusterModel[];
  careerClusterCheck:CareerClusterModel[];
  clusterId=[];
  sectionObject;
  questionObject;
  section = "CareerCluster";
  endurl;  
  currentValue;
  careerFieldName;
  reflection;
selectedList=[];
    constructor(private shared:SharedService, private serverApi:ServerApi,
    private apiJson:ApiCallClass,private apiJson1:ApiCallClass) {
    }
   
    ngOnInit(){
        this.sectionObject = this.shared.getSectionObject(this.section);
        this.questionObject = this.shared.getQuestion(this.section);
        this.endurl = sections.EndUrlArr;
        this.getCareerClusterData();
    }
  
    
 public  educationPostReq = {
          "stateAbbr": "",
          "accountID": "",
          "fieldName" : "",
          "userNotes":   ""
      };
  getCareerClusterData(){
      this.apiJson= new ApiCallClass();
        let data={
          accountID: this.shared.getAccountId(),
          stateAbbr :this.shared.getStateAbbr()
        }
        let education = [];
        this.apiJson.method="GET";
       

      let urlObj=this.shared.getUrlObject(this.section);
      this.apiJson.endUrl = urlObj.secondRef;
      this.careerFieldName = urlObj.fieldName;
      this.reflection = urlObj.endUrl;

        this.apiJson.sessionID=this.shared.getAuthKey();
        let dat=JSON.stringify(data);
        this.apiJson.data=dat;
        education[0]=this.apiJson;
        //var apiJson1:ApiCallClass;  
        let data1 = {
            stateAbbr: this.shared.getStateAbbr(),
            accountID: this.shared.getAccountId(),
            fieldName : this.careerFieldName
        };   
        this.apiJson1= new ApiCallClass();
        this.apiJson1.method="GET";
        this.apiJson1.endUrl =  this.reflection;
        this.apiJson1.sessionID =this.shared.getAuthKey();
       
        let user1=JSON.stringify(data1);
        this.apiJson1.data=user1;
        education[1]=this.apiJson1;
        this.serverApi.callApi(education).subscribe((response)=>{
                  this.careerClusterData=response[0].Result;
                  this.careerClusterCheck = response[1].Result;
                  this.selectedList = response[1].Result.UserNotes.split(' ');
                    for(var i=0;i<this.selectedList.length;i++){
                            this.clusterId.push({"ClusterID":this.selectedList[i]});
                    }
                  
                  if(this.careerClusterData.length>0){
                      this.careerClusterData.forEach((obj,key)=>{
                              this.clusterId.forEach((k,v)=>{
                            if(obj.ClusterID == k.ClusterID){
                              this.careerClusterData[key].selected = true;
                            }
                          })
                      })
                  }
        });
  }

  SaveCareerCluster(){
    var cnt=0;
       if(this.careerClusterData.length>0)
          {
          this.careerClusterData.forEach((obj,key)=>{
              if(obj.selected == true){
               // alert(obj.ClusterID);
               if(cnt == 0){
                 this.currentValue = 1+" "+obj.ClusterID;
               }
                else{
                    this.currentValue =  1+""+this.currentValue+" "+obj.ClusterID;
                }
             }
             else{
                this.currentValue = 0+""+this.currentValue;
             }
            cnt++;
          })
        }
     
      this.apiJson.method="POST";
        
      let urlObj=this.shared.getUrlObject(this.section);
      this.apiJson.endUrl = urlObj.endUrl;
      this.careerFieldName = urlObj.fieldName;

      this.apiJson.sessionID = this.shared.getAuthKey();
      
      this.educationPostReq={
          "stateAbbr": this.shared.getStateAbbr(),
          "accountID": this.shared.getAccountId(),
          "fieldName" : this.careerFieldName ,
          "userNotes": this.currentValue
      };
      //  alert("careerPostReq==>"+JSON.stringify(this.educationPostReq));
      let user=JSON.stringify(this.educationPostReq);
     // alert("user==>"+user)
      this.apiJson.data=user;
     // alert("post data----------"+JSON.stringify(this.apiJson));
      this.serverApi.callApi([this.apiJson]).subscribe((response) => {
          // alert("response->"+JSON.stringify(response));
           });
  }
}

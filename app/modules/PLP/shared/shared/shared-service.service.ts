import { Injectable } from '@angular/core';


import sections = require("../../../../shared/app.constants");

@Injectable()
export class SharedService{
    sectionsList;
    questionsList;
    endUrlObj;
    returnUrl;
    /*This constructor initializes values*/ 
    constructor(){
        this.sectionsList=sections.sectionsArr;
        this.questionsList=sections.questionsArr;
        this.endUrlObj=sections.EndUrlArr;
        this.returnUrl = sections.returnUrl;
    }

    /*This function returns the list of all section objects 
     */
    getServiceList(){
      return this.sectionsList;
    }

    /*This function returns the list of specific section objects 
     */
    getSectionObject(section){
      let sectionObject;
         if(this.sectionsList.length>0){

              this.sectionsList.forEach((obj,key)=>{
                    
                    if(obj.section+""== section+""){
                      
                        obj.totalCount=this.sectionsList.length;
                        obj.currentCount=key+1;

                        if(key != 0)
                          obj.previousSec=this.sectionsList[key-1].routerLink;

                        if(key != this.sectionsList.length-1)
                          obj.nextSec=this.sectionsList[key+1].routerLink;

                        sectionObject=obj;
                    }
              })
          
        }

        return sectionObject;
    }

     /*This function returns the list of specific section objects 
     */
    getQuestion(section){
          let questionObject;
          //alert("getQuestion questions list:"+JSON.stringify(this.questionsList));
            if(this.questionsList.length>0)
            {
                this.questionsList.forEach((obj,key)=>{
                  if(obj.section+""== section+"")
                  {
                    questionObject=obj;
                  }
                })
            
            }

            return questionObject;
    }

    // This function returns entire endUrlObj based on section name.
    getUrlObject(section){
      let urlObj;
        if(this.endUrlObj.length>0)
          {
          this.endUrlObj.forEach((obj,key)=>{
              
             if(obj.section+"" == section+""){
              urlObj = obj;
             }
         
          })
        }
          return urlObj;
    }

    getDefaultStateAbbr(){
      return "IC";//window.localStorage.getItem("stateAbbr");
    }
    getStateAbbr(){
      return "IC";//window.localStorage.getItem("stateAbbr");
    }
    getAccountId(){
      return "7662"; //window.localStorage.getItem("accountID");
    }
    
    getAuthKey(){
      return  window.localStorage.getItem("auth_key");
    }

    getReturnUrl(){
      return this.returnUrl.url;
    }
}
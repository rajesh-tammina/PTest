import { Injectable } from '@angular/core';

import sections = require("../../../../shared/app.constants");
import messages = require("../../../../shared/messages");

@Injectable()
export class SharedService{
    sectionsList;
    questionsList;
    endUrlObj;
    returnUrl;
    noDataList;
    messages;
    successMessageList;
    /*This constructor initializes values*/ 
    constructor(){
        this.sectionsList = sections.sectionsArr;
        this.questionsList = sections.questionsArr;
        this.endUrlObj = sections.EndUrlArr;
        this.returnUrl = sections.returnUrl;
        this.noDataList = sections.tableNoData;
        this.messages = messages.messages;
        this.successMessageList = sections.successMessageArr;
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
                          obj.previousSec=this.sectionsList[key-1].section;

                        if(key != this.sectionsList.length-1)
                          obj.nextSec=this.sectionsList[key+1].section;

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
         // alert("urlObj-->"+urlObj.endUrl);
        }
          return urlObj;
    }

//This function is used to show the no data information in the tables
  getTableNoData(section){
          let noData;
            if(this.noDataList.length>0)
            {
                this.noDataList.forEach((objF,key)=>{
                   objF.section.forEach((obj,key)=>{
                     if(obj+"" == section+""){
                      noData = objF.text;
                     }
                   })
                })
            
            }

            return noData;
    }

//the below function is to display the success data success message
   getSuccessMessage(section){
   let message;
             if(this.successMessageList.length>0)
             {
                 this.successMessageList.forEach((objF,key)=>{
                     objF.section.forEach((obj,key)=>{
                       if(obj+"" == section+""){
                       message = objF;
                       }
                     })
                 })
             
             }
             return message;
   }
    getDefaultStateAbbr(){
      return "MN";//window.localStorage.getItem("stateAbbr");
    }

    getStateAbbr(){
      return "MN";//window.localStorage.getItem("stateAbbr");
    }

    getAccountId(){
      return window.localStorage.getItem("accountID");
    }
    
    getAuthKey(){
      return  window.localStorage.getItem("auth_key");
    }

    getReturnUrl(){
      return this.returnUrl.url;
    }

    getMessages(){
    //  alert("all messages:"+JSON.stringify(this.messages));
      return this.messages;
    }
       
}




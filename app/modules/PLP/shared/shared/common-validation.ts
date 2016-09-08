import {Control} from '@angular/common';
export class CustomValidations{
    static  cannotContainSpace(control:Control){
        if(control.value == "")
                return {cannotContainSpace:true};
       return null;
    }

 static mailFormat(control: Control): ValidationResult {
        var EMAIL_REGEXP =/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;

        if (control.value+"" != "null" && control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
            return { "incorrectMailFormat": true };
        }

        return null;
    }

 static containOnlyNumerals(control: Control): ValidationResult {
      var Numerals_REGEXP =  /^\d{4}$/;
    if (control.value) {
        if (!Numerals_REGEXP.test(control.value)) { 
          //  alert("true");   
                return { 
                    "onlyNumerals": true };
        }
        return null;
    }
}

    static nameValid(control: Control): ValidationResult {
    var NAME_REGEXP = /^[a-zA-Z'-\s]*$/;
    if (control.value) {
        if (!NAME_REGEXP.test(control.value)) {    
                return { 
                    'invalidChar': true };
        }
        return null;
    }
}

 static noScript(control: Control): ValidationResult {
     var No_SCRIPT = /^[a-z0-9/'.,*\s+]*$/i;
   if (control.value) {
      //alert("coming in if--->"+control.value);
       if (!No_SCRIPT.test(control.value)) {   
         //  alert("coming"); 
            return { 'invalidText': true };
       }
       return null;
   }

 }

static passwordStrength(control: Control): ValidationResult {
 var strongRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*&])(?=.{8,})");
   if (control.value) {
      //alert("coming in if--->"+control.value);
       if (!strongRegex.test(control.value)) {   
         // alert("coming"); 
            return { 'invalidPassword': true };
       }
       return null;
   }

 }
}

interface ValidationResult {
    [key: string]: boolean;
}
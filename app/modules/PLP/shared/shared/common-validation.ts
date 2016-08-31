import {Control} from '@angular/common';
export class CustomValidations{
    static  cannotContainSpace(control:Control){
        if(control.value.indexOf(' ') >= 0)
                return {cannotContainSpace:true};
       return null;
    }

 static mailFormat(control: Control): ValidationResult {
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
            return { "incorrectMailFormat": true };
        }

        return null;
    }

    static nameValid(control: Control): ValidationResult {
    var NAME_REGEXP = /^[a-zA-Z'-\s+]*$/;
    if (control.value) {
        if (!NAME_REGEXP.test(control.value)) {    
                return { 
                    'invalidChar': true };
        }
        return null;
    }
}

 static noScript(control: Control): ValidationResult {
     var No_SCRIPT = /^[a-z0-9/'.,\s+]*$/i;
   if (control.value) {
      //alert("coming in if--->"+control.value);
       if (!No_SCRIPT.test(control.value)) {   
         //  alert("coming"); 
            return { 'invalidText': true };
       }
       return null;
   }

 }
}

interface ValidationResult {
    [key: string]: boolean;
}
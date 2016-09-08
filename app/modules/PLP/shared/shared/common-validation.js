System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CustomValidations;
    return {
        setters:[],
        execute: function() {
            CustomValidations = (function () {
                function CustomValidations() {
                }
                CustomValidations.cannotContainSpace = function (control) {
                    if (control.value == "")
                        return { cannotContainSpace: true };
                    return null;
                };
                CustomValidations.mailFormat = function (control) {
                    var EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
                    if (control.value + "" != "null" && control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
                        return { "incorrectMailFormat": true };
                    }
                    return null;
                };
                CustomValidations.containOnlyNumerals = function (control) {
                    var Numerals_REGEXP = /^\d{4}$/;
                    if (control.value) {
                        if (!Numerals_REGEXP.test(control.value)) {
                            //  alert("true");   
                            return {
                                "onlyNumerals": true };
                        }
                        return null;
                    }
                };
                CustomValidations.nameValid = function (control) {
                    var NAME_REGEXP = /^[a-zA-Z'-\s]*$/;
                    if (control.value) {
                        if (!NAME_REGEXP.test(control.value)) {
                            return {
                                'invalidChar': true };
                        }
                        return null;
                    }
                };
                CustomValidations.noScript = function (control) {
                    var No_SCRIPT = /^[a-z0-9/'.,*\s+]*$/i;
                    if (control.value) {
                        //alert("coming in if--->"+control.value);
                        if (!No_SCRIPT.test(control.value)) {
                            //  alert("coming"); 
                            return { 'invalidText': true };
                        }
                        return null;
                    }
                };
                CustomValidations.passwordStrength = function (control) {
                    var strongRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*&])(?=.{8,})");
                    if (control.value) {
                        //alert("coming in if--->"+control.value);
                        if (!strongRegex.test(control.value)) {
                            // alert("coming"); 
                            return { 'invalidPassword': true };
                        }
                        return null;
                    }
                };
                return CustomValidations;
            }());
            exports_1("CustomValidations", CustomValidations);
        }
    }
});
//# sourceMappingURL=common-validation.js.map
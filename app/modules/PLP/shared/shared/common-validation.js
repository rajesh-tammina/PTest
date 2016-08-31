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
                    if (control.value.indexOf(' ') >= 0)
                        return { cannotContainSpace: true };
                    return null;
                };
                CustomValidations.mailFormat = function (control) {
                    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
                    if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
                        return { "incorrectMailFormat": true };
                    }
                    return null;
                };
                CustomValidations.nameValid = function (control) {
                    var NAME_REGEXP = /^[a-zA-Z'-\s+]*$/;
                    if (control.value) {
                        if (!NAME_REGEXP.test(control.value)) {
                            return {
                                'invalidChar': true };
                        }
                        return null;
                    }
                };
                CustomValidations.noScript = function (control) {
                    var No_SCRIPT = /^[a-z0-9/'.,\s+]*$/i;
                    if (control.value) {
                        //alert("coming in if--->"+control.value);
                        if (!No_SCRIPT.test(control.value)) {
                            //  alert("coming"); 
                            return { 'invalidText': true };
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
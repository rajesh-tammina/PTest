System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var EducationPlansModel;
    return {
        setters:[],
        execute: function() {
            EducationPlansModel = (function () {
                function EducationPlansModel() {
                    this.LastSaved = new Date;
                    this.UserNotes = "";
                    this.Today = new Date;
                }
                return EducationPlansModel;
            }());
            exports_1("EducationPlansModel", EducationPlansModel);
        }
    }
});
//# sourceMappingURL=education-plans.model.js.map
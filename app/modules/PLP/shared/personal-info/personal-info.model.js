System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var PersonalInfoModel;
    return {
        setters:[],
        execute: function() {
            PersonalInfoModel = (function () {
                function PersonalInfoModel() {
                    this.StateAbbr = "";
                    this.AccountID = "";
                    this.FirstName = "";
                    this.LastName = "";
                    this.MiddleName = "";
                    this.Email = "";
                    this.GradYear = "";
                    this.Avatar = "";
                    this.UserFullName = "";
                }
                return PersonalInfoModel;
            }());
            exports_1("PersonalInfoModel", PersonalInfoModel);
        }
    }
});
//# sourceMappingURL=personal-info.model.js.map
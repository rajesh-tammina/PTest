System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var GraduationRequirementsModel, TitlesClass, ReqItemsClass, TotalsClass;
    return {
        setters:[],
        execute: function() {
            GraduationRequirementsModel = (function () {
                function GraduationRequirementsModel() {
                    this.Titles = new TitlesClass;
                    this.Totals = new TotalsClass;
                }
                return GraduationRequirementsModel;
            }());
            exports_1("GraduationRequirementsModel", GraduationRequirementsModel);
            TitlesClass = (function () {
                function TitlesClass() {
                }
                return TitlesClass;
            }());
            ReqItemsClass = (function () {
                function ReqItemsClass() {
                }
                return ReqItemsClass;
            }());
            TotalsClass = (function () {
                function TotalsClass() {
                }
                return TotalsClass;
            }());
        }
    }
});
//# sourceMappingURL=graduation-requirements.model.js.map
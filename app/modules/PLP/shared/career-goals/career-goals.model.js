System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CareerGoals;
    return {
        setters:[],
        execute: function() {
            CareerGoals = (function () {
                function CareerGoals() {
                    this.LastSaved = new Date;
                    this.ReflectionText = "";
                    this.Today = new Date;
                }
                return CareerGoals;
            }());
            exports_1("CareerGoals", CareerGoals);
        }
    }
});
//# sourceMappingURL=career-goals.model.js.map
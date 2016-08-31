System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ReflectionModel, ReflectionPostModel;
    return {
        setters:[],
        execute: function() {
            ReflectionModel = (function () {
                function ReflectionModel() {
                    this.UpdatedTimeStamp = new Date;
                    this.UserNotes = "";
                    this.Today = new Date;
                }
                return ReflectionModel;
            }());
            exports_1("ReflectionModel", ReflectionModel);
            ReflectionPostModel = (function () {
                function ReflectionPostModel() {
                    this.UpdatedTimeStamp = new Date;
                    this.UserNotes = "";
                    this.Today = new Date;
                }
                return ReflectionPostModel;
            }());
            exports_1("ReflectionPostModel", ReflectionPostModel);
        }
    }
});
//# sourceMappingURL=reflection.model.js.map
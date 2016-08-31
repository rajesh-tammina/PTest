System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ConfigObj;
    return {
        setters:[],
        execute: function() {
            //This ConfigObj is used to maintain all the app configuration settings json
            exports_1("ConfigObj", ConfigObj = {
                "server": "http://localhost:8585"
            });
        }
    }
});
//# sourceMappingURL=app.config.js.map
System.register(['@angular/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var CustomDate;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /*
             * Raise the value exponentially
             * Takes an exponent argument that defaults to 1.
             * Usage:
             *   value | exponentialStrength:exponent
             * Example:
             *   {{ 2 |  exponentialStrength:10}}
             *   formats to: 1024
            */
            CustomDate = (function () {
                function CustomDate() {
                }
                CustomDate.prototype.transform = function (value) {
                    if (value != null && value != "") {
                        value = value.split("T")[0];
                        var date = Date.parse(value);
                        // alert("CustomDate value is:"+value+" inpdate"+date);//+"   changeDate:"+date.getMonth());
                        if (date != null) {
                            var month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1); // to ensure YYYY-MM-DD format
                            var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                            var cmpltDate = month + '/' + day + '/' + date.getFullYear();
                            // alert("cmpltDate is:"+cmpltDate);
                            return cmpltDate;
                        }
                    }
                    return "";
                };
                CustomDate = __decorate([
                    core_1.Pipe({ name: 'customDate' }), 
                    __metadata('design:paramtypes', [])
                ], CustomDate);
                return CustomDate;
            }());
            exports_1("CustomDate", CustomDate);
        }
    }
});
//# sourceMappingURL=customPipes.js.map
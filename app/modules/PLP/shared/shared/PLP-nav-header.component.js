System.register(['@angular/core', "@angular/router"], function(exports_1, context_1) {
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
    var core_1, router_1;
    var PLPNavHeaderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            PLPNavHeaderComponent = (function () {
                function PLPNavHeaderComponent() {
                    this.header = "";
                    this.report = "";
                    //alert("PLP nav header is:"+JSON.stringify(this.header));
                }
                __decorate([
                    core_1.Input('header'), 
                    __metadata('design:type', Object)
                ], PLPNavHeaderComponent.prototype, "header", void 0);
                __decorate([
                    core_1.Input('report-status'), 
                    __metadata('design:type', Object)
                ], PLPNavHeaderComponent.prototype, "report", void 0);
                PLPNavHeaderComponent = __decorate([
                    core_1.Component({
                        selector: 'PLP-nav-header',
                        templateUrl: './app/modules/PLP/shared/shared/PLP-nav-header.layout.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], PLPNavHeaderComponent);
                return PLPNavHeaderComponent;
            }());
            exports_1("PLPNavHeaderComponent", PLPNavHeaderComponent);
        }
    }
});
//# sourceMappingURL=PLP-nav-header.component.js.map
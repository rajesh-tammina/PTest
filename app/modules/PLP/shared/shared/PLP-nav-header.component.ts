import { Component,Input,Output } from '@angular/core';

import { ROUTER_DIRECTIVES, Router } from "@angular/router";

@Component({
  selector: 'PLP-nav-header',
  templateUrl: './app/modules/PLP/shared/shared/PLP-nav-header.layout.html',
  directives:[ ROUTER_DIRECTIVES ]
})
export class PLPNavHeaderComponent {
  @Input('header') header="";
 @Input('report-status') report="";
  constructor(){
    //alert("PLP nav header is:"+JSON.stringify(this.header));
  }
}

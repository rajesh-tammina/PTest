import { Component,Input,Output,EventEmitter } from '@angular/core';

import { ROUTER_DIRECTIVES, Router } from "@angular/router";

@Component({
  selector: 'PLP-nav-header',
  templateUrl: './app/modules/PLP/shared/shared/PLP-nav-header.layout.html',
  directives:[ ROUTER_DIRECTIVES ]
})
export class PLPNavHeaderComponent {
  @Input('header') header="";
  @Input('report-status') report="";
  @Output() changeView = new EventEmitter();
  constructor(){
    //alert("PLP nav header is:"+JSON.stringify(this.header));
  }

  loadPrevious(){
    this.changeView.emit(this.header.previousSec);
  }

  loadNext(){
    this.changeView.emit(this.header.nextSec);
  }
}

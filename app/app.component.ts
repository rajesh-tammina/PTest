import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from "@angular/router";


@Component({
  selector: 'PLP-app',
  template: '<router-outlet></router-outlet>',
   directives: [ROUTER_DIRECTIVES]
   
})
export class AppComponent {
    
   constructor(private router: Router) {
    
   }
 
}

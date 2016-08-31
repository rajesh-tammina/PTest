import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from "@angular/router";
import { LoginComponent } from './modules/login/login.component';
import { LoginFormComponent } from './modules/login/login-form/login-form.component';

@Component({
  selector: 'my-app',
  template: '<router-outlet></router-outlet>',
   directives: [ ROUTER_DIRECTIVES],
   precompile: [ LoginComponent,LoginFormComponent ]
})
export class AppComponent {
    
   constructor(private router: Router) {
    
   }
 
}

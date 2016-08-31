import { Component , OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from "@angular/router";

import { SharedService } from "../shared/shared/shared-service.service";

@Component({
  selector: 'plp-set',
  templateUrl: './app/modules/PLP/PLP-sections/PLP-sections.layout.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [ SharedService ]
})
export class PlpComponent implements OnInit{
  sectionsList;
  menuState=false;
   constructor(private router: Router,private section: SharedService) {
     
   }

   ngOnInit(){
          this.sectionsList=this.section.getServiceList();
   }
 
  menuToggle() {  
        this.menuState = !this.menuState;
      }
  menuClose() {  
    
        this.menuState = false;
      }
  logOut(){
    window.localStorage.removeItem("auth_key");
      this.router.navigate(['login']);
      }
}


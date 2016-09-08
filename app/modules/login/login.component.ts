import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

import { ServerApi } from '../../shared/app.apicall.service';
import { ApiCallClass } from '../../shared/apicall.model';


@Component({
    selector : 'login-element',
    templateUrl : './app/modules/login/login.layout.html',
    styleUrls : ['./app/modules/login/login.style.css'],
    directives : [ ROUTER_DIRECTIVES ],
    providers : [ ServerApi,ApiCallClass ]
})
export class LoginComponent implements OnInit {
 
    data:ApiCallClass;
    constructor(private router: Router, private loginauth: ServerApi,private apiJson:ApiCallClass) { }

    ngOnInit() {
        }

    
}

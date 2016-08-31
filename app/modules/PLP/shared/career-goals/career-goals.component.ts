import {Component,OnInit,Input } from '@angular/core';

import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { ReflectionComponent } from '../shared/reflection.component';
import {ServerApi} from '../../../../shared/app.apicall.service';
import { ApiCallClass } from '../../../../shared/apicall.model';
import {CareerGoals} from '../career-goals/career-goals.model';
import {ControlGroup,Control,Validators,FormBuilder,CORE_DIRECTIVES,FORM_DIRECTIVES} from '@angular/common';
import { Http, Response } from '@angular/http';
import { SharedService } from '../shared/shared-service.service';


@Component({
  selector: 'career-goals',
  templateUrl: './app/modules/PLP/shared/career-goals/career-goals.layout.html',
  directives:[PLPNavHeaderComponent,ReflectionComponent,FORM_DIRECTIVES],
  providers:[ServerApi,ApiCallClass,CareerGoals,SharedService]
})

export class CareerGoalsComponent implements OnInit{
    @Input('report-status') report="";
    sectionObject;
    questionObject;
   section = "CareerGoals";  
   field="CareerGoals";
   constructor(private apiService: ServerApi,private apiJson:ApiCallClass,
   private shared:SharedService,private careerGoals:CareerGoals,private http: Http,fb:FormBuilder){
 
   }
    ngOnInit(){
        
        this.sectionObject = this.shared.getSectionObject(this.section);
        this.questionObject = this.shared.getQuestion(this.section);
    }
 
     
}

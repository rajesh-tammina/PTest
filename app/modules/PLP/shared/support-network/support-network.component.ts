import { Component,Input, Output, EventEmitter } from '@angular/core';

import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { ReflectionComponent } from '../shared/reflection.component';
import { SupportNetworkModel } from './support-network.model';
import { SharedService } from '../shared/shared-service.service';
import {ServerApi} from '../../../../shared/app.apicall.service';
import { ApiCallClass } from '../../../../shared/apicall.model';

import {ControlGroup,Control,Validators,FormBuilder,CORE_DIRECTIVES,FORM_DIRECTIVES} from '@angular/common';

@Component({
  selector: 'support-network',
  templateUrl: './app/modules/PLP/shared/support-network/support-network.layout.html',
  directives:[PLPNavHeaderComponent,ReflectionComponent,FORM_DIRECTIVES],
 providers:[ServerApi,ApiCallClass,SharedService]
})
export class SupportNetworkComponent {
    @Input('report-status') report="";
    @Output('changeView') changeInrView= new EventEmitter();
    @Output() containResult= new EventEmitter();
    
    supportNetworkData:SupportNetworkModel[];

    sectionObject;
    questionObject;
    section = "SupportNetwork";  
    field="CareerGoals";
    
 constructor(private apiService: ServerApi,private apiJson:ApiCallClass,
   private shared:SharedService,fb:FormBuilder){
 
   }
   

    ngOnInit(){
        this.sectionObject = this.shared.getSectionObject(this.section);
        this.questionObject = this.shared.getQuestion(this.section);
    }

    changeView(evnt){
      this.changeInrView.emit(evnt);
    }

    changeFilledStatus(evnt){
      this.containResult.emit(evnt);
    }
}

import { Component,Input } from '@angular/core';

import { ExperientialLearningModel } from './experiential-learning.model';
import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { ReflectionComponent } from '../shared/reflection.component';
import { SharedService } from '../shared/shared-service.service';

@Component({
  selector: 'experiential-learning',
  templateUrl: './app/modules/PLP/shared/experiential-learning/experiential-learning.layout.html',
  directives:[PLPNavHeaderComponent,ReflectionComponent],
  providers : [ SharedService ]
})
export class ExperientialLearningComponent {

   @Input('report-status') report="";
   experientialLearningData:ExperientialLearningModel[];

   sectionObject;
   questionObject;
   section = "ExperientialLearning";  
   field="TBD"; 

    constructor(private shared:SharedService) {
    }

    ngOnInit(){
        this.sectionObject = this.shared.getSectionObject(this.section);
        this.questionObject = this.shared.getQuestion(this.section);
         
    }
  
  getExperientialLearningData(){
      
  }
}

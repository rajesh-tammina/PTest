import { Component,Input } from '@angular/core';

import { ExperLearningTypesModel } from './experiential-learning-types.model';
import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { SharedService } from '../shared/shared-service.service';

@Component({
  selector: 'experiential-learning-types',
  templateUrl: './app/modules/PLP/shared/experiential-learning-types/experiential-learning-types.layout.html',
  directives:[PLPNavHeaderComponent],
  providers : [ SharedService ]
})
export class ExperLearningTypesComponent {
    @Input('report-status') report="";
    experLearningTypesData:ExperLearningTypesModel[];

      sectionObject;
   section = "ExperientialLearningTypes";  

    constructor(private shared:SharedService) {
    }

    ngOnInit(){
        this.sectionObject = this.shared.getSectionObject(this.section);
         this.getExperLearningTypesData();
    }
  
  getExperLearningTypesData(){
    
  }
}

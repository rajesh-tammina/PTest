import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlGroup, Control, Validators, FormBuilder, CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';

import { ActionPlanModel } from './action-plan.model';
import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { ReflectionComponent } from '../shared/reflection.component';
import { SharedService } from '../shared/shared-service.service';
import { ServerApi } from '../../../../shared/app.apicall.service';
import { ApiCallClass } from '../../../../shared/apicall.model';

@Component({
  selector: 'action-plan',
  templateUrl: './app/modules/PLP/shared/action-plan-for-year/action-plan.layout.html',
  directives: [PLPNavHeaderComponent, ReflectionComponent, FORM_DIRECTIVES],
  providers: [ServerApi, ApiCallClass, SharedService]
})

export class ActionPlanComponent {
  @Input('report-status') report = "";
  @Output('changeView') changeInrView = new EventEmitter();
  @Output() containResult = new EventEmitter();

  actionPlanData: ActionPlanModel[];
  sectionObject;
  questionObject;
  section = "ActionPlan";
  field = "ActionPlan";

  constructor(private apiService: ServerApi,
    private apiJson: ApiCallClass,
    private shared: SharedService,
    fb: FormBuilder) {

  }

  ngOnInit() {
    this.sectionObject = this.shared.getSectionObject(this.section);
    this.questionObject = this.shared.getQuestion(this.section);
  }
  changeView(evnt) {
    this.changeInrView.emit(evnt);
  }

  changeFilledStatus(evnt) {
    this.containResult.emit(evnt);
  }

}

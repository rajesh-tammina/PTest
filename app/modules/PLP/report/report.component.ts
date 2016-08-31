import { Component } from '@angular/core';

import { ReportModel } from './report.model';
import { PersonalInfoComponent } from "../shared/personal-info/personal-info.component";
import { EducationPlansComponent } from "../shared/education-plans/education-plans.component";
import { CareerGoalsComponent } from "../shared/career-goals/career-goals.component";
import { ActionPlanComponent } from "../shared/action-plan-for-year/action-plan.component";
import { CareerAssessmentsComponent } from "../shared/career-assessments/career-assessments.component";
import { CareerClusterComponent } from "../shared/career-cluster/career-cluster.component";
import { CommentsAndSignatureComponent } from "../shared/comments-and-signature/comments-and-signature.component";
import { CoursePlanComponent } from "../shared/course-plan/course-plan.component";
import { EmploymentHistoryComponent } from "../shared/employment-history/employment-history.component";
import { ExperientialLearningComponent } from "../shared/experiential-learning/experiential-learning.component";
import { ExperLearningTypesComponent } from "../shared/experiential-learning-types/experiential-learning-types.component";
import { ExtraActivitiesComponent } from "../shared/extra-activities/extra-activities.component";
import { GraduationRequirementsComponent } from "../shared/graduation-requirements/graduation-requirements.component";
import { OccAndClusterComponent } from "../shared/occ-and-cluster/occ-and-cluster.component";
import { SchoolsOfInterestComponent } from "../shared/schools-of-interest/schools-of-interest.component";
import { StudyOfInterestComponent } from "../shared/study-of-interest/study-of-interest.component";
import { SupportNetworkComponent } from "../shared/support-network/support-network.component";
import { TestScoresComponent } from "../shared/test-scores/test-scores.component";
import { VolunteerCommunityServiceComponent } from "../shared/volunteer-community-service/volunteer-community-service.component";
declare var $:any;

@Component({
  selector: 'report-view',
  templateUrl: './app/modules/PLP/report/report.layout.html',
  
  directives: [ PersonalInfoComponent, 
                EducationPlansComponent, 
                CareerGoalsComponent, 
                ActionPlanComponent, 
                CareerAssessmentsComponent,
                CareerClusterComponent,
                CommentsAndSignatureComponent,
                CoursePlanComponent,
                EmploymentHistoryComponent,
                ExperientialLearningComponent,
                ExperLearningTypesComponent,
                ExtraActivitiesComponent,
                GraduationRequirementsComponent,
                OccAndClusterComponent,
                SchoolsOfInterestComponent,
                StudyOfInterestComponent,
                SupportNetworkComponent,
                TestScoresComponent,
                VolunteerCommunityServiceComponent ],
   styles: [ `
              button, .previous, .next{
                display:none !important;
                background:blue;
              }
             
            `]
})
export class ReportComponent {
  
  reportData:ReportModel[];

  ngOnInit() {
    $(".bs-example input").attr('disabled','disabled');
  }

  
  getReportData(){

  }
}

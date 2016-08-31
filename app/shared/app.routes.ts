import { provideRouter, RouterConfig } from '@angular/router';

import { AuthManager } from './authmanager';

import { ReportComponent } from '../modules/PLP/report/report.component';
import { PlpComponent } from "../modules/PLP/PLP-sections/PLP-sections.component";
import { LoginComponent } from "../modules/login/login.component";
import { LoginFormComponent } from "../modules/login/login-form/login-form.component";
import { NewPasswordComponent } from "../modules/login/new-psw/new-psw.component";

import { PersonalInfoComponent } from "../modules/PLP/shared/personal-info/personal-info.component";
import { EducationPlansComponent } from "../modules/PLP/shared/education-plans/education-plans.component";
import { CareerGoalsComponent } from "../modules/PLP/shared/career-goals/career-goals.component";
import { ActionPlanComponent } from "../modules/PLP/shared/action-plan-for-year/action-plan.component";
import { CareerAssessmentsComponent } from "../modules/PLP/shared/career-assessments/career-assessments.component";
import { CareerClusterComponent } from "../modules/PLP/shared/career-cluster/career-cluster.component";
import { CommentsAndSignatureComponent } from "../modules/PLP/shared/comments-and-signature/comments-and-signature.component";
import { CoursePlanComponent } from "../modules/PLP/shared/course-plan/course-plan.component";
import { EmploymentHistoryComponent } from "../modules/PLP/shared/employment-history/employment-history.component";
import { ExperientialLearningComponent } from "../modules/PLP/shared/experiential-learning/experiential-learning.component";
import { ExperLearningTypesComponent } from "../modules/PLP/shared/experiential-learning-types/experiential-learning-types.component";
import { ExtraActivitiesComponent } from "../modules/PLP/shared/extra-activities/extra-activities.component";
import { GraduationRequirementsComponent } from "../modules/PLP/shared/graduation-requirements/graduation-requirements.component";
import { OccAndClusterComponent } from "../modules/PLP/shared/occ-and-cluster/occ-and-cluster.component";
import { SchoolsOfInterestComponent } from "../modules/PLP/shared/schools-of-interest/schools-of-interest.component";
import { StudyOfInterestComponent } from "../modules/PLP/shared/study-of-interest/study-of-interest.component";
import { SupportNetworkComponent } from "../modules/PLP/shared/support-network/support-network.component";
import { TestScoresComponent } from "../modules/PLP/shared/test-scores/test-scores.component";
import { VolunteerCommunityServiceComponent } from "../modules/PLP/shared/volunteer-community-service/volunteer-community-service.component";
import { UsernameRecoveryComponent } from '../modules/login/recovery-user/forgot-username.component';
import { PasswordRecoveryComponent } from '../modules/login/recovery-psw/forgot-psw.component';
import { ChangePasswordComponent } from '../modules/login/change-password/change-password-component';

const routes: RouterConfig = [ 

  { path: '', component: LoginComponent,children:[
                { path: '', component: LoginFormComponent }] }, 
                
  { path: 'newPassword/:uname/:stateAbbr/:token', component: NewPasswordComponent},
  { path: 'plpcontent', 
    component:  PlpComponent,
    children:[
                  { path: '', component: PersonalInfoComponent ,canActivate:[AuthManager]},
                   
                  { path: 'report', component: ReportComponent ,canActivate:[AuthManager]},

                  { path: 'personalInfo', component:  PersonalInfoComponent,canActivate:[AuthManager]},
                  { path: 'careerGoals', component: CareerGoalsComponent ,canActivate:[AuthManager]},
                  { path: 'educationPlans', component: EducationPlansComponent ,canActivate:[AuthManager]},
                  { path: 'careerAssessments', component: CareerAssessmentsComponent ,canActivate:[AuthManager]},
                  { path: 'careerCluster', component: CareerClusterComponent ,canActivate:[AuthManager]},
                  { path: 'occAndCluster', component: OccAndClusterComponent ,canActivate:[AuthManager]},
                  { path: 'coursePlan', component: CoursePlanComponent ,canActivate:[AuthManager]},
                  { path: 'graduationRequirements', component:  GraduationRequirementsComponent,canActivate:[AuthManager]},
                  { path: 'testScores', component: TestScoresComponent ,canActivate:[AuthManager]},
                  { path: 'studyOfInterest', component:  StudyOfInterestComponent,canActivate:[AuthManager]},
                  { path: 'schoolsOfInterest', component: SchoolsOfInterestComponent ,canActivate:[AuthManager]},
                  { path: 'volunteerCommunityService', component: VolunteerCommunityServiceComponent ,canActivate:[AuthManager]},
                  { path: 'extraActivities', component: ExtraActivitiesComponent ,canActivate:[AuthManager]},
                  { path: 'employmentHistory', component: EmploymentHistoryComponent ,canActivate:[AuthManager]},
                  { path: 'actionPlan', component:  ActionPlanComponent,canActivate:[AuthManager]},
                  { path: 'supportNetwork', component: SupportNetworkComponent ,canActivate:[AuthManager]},
                  { path: 'experientialLearning', component:  ExperientialLearningComponent,canActivate:[AuthManager]},
                  { path: 'experLearningTypes', component: ExperLearningTypesComponent ,canActivate:[AuthManager]},
                  { path: 'commentsAndSignature', component:  CommentsAndSignatureComponent,canActivate:[AuthManager]},
                  { path: 'ChangePassword', component: ChangePasswordComponent,canActivate:[AuthManager] }
                  
                  ],
    canActivate:[AuthManager]},
  { path: 'login', component: LoginComponent,
     children:[
                { path: '', component: LoginFormComponent },
                { path: 'loginForm', component: LoginFormComponent },
                { path: 'usernameRecovery', component: UsernameRecoveryComponent },
                { path: 'passwordRecovery', component: PasswordRecoveryComponent }
              ] 
  },
 
  
  // { path: 'passwordRecovery', component: PasswordRecoveryComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];
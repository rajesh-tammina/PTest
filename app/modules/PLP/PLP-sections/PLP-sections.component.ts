import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from "@angular/router";

import { SharedService } from "../shared/shared/shared-service.service";
import { ReportComponent } from '../report/report.component';
import { Utilities } from '../../../shared/utilities.class';
import { ServerApi } from '../../../shared/app.apicall.service';

import {Directive, EventEmitter, HostListener} from '@angular/core';
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
import { ExtraActivitiesComponent } from "../shared/extra-activities/extra-activities.component";
import { GraduationRequirementsComponent } from "../shared/graduation-requirements/graduation-requirements.component";
import { OccAndClusterComponent } from "../shared/occ-and-cluster/occ-and-cluster.component";
import { SchoolsOfInterestComponent } from "../shared/schools-of-interest/schools-of-interest.component";
import { StudyOfInterestComponent } from "../shared/study-of-interest/study-of-interest.component";
import { SupportNetworkComponent } from "../shared/support-network/support-network.component";
import { TestScoresComponent } from "../shared/test-scores/test-scores.component";
import { VolunteerCommunityServiceComponent } from "../shared/volunteer-community-service/volunteer-community-service.component";


@Component({
  selector: 'plp-set',
  templateUrl: './app/modules/PLP/PLP-sections/PLP-sections.layout.html',
  directives: [ROUTER_DIRECTIVES,
    ReportComponent,
    PersonalInfoComponent,
    EducationPlansComponent,
    CareerGoalsComponent,
    ActionPlanComponent,
    CareerAssessmentsComponent,
    CareerClusterComponent,
    CommentsAndSignatureComponent,
    CoursePlanComponent,
    EmploymentHistoryComponent,
    ExperientialLearningComponent,
    ExtraActivitiesComponent,
    GraduationRequirementsComponent,
    OccAndClusterComponent,
    SchoolsOfInterestComponent,
    StudyOfInterestComponent,
    SupportNetworkComponent,
    TestScoresComponent,
    VolunteerCommunityServiceComponent],
  providers: [SharedService,Utilities,ServerApi]
})
export class PlpComponent implements OnInit {
  sectionsList;
  menuState = false;
  viewMode;
  report;
  username;
  compleSectionsList=[];
  mouseup = new EventEmitter();
  mousedown = new EventEmitter();
  mousemove = new EventEmitter();
  constructor(private router: Router,private utils:Utilities, private section: SharedService, private apicall:ServerApi) {
    this.viewMode = 'PersonalInfo';
  }
  resultsArr = ["PersonalInfo"];

  setTitle($event) {

  }
  ngOnInit() {
    this.utils.showLoading();
    this.sectionsList = this.section.getServiceList();
  }

  menuToggle() {
    this.menuState = !this.menuState;
  }
  menuClose() {
    this.menuState = false;
  }

  navView(evnt) {
    this.viewMode = evnt;
  }

  userDataChanged(evnt) {
    this.username = evnt.username;
  }

  changeFilledStatus(section) {
    if(section.result=="filled" && this.resultsArr.indexOf(section.section)==-1){
          this.resultsArr.push(section.section);
     }

     if(this.compleSectionsList.indexOf(section.section)==-1){
          this.compleSectionsList.push(section.section);
     }
     if(this.sectionsList.length==this.compleSectionsList.length){
        setTimeout(function () {
                             window.localStorage.setItem("loadedDone","1");
                        },2000);
          this.utils.hideLoading();
     }

  }

  logOut() {
    window.localStorage.removeItem("auth_key");
    this.apicall.sessionExpiry();
    this.router.navigate(['login']);
  }

  @HostListener('mousedown', ['$event'])
  onmousedown(event) {
    var currentDate = new Date();
    var currentSeconds = currentDate.getTime();
    window.localStorage.setItem('currentSec', currentSeconds + "");
   //console.log(window.localStorage.getItem('currentSec'));
  }

  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: any) {
    this.onmousedown(event);
  }
}


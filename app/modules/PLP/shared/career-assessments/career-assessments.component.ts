import { Component, Input, Output, EventEmitter } from '@angular/core';


import { ApiCallClass } from '../../../../shared/apicall.model';
import { CareerAssessmentsModel } from './career-assessments.model';
import { CustomDate } from '../../../../shared/customPipes';
import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { SharedService } from '../shared/shared-service.service';
import { ServerApi } from '../../../../shared/app.apicall.service';
import sections = require("../../../../shared/app.constants");
import { Utilities } from '../../../../shared/utilities.class';

@Component({
  selector: 'career-assessments',
  templateUrl: './app/modules/PLP/shared/career-assessments/career-assessments.layout.html',
  directives: [PLPNavHeaderComponent],
  providers: [SharedService, ServerApi, ApiCallClass, Utilities],
  pipes: [CustomDate]
})
export class CareerAssessmentsComponent {
  careerAssessmentsData: CareerAssessmentsModel[];
  @Input('report-status') report = "";
  @Output('changeView') changeInrView = new EventEmitter();
  @Output() containResult = new EventEmitter();

  sectionObject;
  section = "CareerAssessments";
  endurl;
  tableNoData;
  constructor(private shared: SharedService, private serverApi: ServerApi,
    private apiJson: ApiCallClass, private utils: Utilities) {

  }

  ngOnInit() {
    this.sectionObject = this.shared.getSectionObject(this.section);
    this.endurl = sections.EndUrlArr;
    this.getCareerAssessmentsData();
  }

  getCareerAssessmentsData() {
    let data = {
      stateAbbr: this.shared.getStateAbbr(),
      accountID: this.shared.getAccountId()
    }
    this.apiJson.method = "GET";
    let urlObj = this.shared.getUrlObject(this.section);
    this.apiJson.endUrl = urlObj.endUrl;
    let nodata = this.shared.getTableNoData(this.section);
    this.tableNoData = nodata;

    this.apiJson.sessionID = this.shared.getAuthKey();
    let dat = JSON.stringify(data);

    this.apiJson.data = dat;
    this.serverApi.callApi([this.apiJson]).subscribe((response) => {

      this.careerAssessmentsData = response[0].Result;
      if (response[0].Result != null) {
        this.containResult.emit({ "section": this.section, result: "filled" });
      }
      else {
        this.containResult.emit({ "section": this.section, result: "empty" });
      }

    }, this.utils.handleError);
  }

  postCareerAssessmentsData() {

  }

  changeView(evnt) {
    this.changeInrView.emit(evnt);
  }
  changeFilledStatus(evnt) {
    this.containResult.emit(evnt);
  }

}

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ApiCallClass } from '../../../../shared/apicall.model';
import { Utilities } from '../../../../shared/utilities.class';
import { EmploymentHistoryModel } from './employment-history.model';
import { PLPNavHeaderComponent } from '../shared/PLP-nav-header.component';
import { SharedService } from '../shared/shared-service.service';
import { ServerApi } from '../../../../shared/app.apicall.service';
import sections = require("../../../../shared/app.constants");
@Component({
  selector: 'employment-history',
  templateUrl: './app/modules/PLP/shared/employment-history/employment-history.layout.html',
  directives: [PLPNavHeaderComponent],
  providers: [SharedService, ServerApi, ApiCallClass, Utilities]
})
export class EmploymentHistoryComponent {
  @Input('report-status') report = "";
  @Output('changeView') changeInrView = new EventEmitter();
  @Output() containResult = new EventEmitter();
  employmentHistoryData: EmploymentHistoryModel[];
  endurl;
  sectionObject;
  section = "EmploymentHistory";
  tableNoData;
  constructor(private shared: SharedService, private utils: Utilities, private serverApi: ServerApi, private apiJson: ApiCallClass) {
  }

  ngOnInit() {
    this.sectionObject = this.shared.getSectionObject(this.section);
    this.getEmploymentHistoryData();
  }

  getEmploymentHistoryData() {
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

      this.employmentHistoryData = response[0].Result;
      if (response[0].Result != null) {
        this.containResult.emit({ "section": this.section, result: "filled" });
      }
      else {
        this.containResult.emit({ "section": this.section, result: "empty" });
      }
    }, this.utils.handleError);
  }

  changeView(evnt) {
    this.changeInrView.emit(evnt);
  }
}

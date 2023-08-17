
import { Component } from '@angular/core';
import { NameSpaceVm, ViewModel } from './viewmodel';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportClients } from '../api/reports/ReportClientFactory';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AddOrUpdateSuiteRequest, AddTestCaseToSuiteRequest, DeleteTestCaseFromSuiteRequest, IReportClient, Outcome, SetDescriptionRequest, SetOutcomeRequest, SetTestCaseConfigRequest, SetTestSuiteConfigRequest, SetTesterRequest } from '../api/reports/swagger';
import { CookieService } from 'ngx-cookie';
import { RequestManager } from '../api/reports/RequestManager';
import { DocumentStyleFixer } from '../ext/documentFixer';
import { ViewModelTemplate } from './templates/ViewModelTemplate';
import { MenuItem } from 'primeng/api';
import { List } from 'linqts';
import { UrlParser } from '../toolbar/urlparsel';

@Component({
  selector: '', 
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

 
export class MainComponent {
  treeItemMenu: MenuItem[];
  api: IReportClient;
  data: ViewModel;  
  requests: RequestManager;

  constructor(http: HttpClient
    , private location: Location
    , private route: ActivatedRoute
    , private cookieService: CookieService
    , private router: Router) {
    this.data = new ViewModel();
    this.api = ReportClients.ReportClientFactory.Create(http, cookieService);
    this.data.api = this.api;
    this.requests = new RequestManager();
  }

  urlSuiteId: number;
  urlTab: string; 
  ApplyUrlParams() {
    console.info(this.route.snapshot.queryParams);
    console.info("tab " + this.urlTab);
  }

  ngOnInit(): void {
    new DocumentStyleFixer(document);
    if (environment.design) {
      this.data = ViewModelTemplate.Create();
    }
    else {
      this.InitAfterAccess();
    }

    this.treeItemMenu = [
      { label: 'Add', icon: 'bi bi-pencil', command: () => {  } },
      { label: 'Remove', icon: 'bi bi-x-lg', command: () => {  } }
    ];
  }

  async InitAfterAccess() 
  {

  }
} 
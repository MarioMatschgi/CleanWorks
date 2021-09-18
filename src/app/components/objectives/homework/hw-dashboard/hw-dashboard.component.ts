import { Component, Input, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';
import { LocalizationService } from 'src/libraries/util/services/localization.service';

@Component({
  selector: 'hw-dashboard',
  templateUrl: './hw-dashboard.component.html',
  styleUrls: ['./hw-dashboard.component.scss'],
})
export class HwDashboardComponent implements OnInit {
  @Input() dashboard: boolean;

  constructor(
    public gv: GlobalVariablesService,
    public lang: LocalizationService,
    public userData: UserDataService
  ) {}

  ngOnInit(): void {}
}

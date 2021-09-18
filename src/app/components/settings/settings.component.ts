import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';
import { LocalizationService } from 'src/libraries/util/services/localization.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(
    public gv: GlobalVariablesService,
    public lang: LocalizationService
  ) {}

  ngOnInit(): void {}
}

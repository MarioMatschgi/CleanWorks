import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';
import { LocalizationService } from 'src/libraries/util/services/localization.service';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(
    public lang: LocalizationService,
    public gv: GlobalVariablesService
  ) {}

  ngOnInit(): void {}
}

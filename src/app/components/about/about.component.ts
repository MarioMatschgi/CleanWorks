import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';
import { LocalizationService } from 'src/libraries/util/services/localization.service';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor(
    public gv: GlobalVariablesService,
    public lang: LocalizationService
  ) {}

  ngOnInit(): void {}
}

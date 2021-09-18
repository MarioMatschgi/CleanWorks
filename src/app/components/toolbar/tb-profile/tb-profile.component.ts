import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/libraries/authentication/services/auth.service';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';
import { LocalizationService } from 'src/libraries/util/services/localization.service';

@Component({
  selector: 'tb-profile',
  templateUrl: './tb-profile.component.html',
  styleUrls: ['./tb-profile.component.scss'],
})
export class TbProfileComponent implements OnInit {
  constructor(
    public gv: GlobalVariablesService,
    public lang: LocalizationService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {}
}

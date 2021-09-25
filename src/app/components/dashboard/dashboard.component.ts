import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { AuthService } from 'src/libraries/authentication/services/auth.service';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';
import { LocalizationService } from 'src/libraries/util/services/localization.service';
import { GrDetailDialogComponent } from '../objectives/groups/gr-detail-dialog/gr-detail-dialog.component';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    public gv: GlobalVariablesService,
    public lang: LocalizationService,
    public auth: AuthService,
    public userData: UserDataService,
    private dialog: DialogService
  ) {}

  ngOnInit(): void {}

  editGroup() {
    this.dialog.open(GrDetailDialogComponent, {
      data: { group: this.userData.group },
    });
  }
}

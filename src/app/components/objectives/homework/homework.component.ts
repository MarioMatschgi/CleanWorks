import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';
import { LocalizationService } from 'src/libraries/util/services/localization.service';
import { HwNewDialogComponent } from './hw-new-dialog/hw-new-dialog.component';

@Component({
  selector: 'homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.scss'],
})
export class HomeworkComponent implements OnInit {
  constructor(
    public gv: GlobalVariablesService,
    public lang: LocalizationService,
    public userData: UserDataService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {}

  newHomework() {
    this.dialogService.dialog.open(HwNewDialogComponent);
  }
}

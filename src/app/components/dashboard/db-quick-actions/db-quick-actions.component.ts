import { DialogService } from './../../../services/dialog.service';
import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';
import { HwNewDialogComponent } from '../../objectives/homework/hw-new-dialog/hw-new-dialog.component';
import { ScNewDialogComponent } from '../../objectives/grades/sc-new-dialog/sc-new-dialog.component';
import { LocalizationService } from 'src/libraries/util/services/localization.service';

@Component({
  selector: 'db-quick-actions',
  templateUrl: './db-quick-actions.component.html',
  styleUrls: ['./db-quick-actions.component.scss'],
})
export class DbQuickActionsComponent implements OnInit {
  constructor(
    public gv: GlobalVariablesService,
    public lang: LocalizationService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {}

  newHomework() {
    this.dialogService.open(HwNewDialogComponent);
  }

  newGrade() {
    this.dialogService.open(ScNewDialogComponent);
  }
}

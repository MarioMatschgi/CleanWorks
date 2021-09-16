import { DialogService } from './../../../services/dialog.service';
import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';
import { HwNewDialogComponent } from '../../objectives/homework/hw-new-dialog/hw-new-dialog.component';
import { ScNewDialogComponent } from '../../objectives/grades/sc-new-dialog/sc-new-dialog.component';

@Component({
  selector: 'db-quick-actions',
  templateUrl: './db-quick-actions.component.html',
  styleUrls: ['./db-quick-actions.component.scss'],
})
export class DbQuickActionsComponent implements OnInit {
  constructor(
    public gv: GlobalVariablesService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {}

  newHomework() {
    this.dialogService.dialog.open(HwNewDialogComponent);
  }

  newGrade() {
    this.dialogService.dialog.open(ScNewDialogComponent);
  }
}

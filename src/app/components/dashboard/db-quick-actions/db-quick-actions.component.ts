import { DialogService } from './../../../services/dialog.service';
import { Component, OnInit } from '@angular/core';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';
import { HwNewDialogComponent } from '../../objectives/homework/hw-new-dialog/hw-new-dialog.component';
import { SjNewDialogComponent } from '../../objectives/subject/sj-new-dialog/sj-new-dialog.component';

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

  openHomework() {
    this.dialogService.dialog.open(HwNewDialogComponent, {
      width: '50em',
      height: '50em',
    });
  }

  openSubject() {
    this.dialogService.dialog.open(SjNewDialogComponent, {
      width: '50em',
      height: '50em',
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  SnackbarService,
  MessageType,
} from 'src/app/services/snackbar.service';
import { LocalizationService } from 'src/libraries/util/services/localization.service';
import { ScNewDialogComponent } from '../../grades/sc-new-dialog/sc-new-dialog.component';
import { ApNewComponent } from '../ap-new/ap-new.component';

@Component({
  selector: 'ap-new-dialog',
  templateUrl: './ap-new-dialog.component.html',
  styleUrls: ['./ap-new-dialog.component.scss'],
})
export class ApNewDialogComponent implements OnInit {
  @ViewChild('apNew') apNew: ApNewComponent;

  constructor(
    public lang: LocalizationService,
    public dialogRef: MatDialogRef<ScNewDialogComponent>,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {}

  async submit() {
    if (await this.apNew.addNew()) {
      this.dialogRef.close();
      this.snackbar.displayTop(
        this.lang.data.ap.snackbar.new,
        MessageType.Info
      );
    }
  }
}

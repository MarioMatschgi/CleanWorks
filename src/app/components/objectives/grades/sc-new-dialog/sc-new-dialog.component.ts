import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  SnackbarService,
  MessageType,
} from 'src/app/services/snackbar.service';
import { LocalizationService } from 'src/libraries/util/services/localization.service';
import { ScNewComponent } from '../sc-new/sc-new.component';

@Component({
  selector: 'sc-new-dialog',
  templateUrl: './sc-new-dialog.component.html',
  styleUrls: ['./sc-new-dialog.component.scss'],
})
export class ScNewDialogComponent implements OnInit {
  @ViewChild('scNew') scNew: ScNewComponent;

  constructor(
    public lang: LocalizationService,
    public dialogRef: MatDialogRef<ScNewDialogComponent>,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {}

  async submit() {
    if (await this.scNew.addNew()) {
      this.dialogRef.close();
      this.snackbar.displayTop(
        this.lang.data.sc.snackbar.new,
        MessageType.Info
      );
    }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  SnackbarService,
  MessageType,
} from 'src/app/services/snackbar.service';
import { LocalizationService } from 'src/libraries/util/services/localization.service';
import { HwNewComponent } from '../hw-new/hw-new.component';

@Component({
  selector: 'hw-new-dialog',
  templateUrl: './hw-new-dialog.component.html',
  styleUrls: ['./hw-new-dialog.component.scss'],
})
export class HwNewDialogComponent implements OnInit {
  @ViewChild('hwNew') hwNew: HwNewComponent;

  constructor(
    public lang: LocalizationService,
    public dialogRef: MatDialogRef<HwNewDialogComponent>,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {}

  async submit() {
    if (await this.hwNew.addNew()) {
      this.dialogRef.close();
      this.snackbar.displayTop(
        this.lang.data.hw.snackbar.new.replace(
          '%hw%',
          this.hwNew.hwDetail.hw.title
        ),
        MessageType.Info
      );
    }
  }
}

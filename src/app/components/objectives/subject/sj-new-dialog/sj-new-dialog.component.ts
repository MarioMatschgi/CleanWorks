import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  MessageType,
  SnackbarService,
} from 'src/app/services/snackbar.service';
import { LocalizationService } from 'src/libraries/util/services/localization.service';
import { SjNewComponent } from '../sj-new/sj-new.component';

@Component({
  selector: 'sj-new-dialog',
  templateUrl: './sj-new-dialog.component.html',
  styleUrls: ['./sj-new-dialog.component.scss'],
})
export class SjNewDialogComponent implements OnInit {
  @ViewChild('sjNew') sjNew: SjNewComponent;

  constructor(
    public lang: LocalizationService,
    public dialogRef: MatDialogRef<SjNewDialogComponent>,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {}

  async submit() {
    if (await this.sjNew.addNew()) {
      this.dialogRef.close();
      this.snackbar.displayTop(
        this.lang.data.sj.snackbar.new.replace('%sj%', this.sjNew.data.title),
        MessageType.Info
      );
    }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  SnackbarService,
  MessageType,
} from 'src/app/services/snackbar.service';
import { HwNewComponent } from '../hw-new/hw-new.component';

@Component({
  selector: 'hw-new-dialog',
  templateUrl: './hw-new-dialog.component.html',
  styleUrls: ['./hw-new-dialog.component.scss'],
})
export class HwNewDialogComponent implements OnInit {
  @ViewChild('hwNew') hwNew: HwNewComponent;

  constructor(
    public dialogRef: MatDialogRef<HwNewDialogComponent>,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {}

  async submit() {
    if (await this.hwNew.addNew()) {
      this.dialogRef.close();
      this.snackbar.displayTop(
        'Successfully added a new homework',
        MessageType.Info
      );
    }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  SnackbarService,
  MessageType,
} from 'src/app/services/snackbar.service';
import { GrNewComponent } from '../gr-new/gr-new.component';

@Component({
  selector: 'gr-new-dialog',
  templateUrl: './gr-new-dialog.component.html',
  styleUrls: ['./gr-new-dialog.component.scss'],
})
export class GrNewDialogComponent implements OnInit {
  @ViewChild('grNew') grNew: GrNewComponent;

  constructor(
    public dialogRef: MatDialogRef<GrNewDialogComponent>,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {}

  async submit() {
    if (await this.grNew.addNew()) {
      this.dialogRef.close();
      this.snackbar.displayTop(
        `Successfully added a new group "${this.grNew.grDetail.gr.title}"`,
        MessageType.Info
      );
    }
  }
}

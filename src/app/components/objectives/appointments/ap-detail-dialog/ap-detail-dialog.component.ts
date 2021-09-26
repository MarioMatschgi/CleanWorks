import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentModel } from 'src/app/models/objectives/appointment.model';
import { LocalizationService } from 'src/libraries/util/services/localization.service';

@Component({
  selector: 'ap-detail-dialog',
  templateUrl: './ap-detail-dialog.component.html',
  styleUrls: ['./ap-detail-dialog.component.scss'],
})
export class ApDetailDialogComponent implements OnInit {
  constructor(
    public lang: LocalizationService,
    public dialogRef: MatDialogRef<ApDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { appointment: AppointmentModel }
  ) {}

  ngOnInit(): void {}
}

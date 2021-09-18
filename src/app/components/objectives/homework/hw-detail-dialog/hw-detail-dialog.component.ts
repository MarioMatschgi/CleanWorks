import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeworkModel } from 'src/app/models/objectives/homework.model';
import { LocalizationService } from 'src/libraries/util/services/localization.service';

@Component({
  selector: 'hw-detail-dialog',
  templateUrl: './hw-detail-dialog.component.html',
  styleUrls: ['./hw-detail-dialog.component.scss'],
})
export class HwDetailDialogComponent implements OnInit {
  constructor(
    public lang: LocalizationService,
    public dialogRef: MatDialogRef<HwDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { homework: HomeworkModel }
  ) {}

  ngOnInit(): void {}
}

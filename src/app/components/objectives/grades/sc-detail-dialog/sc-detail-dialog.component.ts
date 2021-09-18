import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GradeModel } from 'src/app/models/objectives/grade.model';
import { LocalizationService } from 'src/libraries/util/services/localization.service';

@Component({
  selector: 'sc-detail-dialog',
  templateUrl: './sc-detail-dialog.component.html',
  styleUrls: ['./sc-detail-dialog.component.scss'],
})
export class ScDetailDialogComponent implements OnInit {
  constructor(
    public lang: LocalizationService,
    public dialogRef: MatDialogRef<ScDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { grade: GradeModel }
  ) {}

  ngOnInit(): void {}
}

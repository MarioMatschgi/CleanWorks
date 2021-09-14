import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScoreModel } from 'src/app/models/objectives/score.model';

@Component({
  selector: 'sc-detail-dialog',
  templateUrl: './sc-detail-dialog.component.html',
  styleUrls: ['./sc-detail-dialog.component.scss'],
})
export class ScDetailDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ScDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { grade: ScoreModel }
  ) {}

  ngOnInit(): void {}
}

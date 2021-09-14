import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupModel } from 'src/app/models/objectives/group.model';
import { DataUtilService } from 'src/app/services/data-util/data-util.service';

@Component({
  selector: 'gr-detail-dialog',
  templateUrl: './gr-detail-dialog.component.html',
  styleUrls: ['./gr-detail-dialog.component.scss'],
})
export class GrDetailDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<GrDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { group: GroupModel },
    public du: DataUtilService
  ) {}

  ngOnInit(): void {}
}

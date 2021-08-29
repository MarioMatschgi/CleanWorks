import { Component, Input, OnInit } from '@angular/core';
import { HomeworkModel } from 'src/app/models/objectives/homework.model';
import { DialogService } from 'src/app/services/dialog.service';
import { HwDetailDialogComponent } from '../hw-detail-dialog/hw-detail-dialog.component';

@Component({
  selector: 'hw-list',
  templateUrl: './hw-list.component.html',
  styleUrls: ['./hw-list.component.scss'],
})
export class HwListComponent implements OnInit {
  @Input() homeworks: HomeworkModel[];

  constructor(private dialog: DialogService) {}

  ngOnInit(): void {}

  viewHomwork(hw: HomeworkModel) {
    this.dialog.dialog.open(HwDetailDialogComponent, {
      data: { homework: hw },
    });
  }
}

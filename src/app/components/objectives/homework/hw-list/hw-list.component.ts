import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { HomeworkModel } from 'src/app/models/objectives/homework.model';
import {
  DataLoadService,
  LoaderServices,
} from 'src/app/services/data-load.service';
import { DialogService } from 'src/app/services/dialog.service';
import {
  MessageType,
  SnackbarService,
} from 'src/app/services/snackbar.service';
import { HwDetailDialogComponent } from '../hw-detail-dialog/hw-detail-dialog.component';

@Component({
  selector: 'hw-list',
  templateUrl: './hw-list.component.html',
  styleUrls: ['./hw-list.component.scss'],
})
export class HwListComponent implements OnInit {
  @Input() homeworks: HomeworkModel[];

  constructor(
    private dialog: DialogService,
    private dataLoader: DataLoadService<HomeworkModel>,
    private dialogService: DialogService,
    private snackbar: SnackbarService
  ) {
    dataLoader.loaderType = LoaderServices.homework;
  }

  ngOnInit(): void {}

  async completeHomework(hw: HomeworkModel, evt?: PointerEvent) {
    evt?.stopPropagation();

    if (hw.completed != null) hw.completed = null;
    else hw.completed = moment();

    await this.saveSubject(hw);
  }

  async saveSubject(hw: HomeworkModel) {
    await this.dataLoader.updateData(hw);

    this.snackbar.displayTop(`Saved homework "${hw.title}"`, MessageType.Info);
  }

  deleteHomework(hw: HomeworkModel, evt?: PointerEvent) {
    evt?.stopPropagation();

    this.dialogService
      .openDeleteDialog([hw.title])
      .afterClosed()
      .subscribe(async (del) => {
        if (del) {
          await this.dataLoader.removeData(hw);

          this.snackbar.displayTop(
            `Successfully deleted subject "${hw.title}"`,
            MessageType.Info
          );
        }
      });
  }

  viewHomwork(hw: HomeworkModel) {
    this.dialog.dialog.open(HwDetailDialogComponent, {
      data: { homework: hw },
    });
  }

  isOverDue(hw: HomeworkModel) {
    return !hw.completed && moment().diff(hw.dueDate) > 0;
  }
}

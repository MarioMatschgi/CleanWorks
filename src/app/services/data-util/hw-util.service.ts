import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { HwDetailDialogComponent } from '../../components/objectives/homework/hw-detail-dialog/hw-detail-dialog.component';
import { HomeworkModel } from '../../models/objectives/homework.model';
import {
  DataUtilBaseService,
  IDataUtilBaseService,
} from './data-util-base.service';
import { MessageType } from '../snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class HwUtilService implements IDataUtilBaseService<HomeworkModel> {
  constructor(private base: DataUtilBaseService) {}

  async save(hw: HomeworkModel): Promise<void> {
    await this.base.hwLoader.updateData(hw);

    this.base.snackbar.displayTop(
      `Successfully saved homework "${hw.title}"`,
      MessageType.Info
    );
  }

  async remove(hw: HomeworkModel): Promise<void> {
    this.base.dialogService
      .openDeleteDialog([hw.title])
      .afterClosed()
      .subscribe(async (del) => {
        if (del) {
          await this.base.hwLoader.removeData(hw);

          this.base.snackbar.displayTop(
            `Successfully deleted homework "${hw.title}"`,
            MessageType.Info
          );
        }
      });
  }

  view(hw: HomeworkModel): void {
    this.base.dialogService.dialog.open(HwDetailDialogComponent, {
      data: { homework: hw },
    });
  }

  async complete(hw: HomeworkModel) {
    if (hw.completed != null) hw.completed = null;
    else hw.completed = moment();

    await this.save(hw);
  }

  isOverDue(hw: HomeworkModel) {
    return !hw.completed && moment().diff(hw.dueDate) > 0;
  }
}

import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { HwDetailDialogComponent } from '../../components/objectives/homework/hw-detail-dialog/hw-detail-dialog.component';
import { HomeworkModel } from '../../models/objectives/homework.model';
import {
  DataUtilBaseService,
  IDataUtilBaseService,
} from './data-util-base.service';
import { MessageType } from '../snackbar.service';
import { AuthService } from 'src/libraries/authentication/services/auth.service';
import { LocalizationService } from 'src/libraries/util/services/localization.service';

@Injectable({
  providedIn: 'root',
})
export class HwUtilService implements IDataUtilBaseService<HomeworkModel> {
  constructor(
    public lang: LocalizationService,
    private base: DataUtilBaseService,
    private auth: AuthService
  ) {}

  async save(hw: HomeworkModel): Promise<void> {
    await this.base.hwLoader.updateData(hw);

    this.base.snackbar.displayTop(
      this.lang.data.hw.snackbar.new.replace('%hw%', hw.title),
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
            this.lang.data.hw.snackbar.delete.replace('%hw%', hw.title),
            MessageType.Info
          );
        }
      });
  }

  async add(hw: HomeworkModel): Promise<void> {
    await this.base.hwLoader.addData(hw);
  }

  view(hw: HomeworkModel): void {
    this.base.dialogService.open(HwDetailDialogComponent, {
      data: { homework: hw },
    });
  }

  isOverDue(hw: HomeworkModel) {
    return !this.isCompleted(hw) && moment().diff(hw.dueDate) > 0;
  }

  async setCompleted(hw: HomeworkModel, completed: boolean) {
    if (completed) {
      if (hw.completed == null) {
        hw.completed = {};
      }
      hw.completed[this.auth.userData.uid] = moment();
    } else {
      delete completed[this.auth.userData.uid];
    }
    await this.save(hw);
  }

  isCompleted(hw: HomeworkModel): boolean {
    if (hw.completed == null) return false;

    return Object.keys(hw.completed).includes(this.auth.userData.uid);
  }

  getCompleted(hw: HomeworkModel): moment.Moment {
    if (hw.completed == null) return null;
    return hw.completed[this.auth.userData.uid];
  }
}

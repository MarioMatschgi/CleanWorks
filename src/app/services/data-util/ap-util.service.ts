import { Injectable } from '@angular/core';
import {
  DataUtilBaseService,
  IDataUtilBaseService,
} from './data-util-base.service';
import { MessageType } from '../snackbar.service';
import { LocalizationService } from 'src/libraries/util/services/localization.service';
import { AppointmentModel } from 'src/app/models/objectives/appointment.model';
import { ApDetailDialogComponent } from 'src/app/components/objectives/appointments/ap-detail-dialog/ap-detail-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ApUtilService implements IDataUtilBaseService<AppointmentModel> {
  constructor(
    public lang: LocalizationService,
    private base: DataUtilBaseService
  ) {}

  async save(ap: AppointmentModel): Promise<void> {
    await this.base.apLoader.updateData(ap);

    this.base.snackbar.displayTop(
      this.lang.data.ap.snackbar.save.replace('%ap%', ap.title),
      MessageType.Info
    );
  }

  async remove(ap: AppointmentModel): Promise<void> {
    this.base.dialogService
      .openDeleteDialog([ap.title])
      .afterClosed()
      .subscribe(async (del) => {
        if (del) {
          await this.base.apLoader.removeData(ap);

          this.base.snackbar.displayTop(
            this.lang.data.ap.snackbar.delete.replace('%ap%', ap.title),
            MessageType.Info
          );
        }
      });
  }

  async add(ap: AppointmentModel): Promise<void> {
    await this.base.apLoader.addData(ap);
  }

  view(ap: AppointmentModel): void {
    this.base.dialogService.open(ApDetailDialogComponent, {
      data: { appointment: ap },
    });
  }

  getById(id: string): AppointmentModel {
    return this.base.userData.grades.find((e) => e.id === id);
  }
}

import { Injectable } from '@angular/core';
import {
  DataUtilBaseService,
  IDataUtilBaseService,
} from './data-util-base.service';
import { MessageType } from '../snackbar.service';
import { GradeModel } from 'src/app/models/objectives/grade.model';
import { ScDetailDialogComponent } from 'src/app/components/objectives/grades/sc-detail-dialog/sc-detail-dialog.component';
import { LocalizationService } from 'src/libraries/util/services/localization.service';

@Injectable({
  providedIn: 'root',
})
export class ScUtilService implements IDataUtilBaseService<GradeModel> {
  constructor(
    public lang: LocalizationService,
    private base: DataUtilBaseService
  ) {}

  async save(sc: GradeModel): Promise<void> {
    await this.base.scLoader.updateData(sc);

    this.base.snackbar.displayTop(
      this.lang.data.sc.snackbar.save,
      MessageType.Info
    );
  }

  async remove(sc: GradeModel): Promise<void> {
    this.base.dialogService
      .openDeleteDialog(['Grade'])
      .afterClosed()
      .subscribe(async (del) => {
        if (del) {
          await this.base.scLoader.removeData(sc);

          this.base.snackbar.displayTop(
            this.lang.data.sc.snackbar.delete,
            MessageType.Info
          );
        }
      });
  }

  async add(sc: GradeModel): Promise<void> {
    await this.base.scLoader.addData(sc);
  }

  view(sc: GradeModel): void {
    this.base.dialogService.open(ScDetailDialogComponent, {
      data: { grade: sc },
    });
  }

  getById(id: string): GradeModel {
    return this.base.userData.grades.find((e) => e.id === id);
  }
}

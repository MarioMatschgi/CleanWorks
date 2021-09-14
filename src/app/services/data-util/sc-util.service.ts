import { Injectable } from '@angular/core';
import {
  DataUtilBaseService,
  IDataUtilBaseService,
} from './data-util-base.service';
import { MessageType } from '../snackbar.service';
import { GradeModel } from 'src/app/models/objectives/grade.model';
import { ScDetailDialogComponent } from 'src/app/components/objectives/grades/sc-detail-dialog/sc-detail-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ScUtilService implements IDataUtilBaseService<GradeModel> {
  constructor(private base: DataUtilBaseService) {}

  async save(sc: GradeModel): Promise<void> {
    await this.base.scLoader.updateData(sc);

    this.base.snackbar.displayTop(`Successfully saved grade`, MessageType.Info);
  }

  async remove(sc: GradeModel): Promise<void> {
    this.base.dialogService
      .openDeleteDialog(['Grade'])
      .afterClosed()
      .subscribe(async (del) => {
        if (del) {
          await this.base.scLoader.removeData(sc);

          this.base.snackbar.displayTop(
            `Successfully deleted grade`,
            MessageType.Info
          );
        }
      });
  }

  view(sc: GradeModel): void {
    this.base.dialogService.dialog.open(ScDetailDialogComponent, {
      data: { grade: sc },
    });
  }

  getById(id: string): GradeModel {
    return this.base.userData.grades.find((e) => e.id === id);
  }
}

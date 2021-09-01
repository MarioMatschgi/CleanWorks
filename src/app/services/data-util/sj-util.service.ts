import { Injectable } from '@angular/core';
import { SubjectModel } from '../../models/objectives/subject.model';
import {
  DataUtilBaseService,
  IDataUtilBaseService,
} from './data-util-base.service';
import { MessageType } from '../snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class SjUtilService implements IDataUtilBaseService<SubjectModel> {
  constructor(private base: DataUtilBaseService) {}

  async save(sj: SubjectModel): Promise<void> {
    await this.base.sjLoader.updateData(sj);

    this.base.snackbar.displayTop(
      `Saved subject "${sj.title}"`,
      MessageType.Info
    );
  }

  async remove(sj: SubjectModel): Promise<void> {
    this.base.dialogService
      .openDeleteDialog([sj.title])
      .afterClosed()
      .subscribe(async (del) => {
        if (del) {
          await this.base.sjLoader.removeData(sj);

          this.base.snackbar.displayTop(
            `Deleted subject "${sj.title}"`,
            MessageType.Info
          );
        }
      });
  }

  view(sj: SubjectModel): void {
    throw new Error('Method not implemented.');
  }

  getById(id: string): SubjectModel {
    return this.base.userData.subjects.find((e) => e.id === id);
  }
}

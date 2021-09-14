import { Injectable } from '@angular/core';
import {
  DataUtilBaseService,
  IDataUtilBaseService,
} from './data-util-base.service';
import { MessageType } from '../snackbar.service';
import { ScoreModel } from 'src/app/models/objectives/score.model';

@Injectable({
  providedIn: 'root',
})
export class ScUtilService implements IDataUtilBaseService<ScoreModel> {
  constructor(private base: DataUtilBaseService) {}

  async save(sc: ScoreModel): Promise<void> {
    await this.base.sjLoader.updateData(sc);

    this.base.snackbar.displayTop(
      `Saved subject "${sc.title}"`,
      MessageType.Info
    );
  }

  async remove(sc: ScoreModel): Promise<void> {
    this.base.dialogService
      .openDeleteDialog([sc.title])
      .afterClosed()
      .subscribe(async (del) => {
        if (del) {
          await this.base.sjLoader.removeData(sc);

          this.base.snackbar.displayTop(
            `Deleted subject "${sc.title}"`,
            MessageType.Info
          );
        }
      });
  }

  view(sc: ScoreModel): void {
    throw new Error('Method not implemented.');
  }

  getById(id: string): ScoreModel {
    return this.base.userData.scores.find((e) => e.id === id);
  }
}

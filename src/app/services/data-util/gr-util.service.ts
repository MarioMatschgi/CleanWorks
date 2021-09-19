import { Injectable } from '@angular/core';
import {
  GroupMemberRole,
  GroupModel,
} from '../../models/objectives/group.model';
import {
  DataUtilBaseService,
  IDataUtilBaseService,
} from './data-util-base.service';
import { MessageType } from '../snackbar.service';
import { LocalizationService } from 'src/libraries/util/services/localization.service';
import { AuthService } from 'src/libraries/authentication/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GrUtilService implements IDataUtilBaseService<GroupModel> {
  constructor(
    public lang: LocalizationService,
    private base: DataUtilBaseService
  ) {}

  async save(gr: GroupModel): Promise<void> {
    await this.base.grLoader.updateData(gr);

    this.base.snackbar.displayTop(
      this.lang.data.gr.snackbar.save.replace('%gr%', gr.title),
      MessageType.Info
    );
  }

  async remove(gr: GroupModel): Promise<void> {
    this.base.dialogService
      .openDeleteDialog([gr.title])
      .afterClosed()
      .subscribe(async (del) => {
        if (del) {
          await this.base.grLoader.removeData(gr);

          this.base.snackbar.displayTop(
            this.lang.data.gr.snackbar.delete.replace('%gr%', gr.title),
            MessageType.Info
          );
        }
      });
  }

  async add(gr: GroupModel): Promise<void> {
    gr.memberIds = [this.base.auth.userData.uid];
    gr.members = [
      {
        id: this.base.auth.userData.uid,
        name: this.base.auth.userData.displayName,
        email: this.base.auth.userData.email,
        role: GroupMemberRole.admin,
      },
    ];
    await this.base.grLoader.addData(gr);
  }

  view(gr: GroupModel): void {
    throw new Error('Method not implemented.');
  }

  getById(id: string): GroupModel {
    return this.base.userData.data.groups.find((e) => e.id === id);
  }
}

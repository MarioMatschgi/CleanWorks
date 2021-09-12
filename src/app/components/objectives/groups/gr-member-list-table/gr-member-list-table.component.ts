import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  GroupMemberModel,
  GroupMemberRole,
} from 'src/app/models/objectives/group.model';
import { GrDataLoadService } from 'src/app/services/data-load/group-data-load.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { AuthService } from 'src/libraries/authentication/services/auth.service';
import { GrAddMemberDialogComponent } from '../gr-add-member-dialog/gr-add-member-dialog.component';

@Component({
  selector: 'gr-member-list-table',
  templateUrl: './gr-member-list-table.component.html',
  styleUrls: ['./gr-member-list-table.component.scss'],
})
export class GrMemberListTableComponent implements OnInit {
  roles: string[];

  private _dataSource: MatTableDataSource<GroupMemberModel> =
    new MatTableDataSource();
  get dataSource(): MatTableDataSource<GroupMemberModel> {
    this._dataSource.data = this.userData.group.members;

    return this._dataSource;
  }
  displayedColumns = ['name', 'email', 'role'];

  @ViewChild(MatSort) protected sort: MatSort;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private auth: AuthService,
    private userData: UserDataService,
    private grLoader: GrDataLoadService,
    private dialog: DialogService
  ) {
    this.roles = Object.values(GroupMemberRole);
  }

  ngOnInit(): void {}

  save(uid: string) {
    if (!this.userData.isGroupAdmin || this.auth.userData.uid === uid) return;

    const d = this.userData.group;
    d.members = this._dataSource.data;

    this.grLoader.updateData(d);
  }

  addMember() {
    this.dialog.dialog
      .open(GrAddMemberDialogComponent, {
        width: '40em',
        height: '50em',
      })
      .afterClosed()
      .subscribe((users: GroupMemberModel[]) => {
        const d = this.userData.group;
        for (const user of users) {
          if (!d.memberIds.includes(user.id)) {
            d.memberIds.push(user.id);
            d.members.push(user);
          }
        }

        this.grLoader.updateData(d);
      });
  }
}

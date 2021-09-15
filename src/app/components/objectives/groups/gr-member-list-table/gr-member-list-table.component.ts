import { BreakpointObserver } from '@angular/cdk/layout';
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
import { MatTableBaseComponent } from 'src/libraries/util/components/mat-table-base.component';
import { GrAddMemberDialogComponent } from '../gr-add-member-dialog/gr-add-member-dialog.component';

@Component({
  selector: 'gr-member-list-table',
  templateUrl: './gr-member-list-table.component.html',
  styleUrls: ['./gr-member-list-table.component.scss'],
})
export class GrMemberListTableComponent
  extends MatTableBaseComponent<GroupMemberModel>
  implements OnInit
{
  roles: string[];

  displayedColumns = ['name', 'email', 'role'];
  mobileWidth = '47em';

  constructor(
    private auth: AuthService,
    private userData: UserDataService,
    private grLoader: GrDataLoadService,
    private dialog: DialogService,
    bpo: BreakpointObserver
  ) {
    super(bpo);
    this.roles = Object.values(GroupMemberRole);
  }

  ngOnInit(): void {
    if (this.userData.isGroupAdmin) {
      this.displayedColumns.push('remove');
    }
  }

  save(uid: string) {
    if (!this.userData.isGroupAdmin || this.auth.userData.uid === uid) return;

    const d = this.userData.group;
    d.members = this.dataSource.data;

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

  removeMember(member: GroupMemberModel) {
    this.dialog
      .openDeleteDialog([member.name || member.email])
      .afterClosed()
      .subscribe((del) => {
        if (del) {
          const g = this.userData.group;
          g.memberIds = g.memberIds.filter((m) => m !== member.id);
          g.members = g.members.filter((m) => m.id !== member.id);

          this.grLoader.updateData(g);
        }
      });
  }

  leaveGroup() {
    this.dialog
      .openConfirmationDialog('Are you sure you want to', '', 'warn')
      .afterClosed()
      .subscribe((con) => {
        if (con) {
          const g = this.userData.group;

          // If self is admin, check if no admins, then make random admin
          if (this.userData.isGroupAdmin) {
            let noAdmin = true;
            for (const member of g.members) {
              if (
                member.id !== this.auth.userData.uid &&
                member.role === GroupMemberRole.admin
              )
                noAdmin = false;
            }
            if (noAdmin) {
              const firstNoAdminIdx = g.members
                .sort(() => Math.random() - 0.5)
                .findIndex(
                  (m) =>
                    m.id !== this.auth.userData.uid &&
                    m.role !== GroupMemberRole.admin
                );

              g.members[firstNoAdminIdx].role = GroupMemberRole.admin;
              this.save(g.members[firstNoAdminIdx].id);
            }
          }

          // Remove self
          g.memberIds = g.memberIds.filter((m) => m !== this.auth.userData.uid);
          g.members = g.members.filter((m) => m.id !== this.auth.userData.uid);

          this.grLoader.updateData(g);
        }
      });
  }
}

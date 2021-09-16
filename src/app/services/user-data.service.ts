import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/libraries/authentication/services/auth.service';
import { DatabaseService } from 'src/libraries/util/services/database.service';
import { GroupMemberRole, GroupModel } from '../models/objectives/group.model';
import { HomeworkModel } from '../models/objectives/homework.model';
import { GradeModel } from '../models/objectives/grade.model';
import { UserDataModel } from '../models/user-data.model';
import { GrDataLoadService } from './data-load/group-data-load.service';
import { HwDataLoadService } from './data-load/hw-data-load.service';
import { ScDataLoadService } from './data-load/sc-data-load.service';
import { SjDataLoadService } from './data-load/sj-data-load.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  data: UserDataModel = new UserDataModel();
  groupId: string;
  group: GroupModel;
  isGroupAdmin = false;
  grades: GradeModel[] = [];

  constructor(
    private grLoader: GrDataLoadService,
    private sjLoader: SjDataLoadService,
    private hwLoader: HwDataLoadService,
    private scLoader: ScDataLoadService,
    private db: DatabaseService,
    private router: Router,
    private auth: AuthService
  ) {
    moment.updateLocale('en', {
      week: {
        dow: 1, // Monday is the first day of the week.
      },
    });

    this.auth.sub_userData((user) => {
      if (user) {
        this.updateData();
      }
    }, true);
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.groupId = e.url.split('/')[1];
        console.log(this.groupId, router.url.split('/')[1]);

        if (this.groupId !== router.url.split('/')[1]) {
          if (this.groupId === 'me') this.group = null;
          else
            this.grLoader.getData(this.groupId).subscribe((g) => {
              if (g == null || Object.values(g).length == 0) {
                this.router.navigateByUrl('/');
                return;
              }
              this.group = g;
              this.isGroupAdmin =
                g.members.find((m) => m.id === this.auth.userData.uid).role ===
                GroupMemberRole.admin;
            });

          this.updateData();
        }
      }
    });
  }

  private updateData() {
    this.data = new UserDataModel();

    if (this.groupId === 'me') {
      this.grLoader.getAllData().subscribe((grs) => {
        this.data.groups = grs as GroupModel[];

        this.updateGroups(['me', ...grs.map((g) => g.id)]);
      });
    } else {
      this.grLoader.getAllData().subscribe((grs) => {
        this.data.groups = grs as GroupModel[];

        this.updateGroups([this.groupId]);
      });
    }
  }

  private updateGroups(gids: string[]) {
    // Load subjects
    this.sjLoader.group = gids.length === 1 ? gids[0] : 'me';
    this.sjLoader.getAllData().subscribe((sjs) => {
      this.data.subjects = sjs;
    });
    // Load homework
    for (const g of gids) {
      this.hwLoader.group = g;
      this.hwLoader.getAllData().subscribe((hws) => {
        this.setHomework(hws, g);
      });
    }
    // Load grades
    this.scLoader.getAllData().subscribe((data) => {
      this.grades = data;
    });
  }

  private setHomework(hws: HomeworkModel[], gid: string) {
    this.data.hwFuture = this.filterByGroup(gid, this.data.hwFuture);
    this.data.hwToday = this.filterByGroup(gid, this.data.hwToday);
    this.data.hwPast = this.filterByGroup(gid, this.data.hwPast);
    this.data.hwTomorrow = this.filterByGroup(gid, this.data.hwTomorrow);
    this.data.hwWeek = this.filterByGroup(gid, this.data.hwWeek);
    this.data.hwCompleted = this.filterByGroup(gid, this.data.hwCompleted);
    for (const hw of hws) {
      const now = moment();
      const tomorrow = moment().add(1, 'days');

      if (hw.completed) {
        this.data.hwCompleted.push(hw);
      } else if (hw.dueDate.isBefore(now, 'date')) {
        this.data.hwPast.push(hw);
      } else if (hw.dueDate.isSame(now, 'date')) {
        this.data.hwToday.push(hw);
      } else if (hw.dueDate.isSame(tomorrow, 'date')) {
        this.data.hwTomorrow.push(hw);
      } else if (hw.dueDate.isSame(now, 'week')) {
        this.data.hwWeek.push(hw);
      } else {
        this.data.hwFuture.push(hw);
      }
    }
  }

  private filterByGroup(gid: string, arr: any[]): any[] {
    return arr.filter((hw) => hw.groupId !== gid);
  }
}

import { EventEmitter, Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/libraries/authentication/services/auth.service';
import { GroupMemberRole, GroupModel } from '../models/objectives/group.model';
import { HomeworkModel } from '../models/objectives/homework.model';
import { GradeModel } from '../models/objectives/grade.model';
import { UserDataModel } from '../models/user-data.model';
import { GrDataLoadService } from './data-load/group-data-load.service';
import { HwDataLoadService } from './data-load/hw-data-load.service';
import { ScDataLoadService } from './data-load/sc-data-load.service';
import { SjDataLoadService } from './data-load/sj-data-load.service';
import { SubjectModel } from '../models/objectives/subject.model';

export class UserDataEvents {
  hw = new EventEmitter<void>();
  sj = new EventEmitter<void>();
  gr = new EventEmitter<void>();
  sc = new EventEmitter<void>();

  subscribe(evt: EventEmitter<void>, callback: () => void) {
    callback();
    evt.subscribe(() => {
      callback();
    });
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  data: UserDataModel = new UserDataModel();
  groupId: string;
  group: GroupModel;
  isGroupAdmin = false;
  grades: GradeModel[] = [];

  events = new UserDataEvents();

  constructor(
    private grLoader: GrDataLoadService,
    private sjLoader: SjDataLoadService,
    private hwLoader: HwDataLoadService,
    private scLoader: ScDataLoadService,
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
      if (!this.auth.userData?.uid) return;

      if (e instanceof NavigationStart) {
        this.groupId = e.url.split('/')[1];
        if (this.groupId === '') this.groupId = 'me';

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
        this.events.gr.emit();
      });
    } else {
      this.grLoader.getAllData().subscribe((grs) => {
        this.data.groups = grs as GroupModel[];

        this.updateGroups([this.groupId]);
        this.events.gr.emit();
      });
    }
  }

  private updateGroups(gids: string[]) {
    this.data.subjects = {};
    const group_sj = this.sjLoader.group;
    const group_hw = this.hwLoader.group;
    const group_sc = this.scLoader.group;
    for (const g of gids) {
      // Load subjects
      this.sjLoader.group = g;
      this.sjLoader.getAllData().subscribe((sjs) => {
        this.setSubject(sjs, g);
        this.events.sj.emit();
      });
      // Load homework
      this.hwLoader.group = g;
      this.hwLoader.getAllData().subscribe((hws) => {
        this.setHomework(hws, g);
        this.events.hw.emit();
      });
    }
    // Load grades
    this.scLoader.group = 'me';
    this.scLoader.getAllData().subscribe((data) => {
      this.grades = data;
      this.events.sc.emit();
    });
    this.sjLoader.group = group_sj;
    this.hwLoader.group = group_hw;
    this.scLoader.group = group_sc;
  }

  private setSubject(sjs: SubjectModel[], gid: string) {
    this.data.subjects[gid] = sjs;
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

      if (this.isCompleted(hw)) {
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

  private isCompleted(hw: HomeworkModel): boolean {
    if (hw.completed == null) return false;
    return Object.keys(hw.completed).includes(this.auth.userData.uid);
  }

  private filterByGroup(gid: string, arr: any[]): any[] {
    return arr.filter((hw) => hw.groupId !== gid);
  }
}

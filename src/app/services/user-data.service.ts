import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import * as moment from 'moment';
import { GroupModel } from '../models/objectives/group.model';
import { HomeworkModel } from '../models/objectives/homework.model';
import { UserDataModel } from '../models/user-data.model';
import { GrDataLoadService } from './data-load/group-data-load.service';
import { HwDataLoadService } from './data-load/hw-data-load.service';
import { SjDataLoadService } from './data-load/sj-data-load.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  data: UserDataModel = new UserDataModel();
  group: string;

  constructor(
    private grLoader: GrDataLoadService,
    private sjLoader: SjDataLoadService,
    private hwLoader: HwDataLoadService,
    private router: Router
  ) {
    moment.updateLocale('en', {
      week: {
        dow: 1, // Monday is the first day of the week.
      },
    });

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.group = e.url.split('/')[1];
        if (e.url.split('/')[1] !== router.url.split('/')[1]) {
          this.updateData();
        }
      }
    });
  }

  private updateData() {
    this.data = new UserDataModel();

    if (this.group === 'all') {
      this.grLoader.getAllData().subscribe((grs) => {
        this.data.groups = grs as GroupModel[];

        this.updateGroups(grs.map((g) => g.id));
      });
    } else {
      this.grLoader.getAllData().subscribe((grs) => {
        this.data.groups = grs as GroupModel[];

        this.updateGroups([this.group]);
      });
    }
  }

  private updateGroups(gids: string[]) {
    for (const g of gids) {
      this.sjLoader.group = g;
      this.hwLoader.group = g;
      this.sjLoader.getAllData().subscribe((sjs) => {
        this.data.subjects = this.data.subjects.filter((s) => s.groupId !== g);
        this.data.subjects = this.data.subjects.concat(sjs);
      });
      this.hwLoader.getAllData().subscribe((hws) => {
        this.setHomework(hws, g);
      });
    }
  }

  private setHomework(hws: HomeworkModel[], gid: string) {
    this.data.hwFuture = this.data.hwFuture.filter((hw) => hw.groupId !== gid);
    this.data.hwToday = this.data.hwToday.filter((hw) => hw.groupId !== gid);
    this.data.hwPast = this.data.hwPast.filter((hw) => hw.groupId !== gid);
    this.data.hwTomorrow = this.data.hwTomorrow.filter(
      (hw) => hw.groupId !== gid
    );
    this.data.hwWeek = this.data.hwWeek.filter((hw) => hw.groupId !== gid);
    this.data.hwCompleted = this.data.hwCompleted.filter(
      (hw) => hw.groupId !== gid
    );
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
}

import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import * as moment from 'moment';
import { GroupModel } from '../models/objectives/group.model';
import { HomeworkModel } from '../models/objectives/homework.model';
import { SubjectModel } from '../models/objectives/subject.model';
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
    private router: Router,
    private route: ActivatedRoute
  ) {
    moment.updateLocale('en', {
      week: {
        dow: 1, // Monday is the first day of the week.
      },
    });

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        if (e.url.split('/')[1] !== router.url.split('/')[1]) {
          this.updateData();
        }
      }
    });
    setTimeout(() => {
      this.group = this.route.firstChild.snapshot.paramMap.get('gid');
      route.firstChild.paramMap.subscribe((p) => {
        this.group = p.get('gid');
      });
    });
  }

  private updateData() {
    // this.grLoader.getAllData().subscribe((grs) => {
    //   this.data.groups = grs as GroupModel[];
    //   this.sjLoader.getAllData().subscribe((sjs) => {
    //     this.data.subjects = sjs as SubjectModel[];
    //   });
    //   this.hwLoader.getAllData().subscribe((hws) => {
    //     this.setHomework(hws);
    //   });
    // });
    if (this.group === 'all') {
    } else {
      this.grLoader.getAllData().subscribe((grs) => {
        this.data.groups = grs as GroupModel[];
        this.sjLoader.getAllData().subscribe((sjs) => {
          this.data.subjects = sjs as SubjectModel[];
        });
        this.hwLoader.getAllData().subscribe((hws) => {
          this.setHomework(hws);
        });
      });
    }
  }

  private setHomework(hws: HomeworkModel[]) {
    this.data.hwFuture = [];
    this.data.hwToday = [];
    this.data.hwPast = [];
    this.data.hwTomorrow = [];
    this.data.hwWeek = [];
    this.data.hwCompleted = [];
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

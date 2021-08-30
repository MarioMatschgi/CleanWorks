import { EventEmitter, Injectable } from '@angular/core';
import * as moment from 'moment';
import { HomeworkModel } from '../models/objectives/homework.model';
import { ObjectiveModel } from '../models/objectives/objective.model';
import { SubjectModel } from '../models/objectives/subject.model';
import { DataLoadService, LoaderServices } from './data-load.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  homeworks: HomeworkModel[] = [];
  hwFuture: HomeworkModel[];
  hwPast: HomeworkModel[];
  hwTomorrow: HomeworkModel[];
  hwToday: HomeworkModel[];
  hwWeek: HomeworkModel[];
  hwCompleted: HomeworkModel[];

  subjects: SubjectModel[] = [];

  homeworksChanged = new EventEmitter<HomeworkModel[]>();
  subjectsChanged = new EventEmitter<SubjectModel[]>();

  constructor(private dataLoader: DataLoadService<ObjectiveModel>) {
    moment.updateLocale('en', {
      week: {
        dow: 1, // Monday is the first day of the week.
      },
    });

    dataLoader.loaderType = LoaderServices.homework;
    dataLoader.getAllData().subscribe((hws) => {
      this.homeworks = hws as HomeworkModel[];
      this.homeworksChanged.emit(this.homeworks);
    });
    dataLoader.loaderType = LoaderServices.subject;
    dataLoader.getAllData().subscribe((hws) => {
      this.subjects = hws as SubjectModel[];
      this.subjectsChanged.emit(this.subjects);
    });

    this.homeworksChanged.subscribe((hws) => {
      this.hwFuture = [];
      this.hwToday = [];
      this.hwPast = [];
      this.hwTomorrow = [];
      this.hwWeek = [];
      this.hwCompleted = [];
      for (const hw of hws) {
        const now = moment();
        const tomorrow = moment().add(1, 'days');

        if (hw.completed) {
          this.hwCompleted.push(hw);
        } else if (hw.dueDate.isBefore(now, 'date')) {
          this.hwPast.push(hw);
        } else if (hw.dueDate.isSame(now, 'date')) {
          this.hwToday.push(hw);
        } else if (hw.dueDate.isSame(tomorrow, 'date')) {
          this.hwTomorrow.push(hw);
        } else if (hw.dueDate.isSame(now, 'week')) {
          this.hwWeek.push(hw);
        } else {
          this.hwFuture.push(hw);
        }
      }
    });
  }
}

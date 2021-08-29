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
  subjects: SubjectModel[] = [];

  homeworksChanged = new EventEmitter<HomeworkModel[]>();
  subjectsChanged = new EventEmitter<SubjectModel[]>();

  constructor(private dataLoader: DataLoadService<ObjectiveModel>) {
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
      for (const hw of hws) {
        const now = moment();
        const tomorrow = now.add(1, 'days');

        if (now.isAfter(hw.dueDate, 'day')) {
          this.hwPast.push(hw);
          console.log('past', hw.title, hw.dueDate);
        } else if (now.isSame(hw.dueDate, 'day')) {
          this.hwToday.push(hw);
          console.log('today', hw.title);
        } else if (tomorrow.isSame(hw.dueDate, 'day')) {
          this.hwTomorrow.push(hw);
          console.log('tomorrow', hw.title);
        } else if (now.isSame(hw.dueDate, 'week')) {
          this.hwWeek.push(hw);
          console.log('week', hw.title);
        } else if (now.isBefore(hw.dueDate)) {
          this.hwFuture.push(hw);
          console.log('future', hw.title);
        }
      }
    });
  }
}

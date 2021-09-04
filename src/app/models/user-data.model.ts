import { GroupModel } from './objectives/group.model';
import { HomeworkModel } from './objectives/homework.model';
import { SubjectModel } from './objectives/subject.model';

export class UserDataModel {
  hwFuture: HomeworkModel[] = [];
  hwPast: HomeworkModel[] = [];
  hwTomorrow: HomeworkModel[] = [];
  hwToday: HomeworkModel[] = [];
  hwWeek: HomeworkModel[] = [];
  hwCompleted: HomeworkModel[] = [];

  subjects: SubjectModel[] = [];

  groups: GroupModel[];
}

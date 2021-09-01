import { ObjectiveModel } from './objective.model';

export class HomeworkModel extends ObjectiveModel {
  __NAME__ = 'homework';
  dueDate: moment.Moment;
  subjectId: string;
  completed: moment.Moment;
}

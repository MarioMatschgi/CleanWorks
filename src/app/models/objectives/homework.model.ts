import { ObjectiveModel } from './objective.model';

export class HomeworkModel extends ObjectiveModel {
  dueDate: moment.Moment;
  subjectId: string;
}

import { Moment } from 'moment';
import { ObjectiveModel } from './objective.model';

export class AppointmentModel extends ObjectiveModel {
  date: Moment;
  subjectId: string;
}

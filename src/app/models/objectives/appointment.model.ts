import { Moment } from 'moment';
import { ObjectiveModel } from './objective.model';

export class AppointmentModel extends ObjectiveModel {
  dateStart: Moment;
  dateEnd: Moment;
  subjectId: string;
}

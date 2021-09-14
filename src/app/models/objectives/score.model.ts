import * as moment from 'moment';
import { ObjectiveModel } from './objective.model';

export class ScoreModel extends ObjectiveModel {
  subjectId: string;
  type: ScoreType;
  mark: MarkType;
  score: number;
  scoreMax: number;
  date: moment.Moment;
  appointmentId?: string;
}

export enum ScoreType {
  revision = 'revision',
  test = 'test',
  verbal = 'verbal',
}

export type MarkType = 1 | 2 | 3 | 4 | 5 | 6;

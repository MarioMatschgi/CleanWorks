import { ObjectiveModel } from './objective.model';

export class GroupModel extends ObjectiveModel {
  members: string[];
  admins: string[];
}

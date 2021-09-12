import { ObjectiveModel } from './objective.model';

export class GroupModel extends ObjectiveModel {
  members: GroupMemberModel[];
  memberIds: string[];
  admins: string[];
}

export class GroupMemberModel {
  id: string;
  name: string;
  email: string;
  role: GroupMemberRole;
}

export enum GroupMemberRole {
  user = 'user',
  admin = 'admin',
}

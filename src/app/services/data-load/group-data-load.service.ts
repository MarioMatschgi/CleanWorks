import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupModel } from 'src/app/models/objectives/group.model';
import { AuthService } from 'src/libraries/authentication/services/auth.service';
import { DatabaseService } from 'src/libraries/util/services/database.service';
import { DataLoadService, LoadServices } from './data-load.service';

@Injectable({
  providedIn: 'root',
})
export class GrDataLoadService extends DataLoadService<GroupModel> {
  constructor(db: DatabaseService, auth: AuthService, route: ActivatedRoute) {
    super(db, auth, LoadServices.group, route);
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectModel } from 'src/app/models/objectives/subject.model';
import { AuthService } from 'src/libraries/authentication/services/auth.service';
import { DatabaseService } from 'src/libraries/util/services/database.service';
import { DataLoadService, LoadServices } from './data-load.service';

@Injectable({
  providedIn: 'root',
})
export class SjDataLoadService extends DataLoadService<SubjectModel> {
  constructor(db: DatabaseService, auth: AuthService, route: ActivatedRoute) {
    super(db, auth, LoadServices.subject, route);
  }
}

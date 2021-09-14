import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScoreModel } from 'src/app/models/objectives/score.model';
import { AuthService } from 'src/libraries/authentication/services/auth.service';
import { DatabaseService } from 'src/libraries/util/services/database.service';
import { DataLoadService, LoadServices } from './data-load.service';

@Injectable({
  providedIn: 'root',
})
export class ScDataLoadService extends DataLoadService<ScoreModel> {
  constructor(db: DatabaseService, auth: AuthService, route: ActivatedRoute) {
    super(db, auth, LoadServices.grade, route);
  }
}

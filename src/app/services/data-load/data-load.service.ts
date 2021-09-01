import { Endecryptor } from '../../models/encryptable.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObjectiveModel } from '../../models/objectives/objective.model';
import { AuthService } from 'src/libraries/authentication/services/auth.service';
import { DatabaseService } from 'src/libraries/util/services/database.service';

export enum LoadServices {
  subject = 'subjects',
  homework = 'homeworks',
}

@Injectable({
  providedIn: 'root',
})
export class DataLoadService<T extends ObjectiveModel> {
  constructor(
    private db: DatabaseService,
    private auth: AuthService,
    private loaderType: LoadServices
  ) {}

  getAllData(): Observable<T[]> {
    return this.db.col_usersData
      .doc(this.auth.userData.uid)
      .collection(this.loaderType)
      .valueChanges()
      .pipe(map((e) => Endecryptor.decryptAll(e as T[])));
  }

  getData(did: string): Observable<T> {
    return this.db.col_usersData
      .doc(this.auth.userData.uid)
      .collection(this.loaderType)
      .doc(did)
      .valueChanges()
      .pipe(map((e) => Endecryptor.decrypt(e as T)));
  }

  async addData(data: T) {
    const d = Endecryptor.encrypt(data);

    const doc = await this.db.col_usersData
      .doc(this.auth.userData.uid)
      .collection(this.loaderType)
      .add(d);

    d.id = doc.id;
    await this.db.col_usersData
      .doc(this.auth.userData.uid)
      .collection(this.loaderType)
      .doc(d.id)
      .set(d);

    return d.id;
  }

  async updateData(data: T) {
    const d = Endecryptor.encrypt(data);

    await this.db.col_usersData
      .doc(this.auth.userData.uid)
      .collection(this.loaderType)
      .doc(d.id)
      .set(d);

    return d.id;
  }

  async removeData(data: T) {
    await this.db.col_usersData
      .doc(this.auth.userData.uid)
      .collection(this.loaderType)
      .doc(data.id)
      .delete();
  }
}

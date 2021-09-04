import { Endecryptor } from '../../models/encryptable.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObjectiveModel } from '../../models/objectives/objective.model';
import { AuthService } from 'src/libraries/authentication/services/auth.service';
import { DatabaseService } from 'src/libraries/util/services/database.service';
import { ActivatedRoute } from '@angular/router';

export enum LoadServices {
  subject = 'subjects',
  homework = 'homeworks',
  group = 'groups',
}

@Injectable({
  providedIn: 'root',
})
export class DataLoadService<T extends ObjectiveModel> {
  group: string;

  constructor(
    protected db: DatabaseService,
    protected auth: AuthService,
    protected loaderType: LoadServices,
    protected route: ActivatedRoute
  ) {
    setTimeout(() => {
      this.group = this.route.firstChild.snapshot.paramMap.get('gid');
      route.firstChild.paramMap.subscribe((p) => {
        this.group = p.get('gid');
      });
    });
  }

  protected collection() {
    if (this.loaderType === LoadServices.group) return this.getGroupCol();

    return this.getGroupCol().doc(this.group).collection(this.loaderType);
  }

  private getGroupCol() {
    return this.db.db.collection('groups', (ref) =>
      ref.where('members', 'array-contains-any', [this.auth.userData.uid])
    );
  }

  getAllData(): Observable<T[]> {
    return this.collection()
      .valueChanges()
      .pipe(map((e) => Endecryptor.decryptAll(e as T[])));
  }

  getData(did: string): Observable<T> {
    return this.collection()
      .doc(did)
      .valueChanges()
      .pipe(map((e) => Endecryptor.decrypt(e as T)));
  }

  async addData(data: T) {
    if (this.loaderType !== LoadServices.group) data.groupId = this.group;

    const d = Endecryptor.encrypt(data);

    const doc = await this.collection().add(d);

    d.id = doc.id;
    await this.collection().doc(d.id).set(d);

    return d.id;
  }

  async updateData(data: T) {
    const d = Endecryptor.encrypt(data);

    await this.collection().doc(d.id).set(d);

    return d.id;
  }

  async removeData(data: T) {
    await this.collection().doc(data.id).delete();
  }
}

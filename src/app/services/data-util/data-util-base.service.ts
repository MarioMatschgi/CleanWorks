import { Injectable } from '@angular/core';
import { ObjectiveModel } from '../../models/objectives/objective.model';
import { HwDataLoadService } from '../data-load/hw-data-load.service';
import { SjDataLoadService } from '../data-load/sj-data-load.service';
import { DialogService } from '../dialog.service';
import { SnackbarService } from '../snackbar.service';
import { UserDataService } from '../user-data.service';

export class IDataUtilBaseService<T extends ObjectiveModel> {
  constructor() {}

  async save(o: T) {}

  async remove(o: T) {}

  view(o: T) {}
}

@Injectable({
  providedIn: 'root',
})
export class DataUtilBaseService {
  constructor(
    public hwLoader: HwDataLoadService,
    public sjLoader: SjDataLoadService,
    public snackbar: SnackbarService,
    public dialogService: DialogService,
    public userData: UserDataService
  ) {}
}

import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { HomeworkModel } from 'src/app/models/objectives/homework.model';
import {
  DataLoadService,
  LoaderServices,
} from 'src/app/services/data-load.service';
import {
  MessageType,
  SnackbarService,
} from 'src/app/services/snackbar.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { LoadService } from 'src/libraries/loading/services/load.service';

@Component({
  selector: 'hw-detail',
  templateUrl: './hw-detail.component.html',
  styleUrls: ['./hw-detail.component.scss'],
})
export class HwDetailComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  @Input('homework') hw: HomeworkModel = {} as HomeworkModel;
  @Input() shouldSave: boolean = true;

  @Output() hwChange = new EventEmitter<HomeworkModel>();

  now(): moment.Moment {
    return moment();
  }

  private wasSaveAborted = false;

  constructor(
    public userData: UserDataService,
    private dataLoader: DataLoadService<HomeworkModel>,
    private snackbar: SnackbarService,
    private loader: LoadService
  ) {
    dataLoader.loaderType = LoaderServices.homework;
  }

  ngOnInit(): void {}

  async save() {
    if (this.loader.finished('save')) {
      await this.saveHomework();
      if (this.wasSaveAborted) {
        this.save();
        this.wasSaveAborted = false;
      }
    } else {
      this.wasSaveAborted = true;
    }
  }

  private async saveHomework() {
    this.loader.load('save');
    if (this.shouldSave) {
      await this.dataLoader.updateData(this.hw);
      this.snackbar.displayTop(
        `Saved homework "${this.hw.title}"`,
        MessageType.Info
      );

      this.hwChange.emit(this.hw);
    } else {
      this.hwChange.emit(this.hw);
    }
    this.loader.unload('save');
  }
}

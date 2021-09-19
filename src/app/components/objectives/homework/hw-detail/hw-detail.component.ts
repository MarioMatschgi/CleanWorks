import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import * as moment from 'moment';
import { HomeworkModel } from 'src/app/models/objectives/homework.model';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { DataUtilService } from 'src/app/services/data-util/data-util.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { AuthService } from 'src/libraries/authentication/services/auth.service';
import { LoadService } from 'src/libraries/loading/services/load.service';
import { LocalizationService } from 'src/libraries/util/services/localization.service';

@Component({
  selector: 'hw-detail',
  templateUrl: './hw-detail.component.html',
  styleUrls: ['./hw-detail.component.scss'],
})
export class HwDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('form') form: NgForm;
  @Input('homework') hw: HomeworkModel = {} as HomeworkModel;
  @Input() shouldSave: boolean = true;

  private wasSaveAborted = false;
  private hwOld: HomeworkModel;

  constructor(
    public userData: UserDataService,
    public lang: LocalizationService,
    public bps: BreakpointService,
    public du: DataUtilService,
    private loader: LoadService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.hwOld = Object.assign({}, this.hw);
  }

  async save() {
    if (!this.shouldSave) return false;

    this.form.form.markAllAsTouched();

    if (
      !this.form.valid ||
      JSON.stringify(this.hw) == JSON.stringify(this.hwOld)
    )
      return false;
    this.hwOld = Object.assign({}, this.hw);

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

  setCompleted(evt: MatCheckboxChange) {
    if (evt.checked) {
      this.hw.completed[this.auth.userData.uid] = moment();
    } else {
      delete this.hw.completed[this.auth.userData.uid];
    }
    this.save();
  }

  private async saveHomework() {
    this.loader.load('save');

    this.du.hw.save(this.hw);

    this.loader.unload('save');
  }
}

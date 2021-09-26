import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppointmentModel } from 'src/app/models/objectives/appointment.model';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { DataUtilService } from 'src/app/services/data-util/data-util.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { LoadService } from 'src/libraries/loading/services/load.service';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';
import { LocalizationService } from 'src/libraries/util/services/localization.service';

@Component({
  selector: 'ap-detail',
  templateUrl: './ap-detail.component.html',
  styleUrls: ['./ap-detail.component.scss'],
})
export class ApDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('form') form: NgForm;
  @Input('appointment') ap = {} as AppointmentModel;
  @Input() shouldSave: boolean = true;

  private wasSaveAborted = false;
  private apOld: AppointmentModel;

  constructor(
    public gv: GlobalVariablesService,
    public lang: LocalizationService,
    public userData: UserDataService,
    public bps: BreakpointService,
    private du: DataUtilService,
    private loader: LoadService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!this.ap?.groupId) this.ap.groupId = this.userData.groupId;
    this.cd.detectChanges();
  }

  ngAfterViewInit() {
    this.apOld = Object.assign({}, this.ap);
  }

  async save() {
    if (!this.shouldSave) return false;

    this.form.form.markAllAsTouched();

    if (
      !this.form.valid ||
      JSON.stringify(this.ap) == JSON.stringify(this.apOld)
    )
      return false;
    this.apOld = Object.assign({}, this.ap);

    if (this.loader.finished('save')) {
      await this.saveGrade();
      if (this.wasSaveAborted) {
        this.save();
        this.wasSaveAborted = false;
      }
    } else {
      this.wasSaveAborted = true;
    }
  }

  private async saveGrade() {
    this.loader.load('save');

    this.du.ap.save(this.ap);

    this.loader.unload('save');
  }
}

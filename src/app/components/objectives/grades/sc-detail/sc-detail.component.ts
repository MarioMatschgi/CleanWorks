import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { GradeModel, ScoreType } from 'src/app/models/objectives/grade.model';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { DataUtilService } from 'src/app/services/data-util/data-util.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { LoadService } from 'src/libraries/loading/services/load.service';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';
import { LocalizationService } from 'src/libraries/util/services/localization.service';

@Component({
  selector: 'sc-detail',
  templateUrl: './sc-detail.component.html',
  styleUrls: ['./sc-detail.component.scss'],
})
export class ScDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('form') form: NgForm;
  @Input('score') sc = {} as GradeModel;
  @Input() shouldSave: boolean = true;

  types: string[] = [];
  marks = [1, 2, 3, 4, 5, 6];

  private wasSaveAborted = false;
  private scOld: GradeModel;

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
    for (const type of Object.keys(ScoreType)) {
      this.types.push(type);
    }
  }

  ngAfterViewInit() {
    this.scOld = Object.assign({}, this.sc);
  }

  async save() {
    if (!this.shouldSave) return false;

    this.form.form.markAllAsTouched();

    if (
      !this.form.valid ||
      JSON.stringify(this.sc) == JSON.stringify(this.scOld)
    )
      return false;
    this.scOld = Object.assign({}, this.sc);

    if (this.loader.finished('save')) {
      await this.saveGroup();
      if (this.wasSaveAborted) {
        this.save();
        this.wasSaveAborted = false;
      }
    } else {
      this.wasSaveAborted = true;
    }
  }

  private async saveGroup() {
    this.loader.load('save');

    this.du.sc.save(this.sc);

    this.loader.unload('save');
  }
}

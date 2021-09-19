import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { GroupModel } from 'src/app/models/objectives/group.model';
import { DataUtilService } from 'src/app/services/data-util/data-util.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { LoadService } from 'src/libraries/loading/services/load.service';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';

@Component({
  selector: 'gr-detail',
  templateUrl: './gr-detail.component.html',
  styleUrls: ['./gr-detail.component.scss'],
})
export class GrDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('form') form: NgForm;
  @Input('group') gr: GroupModel = {} as GroupModel;
  @Input() shouldSave: boolean = true;

  private wasSaveAborted = false;
  private grOld: GroupModel;

  constructor(
    public gv: GlobalVariablesService,
    public userData: UserDataService,
    private du: DataUtilService,
    private loader: LoadService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.grOld = Object.assign({}, this.gr);
  }

  async save() {
    if (!this.shouldSave) return false;

    this.form.form.markAllAsTouched();

    if (
      !this.form.valid ||
      JSON.stringify(this.gr) == JSON.stringify(this.grOld)
    )
      return false;
    this.grOld = Object.assign({}, this.gr);

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

    this.du.gr.save(this.gr);

    this.loader.unload('save');
  }
}

import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ScoreModel, ScoreType } from 'src/app/models/objectives/score.model';
import { DataUtilService } from 'src/app/services/data-util/data-util.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { LoadService } from 'src/libraries/loading/services/load.service';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';

@Component({
  selector: 'sc-detail',
  templateUrl: './sc-detail.component.html',
  styleUrls: ['./sc-detail.component.scss'],
})
export class ScDetailComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  @Input('score') sc = {} as ScoreModel;
  @Input() shouldSave: boolean = true;

  types: string[] = [];
  marks = [1, 2, 3, 4, 5, 6];

  @Output() scChange = new EventEmitter<ScoreModel>();

  private wasSaveAborted = false;

  constructor(
    public gv: GlobalVariablesService,
    public userData: UserDataService,
    private du: DataUtilService,
    private loader: LoadService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    for (const type of Object.keys(ScoreType)) {
      this.types.push(type);
    }
  }

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
      this.du.sc.save(this.sc);

      this.scChange.emit(this.sc);
    } else {
      this.sc.date = this.sc.date?.set({ second: 0, millisecond: 0 });

      this.cd.detectChanges();
      this.scChange.emit(this.sc);
    }
    this.loader.unload('save');
  }
}

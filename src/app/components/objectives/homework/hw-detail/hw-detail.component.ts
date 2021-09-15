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
import { MatCheckboxChange } from '@angular/material/checkbox';
import * as moment from 'moment';
import { HomeworkModel } from 'src/app/models/objectives/homework.model';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { DataUtilService } from 'src/app/services/data-util/data-util.service';
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

  private wasSaveAborted = false;

  constructor(
    public userData: UserDataService,
    public bps: BreakpointService,
    private du: DataUtilService,
    private loader: LoadService,
    private cd: ChangeDetectorRef
  ) {}

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

  setCompleted(evt: MatCheckboxChange) {
    this.hw.completed = evt.checked ? moment() : null;
    this.save();
  }

  private async saveHomework() {
    this.loader.load('save');
    if (this.shouldSave) {
      this.du.hw.save(this.hw);

      this.hwChange.emit(this.hw);
    } else {
      this.hw.dueDate = this.hw.dueDate?.set({ second: 0, millisecond: 0 });

      this.cd.detectChanges();
      this.hwChange.emit(this.hw);
    }
    this.loader.unload('save');
  }
}

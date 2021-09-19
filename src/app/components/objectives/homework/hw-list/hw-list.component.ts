import { BreakpointObserver } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import * as moment from 'moment';
import { HomeworkModel } from 'src/app/models/objectives/homework.model';
import { DataUtilService } from 'src/app/services/data-util/data-util.service';
import { MatTableBaseComponent } from 'src/libraries/util/components/mat-table-base.component';
import { LocalizationService } from 'src/libraries/util/services/localization.service';

@Component({
  selector: 'hw-list',
  templateUrl: './hw-list.component.html',
  styleUrls: ['./hw-list.component.scss'],
})
export class HwListComponent
  extends MatTableBaseComponent<HomeworkModel>
  implements OnInit, AfterViewInit
{
  displayedColumns = [
    'title',
    'subject',
    'group',
    'dueDate',
    'complete',
    'completed',
    'remove',
  ];
  defaultSort = 'dueDate';
  mobileWidth = '40em';
  k_pageSize = 'hw-list';
  @Input() lid: string;

  get allCompleted(): boolean {
    return (
      this.dataSource.data.find((e) => this.du.hw.isCompleted(e)) == undefined
    );
  }

  constructor(
    public du: DataUtilService,
    public lang: LocalizationService,
    private cd: ChangeDetectorRef,
    bpo: BreakpointObserver
  ) {
    super(bpo);
  }

  ngOnInit(): void {
    this.updateOnTime();
    this.dataSource.sortingDataAccessor = (item, prop) => {
      switch (prop) {
        case 'subject':
          return this.du.sj.getById(item.subjectId)?.title;
        default:
          return item[prop];
      }
    };
  }

  updateOnTime() {
    const now = moment();
    const time = now.seconds() * 1000 + now.milliseconds();

    setTimeout(() => {
      this.cd.detectChanges();
      this.updateOnTime();
    }, 60000 - time + 1000);
  }

  ngAfterViewInit(): void {
    const idx = this.displayedColumns.indexOf(
      this.allCompleted ? 'completed' : 'complete'
    );
    this.displayedColumns.splice(idx, 1);
    this.k_pageSize += this.lid;
    this.loadPageSize();
    this.cd.detectChanges();
  }
}

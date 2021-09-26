import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { AppointmentModel } from 'src/app/models/objectives/appointment.model';
import { CalenderService } from 'src/app/services/calender.service';
import { DataUtilService } from 'src/app/services/data-util/data-util.service';
import { MatTableBaseComponent } from 'src/libraries/util/components/mat-table-base.component';
import { LocalizationService } from 'src/libraries/util/services/localization.service';

@Component({
  selector: 'ap-list',
  templateUrl: './ap-list.component.html',
  styleUrls: ['./ap-list.component.scss'],
})
export class ApListComponent
  extends MatTableBaseComponent<AppointmentModel>
  implements OnInit
{
  displayedColumns = ['title', 'subject', 'date', 'calender', 'remove'];
  defaultSort = 'date';
  defaultSortDir: SortDirection = 'asc';
  mobileWidth = '40em';
  k_pageSize = 'ap-list';

  constructor(
    public du: DataUtilService,
    public lang: LocalizationService,
    public calender: CalenderService,
    bpo: BreakpointObserver
  ) {
    super(bpo);
  }

  ngOnInit(): void {
    this.dataSource.sortingDataAccessor = (item, prop) => {
      switch (prop) {
        case 'subject':
          return this.du.sj.getById(item.subjectId, item.groupId)?.title;
        default:
          return item[prop];
      }
    };
  }
}

import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { GradeModel } from 'src/app/models/objectives/grade.model';
import { DataUtilService } from 'src/app/services/data-util/data-util.service';
import { MatTableBaseComponent } from 'src/libraries/util/components/mat-table-base.component';
import { LocalizationService } from 'src/libraries/util/services/localization.service';

@Component({
  selector: 'sc-list',
  templateUrl: './sc-list.component.html',
  styleUrls: ['./sc-list.component.scss'],
})
export class ScListComponent
  extends MatTableBaseComponent<GradeModel>
  implements OnInit
{
  displayedColumns = ['subject', 'type', 'mark', 'score', 'date', 'remove'];
  defaultSort = 'date';
  defaultSortDir: SortDirection = 'desc';
  mobileWidth = '30em';
  k_pageSize = 'sc-list';

  constructor(
    public du: DataUtilService,
    public lang: LocalizationService,
    bpo: BreakpointObserver
  ) {
    super(bpo);
  }

  ngOnInit(): void {
    this.dataSource.sortingDataAccessor = (item, prop) => {
      switch (prop) {
        case 'score':
          return item.score / item.scoreMax;
        case 'subject':
          return this.du.sj.getById(item.subjectId)?.title;
        default:
          return item[prop];
      }
    };
  }
}

import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { GradeModel } from 'src/app/models/objectives/grade.model';
import { DataUtilService } from 'src/app/services/data-util/data-util.service';
import { MatTableBaseComponent } from 'src/libraries/util/components/mat-table-base.component';

@Component({
  selector: 'sc-list',
  templateUrl: './sc-list.component.html',
  styleUrls: ['./sc-list.component.scss'],
})
export class ScListComponent
  extends MatTableBaseComponent<GradeModel>
  implements OnInit
{
  displayedColumns = ['subject', 'type', 'mark', 'score', 'remove'];
  mobileWidth = '30em';

  constructor(public du: DataUtilService, bpo: BreakpointObserver) {
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

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

  constructor(public du: DataUtilService) {
    super();
  }

  ngOnInit(): void {
    this.dataSource.sortingDataAccessor = (item, prop) => {
      switch (prop) {
        case 'score':
          return item.score / item.scoreMax;

        default:
          return item[prop];
      }
    };
  }
}

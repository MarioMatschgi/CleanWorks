import { Component, OnInit } from '@angular/core';
import { ScoreModel } from 'src/app/models/objectives/score.model';
import { DataUtilService } from 'src/app/services/data-util/data-util.service';
import { MatTableBaseComponent } from 'src/libraries/util/components/mat-table-base.component';

@Component({
  selector: 'sc-list',
  templateUrl: './sc-list.component.html',
  styleUrls: ['./sc-list.component.scss'],
})
export class ScListComponent
  extends MatTableBaseComponent<ScoreModel>
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

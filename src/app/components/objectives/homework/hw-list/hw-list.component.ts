import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { HomeworkModel } from 'src/app/models/objectives/homework.model';
import {
  DataLoadService,
  LoaderServices,
} from 'src/app/services/data-load.service';
import { DialogService } from 'src/app/services/dialog.service';
import {
  MessageType,
  SnackbarService,
} from 'src/app/services/snackbar.service';
import { MatTableBaseComponent } from 'src/libraries/util/components/mat-table-base.component';
import { HwDetailDialogComponent } from '../hw-detail-dialog/hw-detail-dialog.component';

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
    'dueDate',
    'complete',
    'completed',
    'remove',
  ];
  defaultSort = 'dueDate';

  get allCompleted(): boolean {
    return this.dataSource.data.find((e) => e.completed !== null) === undefined;
  }

  constructor(
    private dialog: DialogService,
    private dataLoader: DataLoadService<HomeworkModel>,
    private dialogService: DialogService,
    private snackbar: SnackbarService
  ) {
    super();
    dataLoader.loaderType = LoaderServices.homework;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const idx = this.displayedColumns.indexOf(
      this.allCompleted ? 'completed' : 'complete'
    );
    this.displayedColumns.splice(idx, 1);
  }

  async completeHomework(hw: HomeworkModel, evt?: PointerEvent) {
    evt?.stopPropagation();

    if (hw.completed != null) hw.completed = null;
    else hw.completed = moment();

    await this.saveSubject(hw);
  }

  async saveSubject(hw: HomeworkModel) {
    await this.dataLoader.updateData(hw);

    this.snackbar.displayTop(`Saved homework "${hw.title}"`, MessageType.Info);
  }

  deleteHomework(hw: HomeworkModel, evt?: PointerEvent) {
    evt?.stopPropagation();

    this.dialogService
      .openDeleteDialog([hw.title])
      .afterClosed()
      .subscribe(async (del) => {
        if (del) {
          await this.dataLoader.removeData(hw);

          this.snackbar.displayTop(
            `Successfully deleted subject "${hw.title}"`,
            MessageType.Info
          );
        }
      });
  }

  viewHomwork(hw: HomeworkModel) {
    this.dialog.dialog.open(HwDetailDialogComponent, {
      data: { homework: hw },
    });
  }

  isOverDue(hw: HomeworkModel) {
    return !hw.completed && moment().diff(hw.dueDate) > 0;
  }
}

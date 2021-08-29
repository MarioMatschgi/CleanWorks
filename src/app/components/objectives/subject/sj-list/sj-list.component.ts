import { Component, Input, OnInit } from '@angular/core';
import { SubjectModel } from 'src/app/models/objectives/subject.model';
import {
  DataLoadService,
  LoaderServices,
} from 'src/app/services/data-load.service';
import { DialogService } from 'src/app/services/dialog.service';
import {
  MessageType,
  SnackbarService,
} from 'src/app/services/snackbar.service';

@Component({
  selector: 'sj-list',
  templateUrl: './sj-list.component.html',
  styleUrls: ['./sj-list.component.scss'],
})
export class SjListComponent implements OnInit {
  @Input() subjects: SubjectModel[];

  constructor(
    private dialogService: DialogService,
    private dataLoader: DataLoadService<SubjectModel>,
    private snackbar: SnackbarService
  ) {
    dataLoader.loaderType = LoaderServices.subject;
  }

  ngOnInit(): void {}

  async saveSubject(subject: SubjectModel) {
    await this.dataLoader.updateData(subject);

    this.snackbar.displayTop(
      `Saved subject "${subject.title}"`,
      MessageType.Info
    );
  }

  deleteSubject(subject: SubjectModel) {
    this.dialogService
      .openDeleteDialog([subject.title])
      .afterClosed()
      .subscribe(async (del) => {
        if (del) {
          await this.dataLoader.removeData(subject);

          this.snackbar.displayTop(
            `Successfully deleted subject "${subject.title}"`,
            MessageType.Info
          );
        }
      });
  }
}

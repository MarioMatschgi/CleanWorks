import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';
import { LocalizationService } from 'src/libraries/util/services/localization.service';
import { ScNewDialogComponent } from './sc-new-dialog/sc-new-dialog.component';

@Component({
  selector: 'grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss'],
})
export class GradesComponent implements OnInit {
  constructor(
    private dialogService: DialogService,
    public lang: LocalizationService,
    public userData: UserDataService,
    public gv: GlobalVariablesService
  ) {}

  ngOnInit(): void {}

  addNew() {
    this.dialogService.dialog.open(ScNewDialogComponent);
  }

  get subjectsWithGrades() {
    return this.userData.data.subjects.filter((s) =>
      this.userData.grades.find((g) => g.subjectId === s.id)
    );
  }
}

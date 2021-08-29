import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';
import { SjNewDialogComponent } from './sj-new-dialog/sj-new-dialog.component';

@Component({
  selector: 'subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
})
export class SubjectsComponent implements OnInit {
  constructor(
    private dialogService: DialogService,
    public userData: UserDataService,
    public gv: GlobalVariablesService
  ) {}

  ngOnInit(): void {}

  addNew() {
    this.dialogService.dialog.open(SjNewDialogComponent);
  }
}

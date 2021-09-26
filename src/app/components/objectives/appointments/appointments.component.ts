import { Component, OnInit } from '@angular/core';
import { CalenderService } from 'src/app/services/calender.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';
import { LocalizationService } from 'src/libraries/util/services/localization.service';
import { ApNewDialogComponent } from './ap-new-dialog/ap-new-dialog.component';

@Component({
  selector: 'appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  constructor(
    public gv: GlobalVariablesService,
    public lang: LocalizationService,
    public userData: UserDataService,
    public calender: CalenderService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {}

  newAppointment() {
    this.dialogService.open(ApNewDialogComponent);
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from 'src/material/material.module';
import { UtilModule } from 'src/libraries/util/util.module';
import { HwNewComponent } from './components/objectives/homework/hw-new/hw-new.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DbQuickActionsComponent } from './components/dashboard/db-quick-actions/db-quick-actions.component';
import { DbElementComponent } from './components/card/card.component';
import { DialogStandardComponent } from './components/dialog/dialog-standard/dialog-standard.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { HwNewDialogComponent } from './components/objectives/homework/hw-new-dialog/hw-new-dialog.component';
import { FormsModule } from '@angular/forms';
import { SjNewComponent } from './components/objectives/subject/sj-new/sj-new.component';
import { SjNewDialogComponent } from './components/objectives/subject/sj-new-dialog/sj-new-dialog.component';
import { AuthenticationModule } from 'src/libraries/authentication/authentication.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HomeworkComponent } from './components/objectives/homework/homework.component';
import { AppointmentsComponent } from './components/objectives/appointments/appointments.component';
import { GroupsComponent } from './components/objectives/groups/groups.component';
import { SubjectsComponent } from './components/objectives/subject/subjects.component';
import { HwDashboardComponent } from './components/objectives/homework/hw-dashboard/hw-dashboard.component';
import { SjListComponent } from './components/objectives/subject/sj-list/sj-list.component';
import { DeleteDialogComponent } from './components/dialog/delete-dialog/delete-dialog.component';
import { HwListComponent } from './components/objectives/homework/hw-list/hw-list.component';
import { HwDetailComponent } from './components/objectives/homework/hw-detail/hw-detail.component';
import { HwDetailDialogComponent } from './components/objectives/homework/hw-detail-dialog/hw-detail-dialog.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { NormalDatePipe } from './pipes/normal-date.pipe';
import { GradesComponent } from './components/objectives/grades/grades.component';
import { GrNewComponent } from './components/objectives/groups/gr-new/gr-new.component';
import { GrNewDialogComponent } from './components/objectives/groups/gr-new-dialog/gr-new-dialog.component';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  declarations: [
    AppComponent,
    HwNewComponent,
    DashboardComponent,
    DbQuickActionsComponent,
    DbElementComponent,
    DialogStandardComponent,
    HwNewDialogComponent,
    SjNewComponent,
    SjNewDialogComponent,
    HomeworkComponent,
    AppointmentsComponent,
    GroupsComponent,
    SubjectsComponent,
    HwDashboardComponent,
    SjListComponent,
    DeleteDialogComponent,
    HwListComponent,
    HwDetailComponent,
    HwDetailDialogComponent,
    NormalDatePipe,
    GradesComponent,
    GrNewComponent,
    GrNewDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),

    /* LIBRARIES */
    UtilModule,
    AuthenticationModule,

    /* MATERIAL */
    MaterialModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
    ClipboardModule,

    /* */
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { panelClass: 'mat-dialog-override' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

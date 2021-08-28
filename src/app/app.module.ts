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
import { DbElementComponent } from './components/dashboard/db-element/db-element.component';
import { DialogStandardComponent } from './components/dialog/dialog-standard/dialog-standard.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { HwNewDialogComponent } from './components/objectives/homework/hw-new-dialog/hw-new-dialog.component';
import { FormsModule } from '@angular/forms';
import { SjNewComponent } from './components/objectives/subject/sj-new/sj-new.component';
import { SjNewDialogComponent } from './components/objectives/subject/sj-new-dialog/sj-new-dialog.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,

    /* LIBRARIES */
    UtilModule,

    /* MATERIAL */
    MaterialModule,

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

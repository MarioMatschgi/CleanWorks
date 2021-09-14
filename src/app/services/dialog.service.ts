import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/dialog/confirm-dialog/confirm-dialog.component';
import { DeleteDialogComponent } from '../components/dialog/delete-dialog/delete-dialog.component';
import {
  DialogStandardComponent,
  DialogStandardData,
} from '../components/dialog/dialog-standard/dialog-standard.component';

export interface DialogData {
  title: string;
  component?: ComponentType<unknown>;
  config?: MatDialogConfig<any>;
}

export interface DialogButtonData {
  text: string;
  action?: () => void;
  shouldClose: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  openDialog(toOpen: ComponentType<unknown>, data: DialogData) {
    const cfg = data.config || ({} as MatDialogConfig<any>);
    cfg.data = data;

    cfg.hasBackdrop = true;

    cfg.data.component = toOpen;
    return this.dialog.open(DialogStandardComponent, cfg);
  }

  openStandardDialog(toOpen: ComponentType<unknown>, data: DialogStandardData) {
    return this.openDialog(toOpen, data);
  }

  openConfirmationDialog(title: string, description: string, color: string) {
    return this.dialog.open(ConfirmDialogComponent, {
      data: { title: title, description: description, color: color },
    });
  }
  openDeleteDialog(items: string[]) {
    return this.dialog.open(DeleteDialogComponent, { data: { items: items } });
  }
}

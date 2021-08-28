import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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

    cfg.data.component = toOpen;
    return this.dialog.open(DialogStandardComponent, cfg);
  }

  openStandardDialog(toOpen: ComponentType<unknown>, data: DialogStandardData) {
    this.openDialog(toOpen, data);
  }
}

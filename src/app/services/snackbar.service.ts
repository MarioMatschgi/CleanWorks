import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export enum MessageType {
  Unknown = 0,
  Success = 1,
  Info = 2,
  Warning = 3,
  Error = 4,
}

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private standardAutoHideTime = 5000;

  constructor(private _snackBar: MatSnackBar) {}

  displayTop(
    msg: string,
    type: MessageType,
    autoHideTime: number = this.standardAutoHideTime
  ) {
    this._snackBar.open(msg, 'X', {
      duration: autoHideTime,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: `message-${this._getMessageCssClass(type)}`,
    });
  }

  private _getMessageCssClass(type: MessageType): string {
    switch (type) {
      case MessageType.Success:
        return 'success';
      case MessageType.Warning:
        return 'warning';
      case MessageType.Error:
        return 'danger';
      case MessageType.Info:
        return 'info';
      default:
        return 'success';
    }
  }
}

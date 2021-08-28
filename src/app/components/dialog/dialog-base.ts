import {
  AfterViewInit,
  ComponentRef,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ComponentAddService } from 'src/app/services/component-add.service';
import { DialogButtonData, DialogData } from 'src/app/services/dialog.service';
import { DialogStandardComponent } from './dialog-standard/dialog-standard.component';

@Injectable()
export class DialogBase<T extends DialogData> implements AfterViewInit {
  protected content: ViewContainerRef;

  constructor(
    public dialogRef: MatDialogRef<DialogStandardComponent>,
    protected componentAddService: ComponentAddService,
    public data: T
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.componentAddService.addComponentToDOM(
        this.data.component,
        this.content
      );
    });
  }

  handleButtonClick(data: DialogButtonData) {
    if (data.action) data.action();
    if (data.shouldClose) {
      this.dialogRef.close();
    }
  }
}

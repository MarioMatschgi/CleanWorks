import { ComponentAddService } from './../../../services/component-add.service';
import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogButtonData, DialogData } from 'src/app/services/dialog.service';
import { DialogBase } from '../dialog-base';

export interface DialogStandardData extends DialogData {
  buttons?: DialogButtonData[];
}

@Component({
  selector: 'dialog-standard',
  templateUrl: './dialog-standard.component.html',
  styleUrls: ['./dialog-standard.component.scss'],
})
export class DialogStandardComponent
  extends DialogBase<DialogStandardData>
  implements OnInit
{
  @ViewChild('content', { read: ViewContainerRef }) content: ViewContainerRef;

  constructor(
    dialogRef: MatDialogRef<DialogStandardComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    componentAddService: ComponentAddService
  ) {
    super(dialogRef, componentAddService, data);
  }

  ngOnInit(): void {}
}

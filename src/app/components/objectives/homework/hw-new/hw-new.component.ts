import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HomeworkModel } from 'src/app/models/objectives/homework.model';

@Component({
  selector: 'hw-new',
  templateUrl: './hw-new.component.html',
  styleUrls: ['./hw-new.component.scss'],
})
export class HwNewComponent implements OnInit {
  @ViewChild('form') form: NgForm;

  data = {} as HomeworkModel;

  get valid(): boolean {
    return this.form?.valid;
  }

  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubjectModel } from 'src/app/models/objectives/subject.model';

@Component({
  selector: 'sj-new',
  templateUrl: './sj-new.component.html',
  styleUrls: ['./sj-new.component.scss'],
})
export class SjNewComponent implements OnInit {
  @ViewChild('form') form: NgForm;

  data = {} as SubjectModel;

  constructor() {}

  ngOnInit(): void {}
}

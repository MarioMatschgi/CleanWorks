import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubjectModel } from 'src/app/models/objectives/subject.model';
import {
  DataLoadService,
  LoaderServices,
} from 'src/app/services/data-load.service';

@Component({
  selector: 'sj-new',
  templateUrl: './sj-new.component.html',
  styleUrls: ['./sj-new.component.scss'],
})
export class SjNewComponent implements OnInit {
  @ViewChild('form') form: NgForm;

  data = {} as SubjectModel;

  constructor(private dataLoader: DataLoadService<SubjectModel>) {
    this.dataLoader.loaderType = LoaderServices.subject;
  }

  ngOnInit(): void {}

  async addNew() {
    this.form.form.markAllAsTouched();

    if (!this.form.valid) return false;

    await this.dataLoader.addData(this.data);

    return true;
  }
}

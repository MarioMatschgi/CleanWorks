import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubjectModel } from 'src/app/models/objectives/subject.model';
import { DataUtilService } from 'src/app/services/data-util/data-util.service';
import { LocalizationService } from 'src/libraries/util/services/localization.service';

@Component({
  selector: 'sj-new',
  templateUrl: './sj-new.component.html',
  styleUrls: ['./sj-new.component.scss'],
})
export class SjNewComponent implements OnInit {
  @ViewChild('form') form: NgForm;

  data = {} as SubjectModel;

  constructor(public du: DataUtilService, public lang: LocalizationService) {}

  ngOnInit(): void {}

  async addNew() {
    this.form.form.markAllAsTouched();

    if (!this.form.valid) return false;

    await this.du.sj.add(this.data);

    return true;
  }
}

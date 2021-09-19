import { Component, OnInit, ViewChild } from '@angular/core';
import { DataUtilService } from 'src/app/services/data-util/data-util.service';
import { GrDetailComponent } from '../gr-detail/gr-detail.component';

@Component({
  selector: 'gr-new',
  templateUrl: './gr-new.component.html',
  styleUrls: ['./gr-new.component.scss'],
})
export class GrNewComponent implements OnInit {
  @ViewChild('grDetail') grDetail: GrDetailComponent;

  constructor(public du: DataUtilService) {}

  ngOnInit(): void {}

  async addNew() {
    this.grDetail.form.form.markAllAsTouched();

    if (!this.grDetail.form.valid) return false;

    await this.du.gr.add(this.grDetail.gr);

    return true;
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { DataUtilService } from 'src/app/services/data-util/data-util.service';
import { ApDetailComponent } from '../ap-detail/ap-detail.component';

@Component({
  selector: 'ap-new',
  templateUrl: './ap-new.component.html',
  styleUrls: ['./ap-new.component.scss'],
})
export class ApNewComponent implements OnInit {
  @ViewChild('apDetail') apDetail: ApDetailComponent;

  constructor(public du: DataUtilService) {}

  ngOnInit(): void {}

  async addNew() {
    this.apDetail.form.form.markAllAsTouched();

    if (!this.apDetail.form.valid) return false;

    await this.du.ap.add(this.apDetail.ap);

    return true;
  }
}

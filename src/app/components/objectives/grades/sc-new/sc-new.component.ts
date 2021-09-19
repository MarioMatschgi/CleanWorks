import { Component, OnInit, ViewChild } from '@angular/core';
import { DataUtilService } from 'src/app/services/data-util/data-util.service';
import { ScDetailComponent } from '../sc-detail/sc-detail.component';

@Component({
  selector: 'sc-new',
  templateUrl: './sc-new.component.html',
  styleUrls: ['./sc-new.component.scss'],
})
export class ScNewComponent implements OnInit {
  @ViewChild('scDetail') scDetail: ScDetailComponent;

  constructor(public du: DataUtilService) {}

  ngOnInit(): void {}

  async addNew() {
    this.scDetail.form.form.markAllAsTouched();

    if (!this.scDetail.form.valid) return false;

    await this.du.sc.add(this.scDetail.sc);

    return true;
  }
}

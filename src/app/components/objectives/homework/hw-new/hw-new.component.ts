import { Component, OnInit, ViewChild } from '@angular/core';
import { DataUtilService } from 'src/app/services/data-util/data-util.service';
import { HwDetailComponent } from '../hw-detail/hw-detail.component';

@Component({
  selector: 'hw-new',
  templateUrl: './hw-new.component.html',
  styleUrls: ['./hw-new.component.scss'],
})
export class HwNewComponent implements OnInit {
  @ViewChild('hwDetail') hwDetail: HwDetailComponent;

  get valid(): boolean {
    return this.hwDetail.form?.valid;
  }

  constructor(public du: DataUtilService) {}

  ngOnInit(): void {}

  async addNew() {
    this.hwDetail.form.form.markAllAsTouched();

    if (!this.hwDetail.form.valid) return false;

    await this.du.hw.add(this.hwDetail.hw);

    return true;
  }
}

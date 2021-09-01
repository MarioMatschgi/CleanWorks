import { Component, OnInit, ViewChild } from '@angular/core';
import { HwDataLoadService } from 'src/app/services/data-load/hw-data-load.service';
import { UserDataService } from 'src/app/services/user-data.service';
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

  constructor(
    public userData: UserDataService,
    private dataLoader: HwDataLoadService
  ) {}

  ngOnInit(): void {}

  async addNew() {
    this.hwDetail.form.form.markAllAsTouched();

    if (!this.hwDetail.form.valid) return false;

    await this.dataLoader.addData(this.hwDetail.hw);

    return true;
  }
}

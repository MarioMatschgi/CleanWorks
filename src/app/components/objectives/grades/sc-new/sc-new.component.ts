import { Component, OnInit, ViewChild } from '@angular/core';
import { ScDataLoadService } from 'src/app/services/data-load/sc-data-load.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { ScDetailComponent } from '../sc-detail/sc-detail.component';

@Component({
  selector: 'sc-new',
  templateUrl: './sc-new.component.html',
  styleUrls: ['./sc-new.component.scss'],
})
export class ScNewComponent implements OnInit {
  @ViewChild('scDetail') scDetail: ScDetailComponent;

  get valid(): boolean {
    return this.scDetail.form?.valid;
  }

  constructor(
    public userData: UserDataService,
    private dataLoader: ScDataLoadService
  ) {}

  ngOnInit(): void {}

  async addNew() {
    this.scDetail.form.form.markAllAsTouched();

    if (!this.scDetail.form.valid) return false;

    await this.dataLoader.addData(this.scDetail.sc);

    return true;
  }
}

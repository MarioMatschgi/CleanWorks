import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  GroupMemberModel,
  GroupMemberRole,
  GroupModel,
} from 'src/app/models/objectives/group.model';
import { GrDataLoadService } from 'src/app/services/data-load/group-data-load.service';
import { AuthService } from 'src/libraries/authentication/services/auth.service';
import { GrDetailComponent } from '../gr-detail/gr-detail.component';

@Component({
  selector: 'gr-new',
  templateUrl: './gr-new.component.html',
  styleUrls: ['./gr-new.component.scss'],
})
export class GrNewComponent implements OnInit {
  @ViewChild('grDetail') grDetail: GrDetailComponent;

  constructor(
    private dataLoader: GrDataLoadService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  async addNew() {
    this.grDetail.form.form.markAllAsTouched();

    if (!this.grDetail.form.valid) return false;

    this.grDetail.gr.memberIds = [this.auth.userData.uid];
    this.grDetail.gr.members = [
      {
        id: this.auth.userData.uid,
        name: this.auth.userData.displayName,
        email: this.auth.userData.email,
        role: GroupMemberRole.admin,
      },
    ];
    await this.dataLoader.addData(this.grDetail.gr);

    return true;
  }
}

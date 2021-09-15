import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';
import { RouterService } from 'src/libraries/util/services/router.service';
import { GrNewDialogComponent } from '../../objectives/groups/gr-new-dialog/gr-new-dialog.component';

@Component({
  selector: 'tb-groups',
  templateUrl: './tb-groups.component.html',
  styleUrls: ['./tb-groups.component.scss'],
})
export class TbGroupsComponent implements OnInit {
  @Input() sidenav;

  constructor(
    public gv: GlobalVariablesService,
    public router: RouterService,
    public dialog: DialogService,
    public userData: UserDataService
  ) {}

  ngOnInit(): void {}

  newGroup() {
    this.dialog.dialog.open(GrNewDialogComponent);
  }
}

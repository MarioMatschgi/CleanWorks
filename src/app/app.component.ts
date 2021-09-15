import { Component } from '@angular/core';
import { AuthService } from 'src/libraries/authentication/services/auth.service';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';
import { RouterService } from 'src/libraries/util/services/router.service';
import { GrNewDialogComponent } from './components/objectives/groups/gr-new-dialog/gr-new-dialog.component';
import { BackgroundScrollService } from './services/background-scroll.service';
import { DialogService } from './services/dialog.service';
import { UserDataService } from './services/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public gv: GlobalVariablesService,
    public auth: AuthService,
    public router: RouterService,
    public dialog: DialogService,
    public userData: UserDataService,
    private bgScroll: BackgroundScrollService
  ) {}

  newGroup() {
    this.dialog.dialog.open(GrNewDialogComponent);
  }
}

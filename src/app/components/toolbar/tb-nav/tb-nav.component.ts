import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { Icons } from 'src/libraries/util/models/icons.model';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';
import { LocalizationService } from 'src/libraries/util/services/localization.service';
import { RouterService } from 'src/libraries/util/services/router.service';

@Component({
  selector: 'tb-nav',
  templateUrl: './tb-nav.component.html',
  styleUrls: ['./tb-nav.component.scss'],
})
export class TbNavComponent implements AfterViewInit {
  @Input() sidenav;
  items: { url?: string; urlArr?: string[]; content?: string; icon?: Icons }[];

  constructor(
    public gv: GlobalVariablesService,
    public lang: LocalizationService,
    public router: RouterService,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.items = [
      {
        url: 'homework',
        content: this.lang.data.nav.hw,
        icon: this.gv.Icons.book,
      },
      {
        url: 'subjects',
        content: this.lang.data.nav.sj,
        icon: this.gv.Icons.subject,
      },
      {
        urlArr: ['me', 'grades'],
        content: this.lang.data.nav.sc,
        icon: this.gv.Icons.grade,
      },
      {
        url: 'appointments',
        content: this.lang.data.nav.ap,
        icon: this.gv.Icons.calender,
      },
    ];
    if (this.sidenav == null) {
      this.items = [
        {
          url: 'dashboard',
          icon: this.gv.Icons.home,
        },
        ...this.items,
      ];
    }
    this.cd.detectChanges();
  }
}

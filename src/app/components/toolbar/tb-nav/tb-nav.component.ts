import { Component, Input, OnInit } from '@angular/core';
import { Icons } from 'src/libraries/util/models/icons.model';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';
import { RouterService } from 'src/libraries/util/services/router.service';

@Component({
  selector: 'tb-nav',
  templateUrl: './tb-nav.component.html',
  styleUrls: ['./tb-nav.component.scss'],
})
export class TbNavComponent implements OnInit {
  @Input() sidenav;
  items: { url?: string; urlArr?: string[]; content?: string; icon?: Icons }[];

  constructor(
    public gv: GlobalVariablesService,
    public router: RouterService
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        url: 'dashboard',
        icon: this.gv.Icons.home,
      },
      { url: 'homework', content: 'Homework' },
      { url: 'subjects', content: 'Subjects' },
      { urlArr: ['me', 'grades'], content: 'Grades' },
      { url: 'appointments', content: 'Appointments' },
    ];
  }
}

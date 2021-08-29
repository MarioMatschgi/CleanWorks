import { Component, Input, OnInit } from '@angular/core';
import { Icons } from 'src/libraries/util/models/icons.model';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class DbElementComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() icon: Icons;
  @Input() link: string[];

  constructor(public gv: GlobalVariablesService) {}

  ngOnInit(): void {}
}

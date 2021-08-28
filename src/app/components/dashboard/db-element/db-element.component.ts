import { Component, Input, OnInit } from '@angular/core';
import { Icons } from 'src/libraries/util/models/icons.model';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';

@Component({
  selector: 'db-element',
  templateUrl: './db-element.component.html',
  styleUrls: ['./db-element.component.scss'],
})
export class DbElementComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() icon: Icons;

  constructor(public gv: GlobalVariablesService) {}

  ngOnInit(): void {}
}

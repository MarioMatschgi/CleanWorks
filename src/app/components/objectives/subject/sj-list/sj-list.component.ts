import { Component, Input, OnInit } from '@angular/core';
import { SubjectModel } from 'src/app/models/objectives/subject.model';
import { DataUtilService } from 'src/app/services/data-util/data-util.service';

@Component({
  selector: 'sj-list',
  templateUrl: './sj-list.component.html',
  styleUrls: ['./sj-list.component.scss'],
})
export class SjListComponent implements OnInit {
  @Input() subjects: SubjectModel[];

  constructor(public du: DataUtilService) {}

  ngOnInit(): void {}
}

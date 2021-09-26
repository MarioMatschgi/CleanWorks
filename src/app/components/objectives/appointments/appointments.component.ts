import { Component, OnInit } from '@angular/core';
import { CalenderService } from 'src/app/services/calender.service';

@Component({
  selector: 'appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  constructor(public calender: CalenderService) {}

  ngOnInit(): void {}
}

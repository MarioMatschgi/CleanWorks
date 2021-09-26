import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';

export interface CalenderData {
  prodid: string;
  events: CalenderEventData[];
}
export interface CalenderEventData {
  id: string;
  tStart: Moment;
  tEnd: Moment;
  desc: string;
  lat?: number;
  lon?: number;
  alarms: CalenderAlarmData[];
}
export interface CalenderAlarmData {
  desc: string;
  mins: number;
}

@Injectable({
  providedIn: 'root',
})
export class CalenderService {
  constructor() {}

  newEvent(ap: AppointmentModel) {
    const evt = this.buildEvent({
      prodid: 'Calender',
      events: [
        {
          id: 'AA',
          tStart: moment(),
          tEnd: moment().add(1, 'd'),
          desc: 'Test',
          alarms: [
            { desc: 'LLLLLL', mins: 1440 },
            { desc: 'AAA', mins: 10080 },
          ],
        },
      ],
    });

    window.location.href = 'data:text/calendar;charset=utf8,' + encodeURI(evt);
  }

  private buildEvent(data: CalenderData) {
    let cal = '';
    cal += this.getTxt('BEGIN', 'VCALENDAR');
    cal += this.getTxt('VERSION', '2.0');
    cal += this.getTxt('PRODID', data.prodid);

    // EVENTS
    for (const evt of data.events) {
      cal += this.getTxt('BEGIN', 'VEVENT');
      cal += this.getTxt('UID', evt.id);
      cal += this.getTxt('DTSTAMP', evt.tStart);
      // events += `\nORGANIZER:${evt.id}`;
      cal += this.getTxt('DTSTART', evt.tStart);
      cal += this.getTxt('DTEND', evt.tEnd);
      cal += this.getTxt('SUMMARY', evt.desc);
      if (evt.lat && evt.lon)
        cal += this.getTxt('GEO', `${evt.lat};${evt.lon}`);

      // ALARMS
      for (const al of evt.alarms) {
        cal += this.getTxt('BEGIN', 'VALARM');
        cal += this.getTxt('TRIGGER', `-PT${al.mins}M`);
        cal += this.getTxt('ACTION', 'DISPLAY');
        cal += this.getTxt('DESCRIPTION', al.desc);
        cal += this.getTxt('END', 'VALARM');
      }

      cal += this.getTxt('END', 'VEVENT');
    }

    cal += this.getTxt('END', 'VCALENDAR');

    return cal;
  }

  private getTxt(key: string, val) {
    if (moment.isMoment(val)) {
      return `\n${key}:${val.format('yyyyMMD[T]HHmmss[Z]')}`;
    }
    return `\n${key}:${val}`;
  }
}

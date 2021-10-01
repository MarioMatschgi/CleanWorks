import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { AppointmentModel } from '../models/objectives/appointment.model';

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
  cancelled?: boolean;
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

  event(ap: AppointmentModel) {
    console.log(ap);

    const evt = this.buildEvent({
      prodid: 'Calender_' + ap.id,
      events: [
        {
          id: 'Event_' + ap.id,
          tStart: ap.dateStart,
          tEnd: ap.dateEnd,
          desc: ap.title,
          alarms: [
            { desc: 'Day before', mins: 1440 },
            { desc: 'Week before', mins: 10080 },
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

      if (evt.cancelled == true) {
        cal += this.getTxt('METHOD', 'CANCEL');
        cal += this.getTxt('STATUS', 'CANCELLED');
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

import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { LocalizationService } from 'src/libraries/util/services/localization.service';

@Pipe({
  name: 'normalDate',
})
export class NormalDatePipe extends DatePipe implements PipeTransform {
  constructor(private lang: LocalizationService) {
    super(lang.lang);
  }

  transform(value: any, args?: any): any {
    return super.transform(value, 'EEEE d MMMM y h:mm a', null, this.lang.lang);
  }
}

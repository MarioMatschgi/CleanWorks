import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  navbarMobile: boolean;
  datepickerMobile: boolean;

  constructor(private bpo: BreakpointObserver) {
    bpo.observe('(max-width: 41em)').subscribe((res) => {
      this.navbarMobile = res.matches;
    });
    bpo.observe('(max-width: 38em)').subscribe((res) => {
      this.datepickerMobile = res.matches;
    });
  }
}

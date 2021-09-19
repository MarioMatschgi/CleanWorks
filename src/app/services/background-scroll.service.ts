import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackgroundScrollService {
  html: HTMLHtmlElement;
  top: string;
  bottom: string;

  topOrBottom: 'top' | 'bottom' = 'top';

  constructor() {
    this.html = document.getElementsByTagName('html')[0] as HTMLHtmlElement;
  }

  init() {
    this.setColors();

    this.setColor(this.top);
    window.addEventListener('scroll', () => {
      const pageH = document.getElementsByTagName('body')[0].scrollHeight;
      const isBottom = window.pageYOffset + window.innerHeight / 2 > pageH / 2;

      if (isBottom == (this.topOrBottom == 'bottom')) return;

      this.setColors();
      if (isBottom) {
        this.setColor(this.bottom);
        this.topOrBottom = 'bottom';
      } else {
        this.setColor(this.top);
        this.topOrBottom = 'top';
      }
    });
  }

  private setColors() {
    this.top = getComputedStyle(
      document.getElementsByClassName('mat-toolbar')[0]
    ).backgroundColor;

    this.bottom = getComputedStyle(
      document.getElementsByTagName('body')[0]
    ).getPropertyValue('--col-bg');
  }

  private setColor(col: string) {
    this.html.style.backgroundColor = col;
  }
}

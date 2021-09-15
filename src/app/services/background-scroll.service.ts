import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackgroundScrollService {
  html: HTMLHtmlElement;
  top: string;
  bottom: string;

  constructor() {
    this.html = document.getElementsByTagName('html')[0] as HTMLHtmlElement;

    const s = getComputedStyle(document.documentElement);
    this.top = s.getPropertyValue('--col-blue');
    this.bottom = s.getPropertyValue('--col-white');

    this.setColor(this.top);
    window.addEventListener('scroll', () => {
      const pageH = document.getElementsByTagName('body')[0].scrollHeight;

      if (window.pageYOffset + window.innerHeight / 2 > pageH / 2) {
        this.setColor(this.bottom);
      } else {
        this.setColor(this.top);
      }
    });
  }

  private setColor(col: string) {
    this.html.style.backgroundColor = col;
  }
}

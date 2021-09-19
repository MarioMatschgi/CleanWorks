import { Injectable } from '@angular/core';
import { AuthService } from 'src/libraries/authentication/services/auth.service';

export enum ThemeType {
  auto = 'auto',
  light = 'light',
  dark = 'dark',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme: ThemeType;
  themeList: ThemeType[];

  private body: HTMLBodyElement;

  constructor(private auth: AuthService) {
    this.body = document.getElementsByTagName('body')[0];
    this.themeList = Object.values(ThemeType).slice(1);
    auth.sub_userPrivateData((data) => {
      if (data == null) return;
      this.updateTheme(data.theme);
    });
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        if (this.theme != ThemeType.auto) return;
        this.updateTheme(ThemeType.auto, true);
      });
  }

  updateTheme(t: ThemeType, force = false) {
    t = ThemeType[t];
    if (!force && this.theme == t) return;
    this.theme = t;

    const classes = this.body.classList
      .toString()
      .split(' ')
      .filter((c) => c.startsWith('theme-'));
    for (const c of classes) {
      this.body.classList.remove(c);
    }
    if (this.auth.userData?.uid)
      this.auth.doc_userPrivate.set({ theme: this.theme }, { merge: true });

    if (t == ThemeType.auto) {
      t = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? ThemeType.dark
        : ThemeType.light;
    }

    this.body.classList.add(`theme-${t}`);
  }
}

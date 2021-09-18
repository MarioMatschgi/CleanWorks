import { registerLocaleData } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';
import * as data_en from '../../../app/lang/english.json';
import * as data_de from '../../../app/lang/german.json';
import { AuthService } from '../../authentication/services/auth.service';
import localeGerman from '@angular/common/locales/de';
import localeEnglish from '@angular/common/locales/en';
import * as moment from 'moment';
import { DateAdapter } from '@angular/material/core';

/**
 * Service for Localization
 */
@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  /**
   * Current language
   */
  lang: string;

  /**
   * Current language data
   */
  data: typeof data_en;

  /**
   * Dictionary with all language datas
   */
  langs: { [lang: string]: typeof data_en } = {};

  /**
   * List of all languages
   */
  lang_list: string[];

  langChanged = new EventEmitter<string>();

  constructor(
    private auth: AuthService,
    private dateAdapter: DateAdapter<any>
  ) {
    this.langs['en'] = this.getLangData(data_en);
    this.langs['de'] = this.getLangData(data_de);
    this.lang_list = Object.keys(this.langs);
    this.auth.sub_userPrivateData(() => {
      this.update_lang(this.get_lang());
    });
  }

  /**
   * Updates the language
   * @param lang New language
   */
  update_lang(lang: string) {
    if (this.lang == lang) return;
    this.lang = lang;

    this.auth.doc_userPrivate.set({ lang: this.lang }, { merge: true });

    this.data = this.langs[this.lang] || this.langs['en'];
    lang = this.get_eval_lang(this.lang);
    switch (lang) {
      case 'de':
        registerLocaleData(localeGerman);
        break;

      default:
        registerLocaleData(localeEnglish);
    }
    this.setLang(lang);
    this.langChanged.emit(this.lang);
  }

  private setLang(lang: string) {
    lang = this.get_eval_lang(lang);
    moment.locale(lang);
    this.dateAdapter.setLocale(lang);
  }

  /**
   * Returns the current language
   * @returns Returns the current language
   */
  get_lang(): string {
    return this.auth.userPrivateData?.lang;
  }

  /**
   * Returns the given and evaluated language
   * @param lang Language to evaluate
   * @returns Returns the given and evaluated language
   */
  get_eval_lang(lang: string): string {
    if (!lang || lang == '' || lang == 'auto')
      return window.navigator.language.substr(0, 2);
    return lang;
  }

  /**
   * Fuses the language data with english data for a given language
   * @param data Language data to fuse
   * @returns Returns the language data fused with english data for a given language
   */
  getLangData(data) {
    return {
      ...this.langs['en'],
      ...(data as any).default,
    };
  }
}

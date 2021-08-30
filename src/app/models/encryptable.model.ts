import { Identifiable } from './identifiable.model';
import * as CryptoJS from 'crypto-js';
import { isMoment } from 'moment';
import * as moment from 'moment';

export class Encryptable extends Identifiable {}

/**
 * Encrypts and decrypts every property except the id
 */
export class Endecryptor {
  private static pw = 'AHdajashdgajhdgjGJDASHJADjadjghasjhdg';
  private static prefix_bool = ''; // Backspace, Devicecontrol 1, Backspace
  private static prefix_number = ''; // Devicecontrol 1, Backspace, Devicecontrol 1
  private static prefix_null = ''; // Devicecontrol 1, Backspace, Backspace

  static encryptSingle(str: string): string {
    return CryptoJS.AES.encrypt(str, this.pw).toString();
  }

  static decryptSingle(str: string): string {
    return CryptoJS.AES.decrypt(str, this.pw).toString(CryptoJS.enc.Utf8);
  }

  static encrypt<T extends Encryptable>(data: T): T {
    let d = { ...data };
    for (const key of Object.keys(d)) {
      if (key != 'id') {
        if (Array.isArray(d[key])) {
          d[key] = this.encryptAll(d[key]);
        } else if (isMoment(d[key])) {
          d[key] = this.encryptSingle((d[key] as moment.Moment).toISOString());
        } else if (d[key] instanceof Object) {
          d[key] = this.encrypt(d[key]);
        } else {
          if (d[key] == null || d[key] == undefined)
            d[key] = this.prefix_null + d[key] + this.prefix_null;
          if (typeof d[key] === 'boolean')
            d[key] = this.prefix_bool + d[key] + this.prefix_bool;
          else if (typeof d[key] === 'number')
            d[key] = this.prefix_number + d[key] + this.prefix_number;

          d[key] = this.encryptSingle(d[key] + '');
        }
      }
    }

    return d;
  }

  static decrypt<T extends Encryptable>(data: T): T {
    let d = { ...data };
    for (const key of Object.keys(d)) {
      if (key != 'id') {
        if (Array.isArray(d[key])) {
          d[key] = this.decryptAll(d[key]);
        } else if (d[key] instanceof Object) {
          d[key] = this.decrypt(d[key]);
        } else {
          d[key] = this.decryptSingle(d[key]);
          if (
            d[key].startsWith(this.prefix_null) &&
            d[key].endsWith(this.prefix_null)
          ) {
            d[key] = null;
          } else if (
            d[key].startsWith(this.prefix_bool) &&
            d[key].endsWith(this.prefix_bool)
          ) {
            d[key] = d[key].replaceAll(this.prefix_bool, '') === 'true';
          } else if (
            d[key].startsWith(this.prefix_number) &&
            d[key].endsWith(this.prefix_number)
          ) {
            d[key] = +d[key].replaceAll(this.prefix_number, '');
          } else {
            const tryMoment = moment(d[key], true);
            if (tryMoment.isValid()) {
              d[key] = tryMoment;
            }
          }
        }
      }
    }

    return d;
  }

  static encryptAll<T extends Encryptable>(data: T[]): T[] {
    let d = [...data];
    for (let i = 0; i < d.length; i++) {
      d[i] = this.encrypt(d[i]);
    }

    return d;
  }

  static decryptAll<T extends Encryptable>(data: T[]): T[] {
    let d = [...data];
    for (let i = 0; i < d.length; i++) {
      d[i] = this.decrypt(d[i]);
    }

    return d;
  }
}

import { Injectable } from '@angular/core';
import { HwUtilService } from './hw-util.service';
import { SjUtilService } from './sj-util.service';

@Injectable({
  providedIn: 'root',
})
export class DataUtilService {
  constructor(public hw: HwUtilService, public sj: SjUtilService) {}
}

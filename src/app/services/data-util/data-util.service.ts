import { Injectable } from '@angular/core';
import { GrUtilService } from './gr-util.service';
import { HwUtilService } from './hw-util.service';
import { ScUtilService } from './sc-util.service';
import { SjUtilService } from './sj-util.service';

@Injectable({
  providedIn: 'root',
})
export class DataUtilService {
  constructor(
    public hw: HwUtilService,
    public sj: SjUtilService,
    public gr: GrUtilService,
    public sc: ScUtilService
  ) {}
}

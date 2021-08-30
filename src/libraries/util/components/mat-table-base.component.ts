import { Directive, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Directive()
export class MatTableBaseComponent<T> {
  @Input() set data(d: T[]) {
    this.dataSource.data = d;
  }

  dataSource: MatTableDataSource<T> = new MatTableDataSource();
  displayedColumns: string[];

  @ViewChild(MatSort) protected sort: MatSort;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.dataSource.sort = this.sort;
  }
}

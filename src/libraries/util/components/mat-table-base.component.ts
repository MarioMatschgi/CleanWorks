import { BreakpointObserver } from '@angular/cdk/layout';
import { Directive, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Directive()
export class MatTableBaseComponent<T> {
  @Input() set data(d: T[]) {
    this.dataSource.data = d;
  }

  dataSource: MatTableDataSource<T> = new MatTableDataSource();
  displayedColumns: string[];

  @ViewChild(MatSort) protected sort: MatSort;
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    if (ms == null) {
      return;
    }
    this.sort = ms;
    this.dataSource.sort = this.sort;
    setTimeout(() => {
      this.sortChanged({ active: '', direction: '' });
    });
  }

  defaultSort: string;
  sortChanged(evt: { active: string; direction: string }) {
    if (this.defaultSort === null) return;

    if (evt.direction === '') {
      this.sort.sort({ id: this.defaultSort, start: 'asc' } as MatSortable);
    }
  }

  @ViewChild(MatPaginator) set paginator(p: MatPaginator) {
    this.dataSource.paginator = p;
  }
  pageSizes = [5, 10, 25, 100];
  startPageSize = 10;

  mobileWidth = '600px';

  isMobileTable: boolean;

  constructor(private bpo: BreakpointObserver) {
    setTimeout(() => {
      bpo.observe(`(max-width: ${this.mobileWidth})`).subscribe((res) => {
        this.isMobileTable = res.matches;
      });
    });
  }
}

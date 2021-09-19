import { BreakpointObserver } from '@angular/cdk/layout';
import { Directive, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable, SortDirection } from '@angular/material/sort';
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
  defaultSortDir: SortDirection = 'asc';
  sortChanged(evt: { active: string; direction: string }) {
    if (this.defaultSort === null) return;

    if (evt.direction === '') {
      this.sort.sort({
        id: this.defaultSort,
        start: this.defaultSortDir,
      } as MatSortable);
    }
  }

  @ViewChild(MatPaginator) set paginator(p: MatPaginator) {
    this.dataSource.paginator = p;
  }
  pageSizes = [5, 10, 25, 100];
  private _pageSize = 10;
  get pageSize(): number {
    return this._pageSize;
  }
  set pageSize(size: number) {
    this._pageSize = size;

    if (this.k_pageSize)
      localStorage.setItem(
        `table-page-size-${this.k_pageSize}`,
        size.toString()
      );
  }
  k_pageSize: string;

  mobileWidth = '600px';

  isMobileTable: boolean;

  constructor(private bpo: BreakpointObserver) {
    setTimeout(() => {
      bpo.observe(`(max-width: ${this.mobileWidth})`).subscribe((res) => {
        this.isMobileTable = res.matches;
      });
      this.loadPageSize();
    });
  }

  loadPageSize() {
    if (this.k_pageSize) {
      this._pageSize =
        +localStorage.getItem(`table-page-size-${this.k_pageSize}`) ||
        this._pageSize;
    }
  }
}

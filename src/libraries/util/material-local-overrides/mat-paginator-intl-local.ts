import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { LocalizationService } from '../services/localization.service';

@Injectable()
export class MatPaginatorIntlLocal extends MatPaginatorIntl {
  getRangeLabel = function (page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return `0 ${this.lang.data.material.paginator.of} ` + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} ${
      this.lang.data.material.paginator.of
    } ${length}`;
  };

  constructor(private lang: LocalizationService) {
    super();
    this.lang.langChanged.subscribe((l) => this.updateLabels());
    this.updateLabels();
  }
  private updateLabels() {
    this.itemsPerPageLabel = this.lang.data.material.paginator.items_per_page;
    this.nextPageLabel = this.lang.data.material.paginator.nex_page;
    this.previousPageLabel = this.lang.data.material.paginator.previous_page;
  }
}

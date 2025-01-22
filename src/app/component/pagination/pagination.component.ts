import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() totalCount: number = 0; // Total number of items
  @Input() countsPerPageOptions: number[] = [5, 10, 20, 50]; // Dropdown options for items per page
  @Output() pageChanged = new EventEmitter<number>(); // Emit page changes
  @Output() countPerPageChanged = new EventEmitter<number>();

  countPerPage: number = 10; // Default items per page
  currentPage: number = 1; // Current active page
  totalPages: number = 0; // Total number of pages

  ngOnInit() {
    this.updatePagination();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalCount']) {
      this.updatePagination(); // Call updatePagination() whenever totalCount changes
    }
  }

  // Update total pages when countPerPage changes
  updatePagination() {
    this.totalPages = Math.ceil(this.totalCount / this.countPerPage);
    this.currentPage = Math.min(this.currentPage, this.totalPages); // Adjust if totalPages decreases
    this.currentPage = 1;
    //this.pageChanged.emit(this.currentPage);
    this.countPerPageChanged.emit(this.countPerPage); // Emit countPerPage to the parent component
    this.getVisiblePages();
  }

  // Get the visible page numbers (5 at a time)
  getVisiblePages(): number[] {
    let start = Math.max(1, this.currentPage - 2);
    let end = Math.min(this.totalPages, start + 4);

    // Adjust start and end if total visible pages are less than 5
    if (end - start + 1 < 5) {
      if (start > 1) {
        start = Math.max(1, end - 4);
      }
      if (end < this.totalPages) {
        end = Math.min(this.totalPages, start + 4);
      }
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  // Navigation actions
  goToPage(page: number) {
    this.currentPage = page;
    this.pageChanged.emit(this.currentPage);
  }

  goToFirstPage() {
    this.goToPage(1);
  }

  goToLastPage() {
    this.goToPage(this.totalPages);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  // Index calculations
  getStartIndex(): number {
    return (this.currentPage - 1) * this.countPerPage;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.countPerPage, this.totalCount);
  }
}

import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  name: string;
  customerGroup: string;
  outlet: string;
  validFrom: Date;
  validTo: Date;
  priceBookFile_url: string; 
}

@Component({
  selector: 'app-pricebooks',
  templateUrl: './pricebooks.component.html',
  styleUrls: ['./pricebooks.component.scss']
})
export class PricebooksComponent implements OnInit {
  rows: Product[] = [];
  currentRow: Product = { id: null, name: '', customerGroup: '', outlet: '', validFrom: new Date(), validTo: new Date(), priceBookFile_url: '' };
  isContentVisible: boolean = false;
  searchQuery: string = '';
  paginatedRows: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  isEditing : boolean = false;

  ngOnInit() {
    // Load initial data
    this.rows = [
      { id: 1, name: 'Product 1', customerGroup: 'Group A', outlet: 'Outlet 1', validFrom: new Date(), validTo: new Date(), priceBookFile_url: 'http://example.com/file1' },
      { id: 2, name: 'Product 2', customerGroup: 'Group B', outlet: 'Outlet 2', validFrom: new Date(), validTo: new Date(), priceBookFile_url: 'http://example.com/file2' },
      { id: 3, name: 'Product 3', customerGroup: 'Group C', outlet: 'Outlet 3', validFrom: new Date(), validTo: new Date(), priceBookFile_url: 'http://example.com/file3' },
      { id: 4, name: 'Product 4', customerGroup: 'Group D', outlet: 'Outlet 4', validFrom: new Date(), validTo: new Date(), priceBookFile_url: 'http://example.com/file4' },
      { id: 5, name: 'Product 5', customerGroup: 'Group E', outlet: 'Outlet 5', validFrom: new Date(), validTo: new Date(), priceBookFile_url: 'http://example.com/file5' },
      { id: 6, name: 'Product 6', customerGroup: 'Group F', outlet: 'Outlet 6', validFrom: new Date(), validTo: new Date(), priceBookFile_url: 'http://example.com/file6' },
      // Add more products as needed
    ];
    this.filterRows(); // Initialize pagination
  }

  toggleContent() {
    this.isContentVisible = !this.isContentVisible;
  }

  openEditModal(row: Product) {
    this.currentRow = { ...row };
  }

  editRow(row: Product) {
    this.isEditing = true;
  }

  saveRow(row: Product) {
    this.isEditing = false; // Exit editing mode
  }

  cancelEdit(row: Product) {
    this.isEditing = false; // Exit editing mode
  }

  deleteRow(id: number) {
    this.paginatedRows = this.paginatedRows.filter(row => row.id !== id);
  }

  filterRows() {
    const filtered = this.rows.filter(row =>
      row.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      row.customerGroup.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.currentPage = 1; // Reset to first page
    this.paginate(filtered);
  }

  paginate(filteredRows: Product[]) {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedRows = filteredRows.slice(start, start + this.itemsPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.rows.length / this.itemsPerPage);
  }

  updatePagination() {
    this.filterRows(); // Reapply filtering to ensure correct pagination
  }
}

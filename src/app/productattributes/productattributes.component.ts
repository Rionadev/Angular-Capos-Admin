import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  name: string;
  description: string;
  product: string;
}

@Component({
  selector: 'app-productattributes',
  templateUrl: './productattributes.component.html',
  styleUrls: ['./productattributes.component.scss']
})
export class ProductattributesComponent implements OnInit {
  rows: Product[] = [];
  currentRow: Product = { id: null, name: '', description: '', product: '' };
  isContentVisible: boolean = false;
  searchQuery: string = '';
  paginatedRows: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  ngOnInit() {
    // Load initial data
    this.rows = [
      { id: 1, name: 'Product 1', description: 'Description 1', product: 'Product A' },
      { id: 2, name: 'Product 2', description: 'Description 2', product: 'Product B' },
      { id: 3, name: 'Product 3', description: 'Description 3', product: 'Product C' },
      { id: 4, name: 'Product 4', description: 'Description 4', product: 'Product D' },
      { id: 5, name: 'Product 5', description: 'Description 5', product: 'Product E' },
      { id: 6, name: 'Product 6', description: 'Description 6', product: 'Product F' },
      // Add more products as needed
    ];
    this.filterRows(); // Initialize pagination
  }

  toggleContent() {
    this.isContentVisible = !this.isContentVisible;
  }

  saveRow() {
    if (this.currentRow.id) {
      const index = this.rows.findIndex(row => row.id === this.currentRow.id);
      this.rows[index] = this.currentRow;
    } else {
      this.currentRow.id = this.rows.length + 1; // Simple ID assignment
      this.rows.push(this.currentRow);
    }
    this.currentRow = { id: null, name: '', description: '', product: '' };
    this.filterRows();
  }

  editRow(row: Product) {
    this.currentRow = { ...row };
  }

  deleteRow(id: number) {
    this.rows = this.rows.filter(row => row.id !== id);
    this.filterRows();
  }

  cancelEdit() {
    this.currentRow = { id: null, name: '', description: '', product: '' };
  }

  filterRows() {
    const filtered = this.rows.filter(row =>
      row.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      row.description.toLowerCase().includes(this.searchQuery.toLowerCase())
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
